import { World } from './world';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { Location } from './location';
import { PrimeItemCollection } from './prime/itemCollection';
import { Region } from './region';
import { ItemPriority } from './prime/items';

export function fillRestrictive(world: World, locations: LocationCollection, itemPool: ItemCollection) {
  const rng = world.getRng();
  const settings = world.getSettings();
  const totalItems = itemPool.size();
  const totalLocations = locations.size();

  while (itemPool.size() > 0 && locations.size() > 0) {
    // Take next item out of the item pool before searching the world for available locations to ensure completeability
    const itemToPlace = itemPool.pop();

    // Collect available placed progression items using the current item pool for accurate dependency checking
    // We are intentionally filtering to progression items to rule out the player collecting a junk missile expansion as their first source of progression
    const assumedItems = new PrimeItemCollection(world.collectItems(itemPool).toArray());

    // Run one more search with our assumed items to get the most up-to-date region checks
    const searchResults = world.searchRegions(assumedItems);

    // Shuffle locations collection
    const shuffledLocations = locations.shuffle(rng);
    let locationToFill: Location;

    // Iterate through each location and perform our checks
    for (let location of shuffledLocations.toArray()) {
      const visitedRegion = searchResults.getVisitedRegion(location.getParentRegion());
      // This is the first check, to see if we can reach the location and get to (or fill it with) the item.
      const canFillLocation = visitedRegion && !location.isExcluded() && !location.hasItem() && location.itemRule(assumedItems, settings);

      if (canFillLocation) {
        // If we can fill the item, run a search starting at the location's parent region to check if we can continue after filling it with the item.
        const searchResultsWithObtainedItem = world.searchRegions(new PrimeItemCollection([...assumedItems.toArray(), itemToPlace]), location.getParentRegion());

        // Get the region we came from to enter the current location's parent region
        const entryPointRegion = visitedRegion.entryPoint ? visitedRegion.entryPoint.getParentRegion() : null;

        // We're basically checking if we can leave the location's parent region via its original entry point, be it directly or indirectly.
        // This is to handle cases like Ventilation Shaft where you need more items to leave the way you came in than when you entered.
        if (!entryPointRegion || searchResultsWithObtainedItem.getVisitedRegion(entryPointRegion)) {
          locationToFill = location;
          break;
        }
      }
    }

    // If we failed to find a suitable location, throw an error, since all items need to be placed
    if (!locationToFill) {
      throw new RangeError('Game unbeatable: No more locations to place ' + itemToPlace.getName() + ' (' + itemPool.size() + '/' + totalItems + ' items and ' + locations.size() + '/' + totalLocations + ' locations remaining)');
    }

    // Place the item in the world and continue
    locationToFill.setItem(itemToPlace);
    locations.remove(locationToFill);
  }
};

export function fillFast(world: World, locations: LocationCollection, itemPool: ItemCollection, allowExcludedLocations?: boolean) {
  const rng = world.getRng();
  const shuffledLocations = locations.shuffle(rng);

  for (let locationToFill of shuffledLocations.toArray()) {
    // Move on to the next location if the location already has an item, or is excluded and we're not allowing them
    if (locationToFill.hasItem() || (!allowExcludedLocations && locationToFill.isExcluded())) {
      continue;
    }

    const itemToPlace = itemPool.pop();

    // Exit the loop if there are no items left
    if (!itemToPlace) {
      break;
    }

    locationToFill.setItem(itemToPlace);
  }
};

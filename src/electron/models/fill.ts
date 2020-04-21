import { World } from './world';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { Location } from './location';
import { PrimeItemCollection } from './prime/itemCollection';
import { mapToItemPool } from './prime/itemPool';

export function fillRestrictive(world: World, locations: LocationCollection, itemPool: ItemCollection) {
  const rng = world.getRng();
  const settings = world.getSettings();
  const totalItems = itemPool.size();
  const totalLocations = locations.size();

  while (itemPool.size() > 0 && locations.size() > 0) {
    // Take next item out of the item pool before searching the world for available locations to ensure completeability
    const itemToPlace = itemPool.pop();

    // Collect available placed items using the current item pool for accurate dependency checking
    const assumedItems = new PrimeItemCollection(world.collectItems(itemPool).toArray());

    // Run one more search with our assumed items to get the most up-to-date region checks
    const searchResults = world.searchRegions(assumedItems);

    // Using this for "can escape room" checking when potentially placing an item
    const assumedItemsWithItemToPlace = new PrimeItemCollection([...assumedItems.toArray(), itemToPlace]);

    // Shuffle locations collection
    const shuffledLocations = locations.shuffle(rng);
    let locationToFill: Location;

    // Iterate through each location and perform our checks
    for (let location of shuffledLocations.toArray()) {
      const visitedRegion = searchResults.getVisitedRegion(location.getParentRegion());
      const oppositeConnection = visitedRegion && visitedRegion.entryPoint ? visitedRegion.entryPoint.getOpposite() : null;

      // If the location's encompassing region's entry point (when we did our search) is bidirectional, we perform additional checks for safety
      // If we can't leave through the way we came in, then we move on to the next location.
      // This is to handle special cases such as Ventilation Shaft where you can enter the room and can get stuck.
      // For one-way connections, we don't perform the additional check.
      if (oppositeConnection && !oppositeConnection.accessRule(assumedItemsWithItemToPlace, world.getSettings())) {
        continue;
      }

      // Only fill if we can visit the region, and if the location is empty, isn't excluded, and we can fill it
      if (visitedRegion && !location.isExcluded() && !location.hasItem() && location.itemRule(assumedItems, settings)) {
        locationToFill = location;
        break;
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

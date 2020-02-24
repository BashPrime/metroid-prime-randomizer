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
    // world.searchRegions(itemPool);

    // Collect available placed items using the current item pool for accurate dependency checking
    const assumedItems = new PrimeItemCollection(world.collectItems(itemPool).toArray());

    // Shuffle locations collection
    const shuffledLocations = locations.shuffle(rng);
    let locationToFill: Location;

    for (const location of shuffledLocations.toArray()) {
      // Only fill if the location isn't excluded and we can fill it
      if (!location.isExcluded() && location.canFill(assumedItems, settings)) {
        locationToFill = location;
        location.setItem(itemToPlace);
        locations.remove(location);
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

export function fillFast(world: World, locations: LocationCollection, itemPool: ItemCollection) {
  const rng = world.getRng();
  const shuffledLocations = locations.shuffle(rng);

  while (itemPool.size() > 0 && shuffledLocations.size() > 0) {
    const spotToFill = shuffledLocations.pop();
    const itemToPlace = itemPool.pop();
    spotToFill.setItem(itemToPlace);
  }
};

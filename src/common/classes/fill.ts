import { World } from './world';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { Location } from './location';

export function fillRestrictive(world: World, locations: LocationCollection, itemPool: ItemCollection) {
  const rng = world.getRng();
  const settings = world.getSettings();
  const totalItems = itemPool.size();
  const totalLocations = locations.size();

  while (itemPool.size() > 0 && locations.size() > 0) {
    // Take next item out of the item pool before searching the world for available locations to ensure completeability
    const itemToPlace = itemPool.pop();
    world.searchRegions(itemPool);

    // Shuffle locations collection
    const shuffledLocations = locations.shuffle(rng);
    let locationToFill: Location;

    for (const location of shuffledLocations.toArray()) {
      if (location.canFill(itemPool, settings)) {
        locationToFill = location;
        location.setItem(itemToPlace);
        locations.remove(location);
        break;
      }
    }

    // If we failed to find a suitable location, throw an error, since all items need to be placed
    if (!locationToFill) {
      throw new RangeError('Game unbeatable: No more locations to place ' + itemToPlace.getName() + ' (' + locations.size() + '/' + totalLocations + ' locations, ' + itemPool.size() + '/' + totalItems + ' items)');
    }

    // Place the item in the world and continue
    locationToFill.setItem(itemToPlace);
    console.log('Placed ' + locationToFill.getItem().getName() + ' in ' + locationToFill.getName());
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

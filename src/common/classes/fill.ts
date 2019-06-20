import { World } from './world';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';

export function fillRestrictive(world: World, locations: LocationCollection, itemPool: ItemCollection) {
    const rng = world.getRng();
    const settings = world.getSettings();

    while(itemPool.size() > 0 && locations.size() > 0) {
        world.searchRegions(itemPool);
        const itemToPlace = itemPool.pop();
        const shuffledLocations = locations.shuffle(rng);

        for (const location of shuffledLocations.toArray()) {
            if (location.canFill(itemPool, settings)) {
                location.setItem(itemToPlace);
                shuffledLocations.remove(location);
                break;
            }
        }
    }
};

export function fillFast(world: World, locations: LocationCollection, itemPool: ItemCollection) {
    const rng = world.getRng();
    const shuffledLocations = locations.shuffle(rng);

    while(itemPool.size() > 0 && shuffledLocations.size() > 0) {
        const spotToFill = shuffledLocations.pop();
        const itemToPlace = itemPool.pop();
        spotToFill.setItem(itemToPlace);
    }
};
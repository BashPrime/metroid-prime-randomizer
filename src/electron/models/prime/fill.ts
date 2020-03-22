import { fillRestrictive, fillFast } from '../fill';
import { PrimeWorld } from './world';
import { Item } from '../item';
import { ItemPriority } from './items';
import { Location } from '../location';

/**
 * Parent function for distributing an item pool across the Metroid Prime world.
 * @param world The Metroid Prime world instance being used.
 */
export function distributeItemsRestrictive(world: PrimeWorld): void {
    // Get whole item pool, and shuffle it
    const itemPool = world.getItemPool().shuffle(world.getRng());

    // Get unfilled item locations
    let fillLocations = world.getLocations().filter((location: Location) => !location.hasItem());

    const progressionItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.PROGRESSION);
    const artifactsItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.ARTIFACTS);
    const extrasItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.EXTRA);

    // Logically fill progressive items to ensure the game can be completed.
    fillRestrictive(world, fillLocations, progressionItemPool);

    // Filter out filled locations
    fillLocations = world.getLocations().filter((location: Location) => !location.hasItem());

    // Progression items are filled, artifacts can be filled fast among non-excluded locations
    fillFast(world, fillLocations, artifactsItemPool);

    // Filter out filled locations
    fillLocations = world.getLocations().filter((location: Location) => !location.hasItem());

    // Fill extras/remaining junk items last. No logic needed as the progression items are placed by now.
    fillFast(world, fillLocations, extrasItemPool, true);
}

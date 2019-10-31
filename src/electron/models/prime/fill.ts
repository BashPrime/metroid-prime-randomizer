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

    const priorityItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.PRIORITY);
    const progressionItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.PROGRESSION);
    const extrasItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.EXTRA);

    // Logically fill progressive items to ensure the game can be completed.
    fillRestrictive(world, fillLocations, progressionItemPool);

    // Fill extras/remaining junk items last. No logic needed as the progression items are placed by now.
    fillFast(world, fillLocations, extrasItemPool);
}

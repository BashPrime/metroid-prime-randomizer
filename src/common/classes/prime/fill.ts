import { fillRestrictive } from '../fill';
import { PrimeWorld } from './world';
import { Item } from '../item';
import { ItemPriority } from './items';
import { LocationCollection } from '../locationCollection';

export function distributeItemsRestrictive(world: PrimeWorld): void {
    // Get whole item pool, and shuffle it
    const itemPool = world.getItemPool().shuffle(world.getRng());

    // Get unfilled item locations
    const fillLocations = world.getLocations().filter(location => !location.hasItem());

    const priorityItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.PRIORITY);
    const progressionItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.PROGRESSION);
    const extrasItemPool = itemPool.filter((item: Item) => item.getPriority() === ItemPriority.EXTRA);

    // Fill progressive items first.
    fillRestrictive(world, fillLocations, progressionItemPool);

    // Fill extras/remaining junk items last.
    fillRestrictive(world, fillLocations, extrasItemPool);
}
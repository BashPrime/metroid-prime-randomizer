import { PrimeWorld } from './world';
import { LocationCollection } from '../locationCollection';

export function distributeItemsRestrictive(world: PrimeWorld): void {
    const itemPool = world.getItemPool();
    const fillLocations = world.getLocations().filter(location => !location.hasItem());
}
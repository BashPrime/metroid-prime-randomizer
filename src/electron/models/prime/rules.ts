import { PrimeWorld } from './world';

export function setRules(world: PrimeWorld): void {
  // Set the root node of the world graph
  world.setRootRegion(world.getRegionByKey('Root'));
}

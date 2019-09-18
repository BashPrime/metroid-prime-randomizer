import { PrimeWorld } from './world';
import { MersenneTwister } from '../../mersenneTwister';

export function setRules(world: PrimeWorld): void {
  // Set the root node of the world graph
  world.setRootRegion(world.getRegionByKey('Root'));
}

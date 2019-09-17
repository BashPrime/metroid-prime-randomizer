import { PrimeWorld } from './world';
import { MersenneTwister } from '../../mersenneTwister';

export function setRules(world: PrimeWorld): void {
  // Set the randomizer seed. Stub for now
  world.setRng(new MersenneTwister(1));

  // Set the root node of the world graph
  world.setRootRegion(world.getRegionByKey('Root'));
}

import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';
import { generateItemPool } from './itemPool';
import { setEntrances } from '../entranceShuffle';
import { distributeItemsRestrictive } from './fill';
import { MersenneTwister } from '../../mersenneTwister';

export function generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
  const world = new PrimeWorld(settings);
  // world.setRng(new MersenneTwister(1));

  // Set up Prime world regions
  world.loadRegions();
  // world.setRootRegion(world.getRegionByKey('Root'));

  // Generate item pool based on settings, and add the item pool to the world instance
  generateItemPool(world);

  // Pass world into entrance shuffle class, using settings to determine entrance shuffle
  setEntrances(world);

  // Fill the world locations using the item pool.
  distributeItemsRestrictive(world);

  return world;
}
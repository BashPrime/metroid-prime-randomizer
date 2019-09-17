import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';
import { generateItemPool } from './itemPool';
import { setEntrances } from '../entranceShuffle';
import { setRules } from './rules';
import { distributeItemsRestrictive } from './fill';

export function generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
  const world = new PrimeWorld(settings);

  // Set up Prime world regions
  world.loadRegions();

  // Generate item pool based on settings, and add the item pool to the world instance
  generateItemPool(world);

  // Set core game rules
  setRules(world);

  // Pass world into entrance shuffle class, using settings to determine entrance shuffle
  setEntrances(world);

  // Fill the world locations using the item pool.
  distributeItemsRestrictive(world);

  return world;
}

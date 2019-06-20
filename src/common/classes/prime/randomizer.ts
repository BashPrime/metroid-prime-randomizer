import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';
import { generateItemPool } from './itemPool';
import { setEntrances } from '../entranceShuffle';

export function generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
  const world = new PrimeWorld(settings);

  // Set up Prime world regions
  world.loadRegions();

  // Generate item pool based on settings and set in world
  generateItemPool(world);

  // Pass world into entrance shuffle class, using settings to determine entrance shuffle
  setEntrances(world);

  return world;
}
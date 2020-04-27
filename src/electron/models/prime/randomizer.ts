import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';
import { generateItemPool } from './itemPool';
import { setStartingItems } from './startingItems';
import { setEntrances } from './entranceShuffle';
import { setRules } from './rules';
import { distributeItemsRestrictive } from './fill';
import { MersenneTwister } from '../../mersenneTwister';
import { generateAlphanumericString } from '../../utilities';

/**
 * Generates a Metroid Prime world with logically shuffled items.
 * @param settings Configuration object for the world generation
 */
export function generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
  let success = false;
  let world: PrimeWorld;
  let currentTry = 0;
  const maxTries = 100;

  // If no seed is supplied in the settings, generate a random alphanumeric seed.
  if (!settings.seed) {
    settings.seed = generateAlphanumericString();
  }

  // Initialize rng based on hashed seed, and re-use in case the item distribution fails.
  const rng = new MersenneTwister(settings.getNumericSeed());
  let lastErrorMessage: string;

  while (!success && currentTry < maxTries) {
    try {
      world = new PrimeWorld(settings);

      // Initialize rng based on hashed seed
      world.setRng(rng);

      // Set up Prime world regions
      world.loadRegions();

      // Set the root node of the world graph
      world.setRootRegion(world.getRegionByKey('Root'));

      // Set starting items for the world
      setStartingItems(world);

      // Generate item pool based on settings, and add the item pool to the world instance
      generateItemPool(world);

      // Pass world into entrance shuffle class, using settings to determine entrance shuffle
      setEntrances(world);

      // Set core game rules
      setRules(world);

      // Fill the world locations using the item pool.
      distributeItemsRestrictive(world);

      // If we get here, the item fill succeeded (no exception thrown)! Flag as successful.
      success = true;
    } catch (Error) {
      // Handle exception gracefully and try again.
      lastErrorMessage = Error.message;
      currentTry++;
    }
  }

  if (!success) {
    throw new Error('Failed to generate a world after ' + maxTries + ' attempts. Last error thrown: ' + lastErrorMessage);
  }

  return world;
}

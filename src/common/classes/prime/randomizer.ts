import { Randomizer } from '../randomizer';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';
import { setEntrances } from '../entranceShuffle';

export class PrimeRandomizer extends Randomizer {
  runRandomizer() {};

  generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
    const world = new PrimeWorld(settings);

    // Set up Prime world regions
    world.loadRegions();

    // Pass world into entrance shuffle class, using settings to determine entrance shuffle
    setEntrances(world);

    return world;
  }
}

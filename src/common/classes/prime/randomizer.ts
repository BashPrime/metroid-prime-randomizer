import { Randomizer } from '../randomizer';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { PrimeWorld } from './world';

export class PrimeRandomizer extends Randomizer {
  runRandomizer() {};

  generateWorld(settings: PrimeRandomizerSettings): PrimeWorld {
    const world = new PrimeWorld(settings);

    // Set up Prime world regions
    world.loadRegions();

    return world;
  }
}

import { Randomizer } from '../randomizer';
import { PrimeRandomizerSettings } from './randomizerSettings';

export class PrimeRandomizer extends Randomizer {
  protected settings: PrimeRandomizerSettings;

  constructor(settings: PrimeRandomizerSettings) {
    super(settings);
  }

  runRandomizer() {};
}

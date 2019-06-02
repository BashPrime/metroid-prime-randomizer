import { RandomizerSettings } from '../classes/randomizerSettings';

export class Randomizer {
  protected settings: RandomizerSettings;

  constructor(settings: RandomizerSettings) {
    this.settings = settings;
  }

  getSettings(): RandomizerSettings {
    return this.settings;
  }

  setSettings(settings: RandomizerSettings) {
    this.settings = settings;
  }

  runRandomizer() {};
}

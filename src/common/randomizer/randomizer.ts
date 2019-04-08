import { Settings } from '../models/settings';

export class Randomizer {
  private settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }
}

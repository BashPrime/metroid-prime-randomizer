import { Region } from './region';
import { RandomizerSettings } from './randomizerSettings';
import { RegionCollection } from './regionCollection';

export class World {
  protected settings: RandomizerSettings;
  protected regions: RegionCollection;

  constructor(settings: RandomizerSettings) {
    this.settings = settings;
  }

  getRegions(): RegionCollection {
    return this.regions;
  }

  setRegions(regions: RegionCollection) {
    this.regions = regions;
  }

  getSettings(): RandomizerSettings {
    return this.settings;
  }

  setSettings(settings: RandomizerSettings) {
    this.settings = settings;
  }
}

import { Region } from './region';
import { Location } from './location';
import { RandomizerSettings } from './randomizerSettings';
import { RegionCollection } from './regionCollection';
import { LocationCollection } from './locationCollection';

export class World {
  protected settings: RandomizerSettings;
  protected regions: RegionCollection;
  protected cachedLocations: LocationCollection;

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

  getLocations(): LocationCollection {
    if (!this.cachedLocations) {
      let locations: Location[] = [];

      for (const region of this.regions.getRegionsArray()) {
        locations = locations.concat(region.getLocations().getLocationsArray());
      }

      this.cachedLocations = new LocationCollection(locations);
    }

    return this.cachedLocations;
  }

  initializeEntrances(): void {
    for (const region of this.getRegions().getRegionsArray()) {
      for (const exit of region.getExits()) {
        exit.connect(this.getRegions().getRegionByKey(exit.getConnectedRegionKey()));
      }
    }
  }
}

import { Region } from './region';

export class World {
  private regions: { [key: string]: Region };

  getRegions(): { [key: string]: Region } {
    return this.regions;
  }

  setRegions(regions: { [key: string]: Region }): void {
    this.regions = regions;
  }

  getRegionByKey(key: string): Region {
    return this.regions[key];
  }
}

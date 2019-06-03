import { Region } from './region';

export class RegionCollection {
  private regions: Region[];

  constructor(regions: Region[]) {
    this.regions = regions;
  }

  getRegions(): Region[] {
    return this.regions;
  }

  getRegionByKey(key: string): Region {
    return this.regions.find(region => region.getName() === key);
  }

  size(): number {
    return this.regions.length;
  }

  has(key: string): boolean {
    return this.regions.map(region => region.getName()).includes(key);
  }

  diff(otherRegions: RegionCollection): RegionCollection {
    return new RegionCollection(this.regions.filter(item => !otherRegions.has(item.getName())));
  }

  merge(otherRegions: RegionCollection): RegionCollection {
    return new RegionCollection(this.regions.concat(otherRegions.getRegions()));
  }
}

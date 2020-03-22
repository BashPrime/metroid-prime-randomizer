import { Region } from './region';
import { Collection } from './collection';
import { MersenneTwister } from '../mersenneTwister';
import { randomArray } from '../utilities';

export class RegionCollection extends Collection<Region> {
  protected items: Region[];

  constructor(regions: Region[]) {
    super();
    this.items = regions;
  }

  getRegionByKey(key: string): Region {
    return this.items.find(region => region.getName() === key);
  }

  filter(fn): RegionCollection {
    return new RegionCollection(this.items.filter(fn));
  }

  shuffle(rng: MersenneTwister): RegionCollection {
    return new RegionCollection(randomArray(this.items, this.items.length, rng));
  }

  remove(element: Region): Region {
    const firstIndex = this.items.findIndex(item => item.getName() === element.getName());

    if (firstIndex > -1) {
      this.items.splice(firstIndex, 1);
      return element;
    }

    return null;
  }

  has(key: string): boolean {
    return this.items.map(region => region.getName()).includes(key);
  }

  diff(otherRegions: RegionCollection): RegionCollection {
    return new RegionCollection(this.items.filter(item => !otherRegions.has(item.getName())));
  }

  merge(otherRegions: RegionCollection): RegionCollection {
    return new RegionCollection(this.items.concat(otherRegions.toArray()));
  }
}

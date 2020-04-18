import { Region } from './region';
import { Entrance } from './entrance';
import { ItemCollection } from './itemCollection';
import { Location } from './location';
import { Item } from './item';

export class SearchResults {
  private visited: VisitedRegionWrapper[] = [];
  private items: ItemCollection = undefined;

  constructor(args: SearchArgs) {
    if (args) {
      Object.assign(this, args);
    }
  }

  collectLocations(): Location[] {
    let locations: Location[] = [];

    for (let item of this.visited) {
      const region = item.region;
      if (region.getLocations().size()) {
        locations = locations.concat(region.getLocations().toArray());
      }
    }

    return locations;
  }

  collectItems(): Item[] {
    let items: Item[] = [];

    for (let item of this.visited) {
      const region = item.region;
      if (region.getLocations().size()) {
        const locationItems = region.getLocations().toArray().filter(location => location.hasItem()).map(location => location.getItem());
        items = items.concat(locationItems);
      }
    }

    return items;
  }

  getVisited(): VisitedRegionWrapper[] {
    return this.visited;
  }

  setVisited(visited: VisitedRegionWrapper[]): void {
    this.visited = visited;
  }

  getItems(): ItemCollection {
    return this.items;
  }

  setItems(items: ItemCollection): void {
    this.items = items;
  }
}

export interface SearchArgs {
  visited: VisitedRegionWrapper[];
  items: ItemCollection;
}

export interface VisitedRegionWrapper {
  region: Region;
  entryPoint: Entrance;
}


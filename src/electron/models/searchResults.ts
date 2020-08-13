import { Region } from './region';
import { Entrance } from './entrance';
import { ItemCollection } from './itemCollection';
import { Location } from './location';

export class SearchResults {
  private visitedRegions: VisitedRegionWrapper[] = [];
  private items: ItemCollection = new ItemCollection([]);

  constructor(args?: SearchArgs) {
    if (args) {
      Object.assign(this, args);
    }
  }

  getLocations(): Location[] {
    let locations: Location[] = [];

    for (let visitedRegion of this.visitedRegions) {
      const region = visitedRegion.region;
      if (region.getLocations().size()) {
        locations = locations.concat(region.getLocations().toArray());
      }
    }

    return locations;
  }

  getVisitedRegions(): VisitedRegionWrapper[] {
    return this.visitedRegions;
  }

  setVisitedRegions(visited: VisitedRegionWrapper[]): void {
    this.visitedRegions = visited;
  }

  getVisitedRegion(region: Region): VisitedRegionWrapper {
    return this.visitedRegions.find(visitedItem => visitedItem.region.getName() === region.getName());
  }

  getLastVisitedRegion(): VisitedRegionWrapper {
    return this.visitedRegions.length ? this.visitedRegions[this.visitedRegions.length - 1] : null;
  }

  getItems(): ItemCollection {
    return this.items;
  }

  setItems(items: ItemCollection): void {
    this.items = items;
  }
}

export interface SearchArgs {
  visitedRegions: VisitedRegionWrapper[];
  items: ItemCollection;
}

export interface VisitedRegionWrapper {
  region: Region;
  entryPoint: Entrance;
}


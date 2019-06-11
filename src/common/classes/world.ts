import { Region } from './region';
import { Location } from './location';
import { RandomizerSettings } from './randomizerSettings';
import { RegionCollection } from './regionCollection';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';

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

  getRegionByKey(key: string): Region {
    return this.regions.getRegionByKey(key);
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

  getLocationByKey(key: string) {
    return this.getLocations().getLocationByKey(key);
  }

  initializeEntrances(): void {
    for (const region of this.getRegions().getRegionsArray()) {
      for (const exit of region.getExits()) {
        exit.connect(this.getRegions().getRegionByKey(exit.getConnectedRegionKey()));
      }
    }
  }

  isReachable(source: Region, destination: Region, items: ItemCollection): boolean {
    // Mark all regions as not visited by default (false)
    const visitedRegions = this.getLocations().getLocationsArray().map(location => {
      return { [location.getName()]: false };
    });

    // Use an array instance as a queue
    const regionQueue: Region[] = [];

    // Mark the starting region as visited and enqueue it
    visitedRegions[source.getName()] = true;
    regionQueue.push(source);

    while (regionQueue.length) {
      // Dequeue a region.
      const region = regionQueue.shift();

      // Get all exits (and their connected regions) for the current region.
      // If an adjacent region hasn't been visited, check if it can be visited.
      // If it can, mark it visited and enqueue it.
      for(const exit of region.getExits()) {
        const connectedRegion = exit.getConnectedRegion();

        // Check if the adjacent region can be visited
        if(exit.accessRule(items, this.settings)) {
          // If adjacent region is the destination, then return true
          if (connectedRegion.getName() === destination.getName()) {
            return true;
          }

          // Else, continue BFS
          if (!visitedRegions[connectedRegion.getName()]) {
            visitedRegions[connectedRegion.getName()] = true;
            regionQueue.push(connectedRegion);
          }
        }
      }
    }

    // If BFS completed without visiting destination, return false
    return false;
  }

  
}

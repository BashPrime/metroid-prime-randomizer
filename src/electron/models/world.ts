import { Region } from './region';
import { Location } from './location';
import { RandomizerSettings } from './randomizerSettings';
import { RegionCollection } from './regionCollection';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { MersenneTwister } from '../mersenneTwister';

export class World {
  protected settings: RandomizerSettings;
  protected rng: MersenneTwister;
  protected regions: RegionCollection;
  protected itemPool: ItemCollection;
  protected cachedLocations: LocationCollection;
  protected rootRegion: Region;
  protected cachedVisitedRegions: { [key: string]: boolean } = {};

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

  getItemPool(): ItemCollection {
    return this.itemPool;
  }

  setItemPool(itemPool: ItemCollection) {
    this.itemPool = itemPool;
  }

  getRng(): MersenneTwister {
    return this.rng;
  }

  setRng(rng: MersenneTwister) {
    this.rng = rng;
  }

  getRootRegion(): Region {
    return this.rootRegion;
  }

  setRootRegion(rootRegion: Region) {
    this.rootRegion = rootRegion;
  }

  getLocations(): LocationCollection {
    if (!this.cachedLocations) {
      let locations: Location[] = [];

      for (const region of this.regions.toArray()) {
        locations.push(...region.getLocations().toArray());
      }

      this.cachedLocations = new LocationCollection(locations);
    }

    return this.cachedLocations;
  }

  getLocationByKey(key: string) {
    return this.getLocations().getLocationByKey(key);
  }

  initializeEntrances(): void {
    for (const region of this.getRegions().toArray()) {
      for (const exit of region.getExits()) {
        exit.connect(this.getRegions().getRegionByKey(exit.getConnectedRegionKey()));
      }
    }
  }

  searchRegions(items: ItemCollection): void {
    this.cachedVisitedRegions = {};
    // Mark all regions as not visited by default (false)
    for (const region of this.getRegions().toArray()) {
      this.cachedVisitedRegions[region.getName()] = false;
    }

    // Use an array instance as a queue
    const regionQueue: Region[] = [];

    // Mark the starting region as visited and enqueue it
    this.cachedVisitedRegions[this.rootRegion.getName()] = true;
    regionQueue.push(this.rootRegion);

    while (regionQueue.length) {
      // Dequeue a region.
      const region = regionQueue.shift();

      // Get all exits (and their connected regions) for the current region.
      // If an adjacent region hasn't been visited, check if it can be visited.
      // If it can, mark it visited and enqueue it.
      for (const exit of region.getExits()) {
        const connectedRegion = exit.getConnectedRegion();

        // Check if the adjacent region can be visited
        if (exit.accessRule(items, this.settings)) {
          // Else, continue BFS
          if (!this.cachedVisitedRegions[connectedRegion.getName()]) {
            this.cachedVisitedRegions[connectedRegion.getName()] = true;
            regionQueue.push(connectedRegion);
          }
        }
      }
    }
  }

  isReachable(destination: Region, items: ItemCollection, forceSearch?: boolean): boolean {
    // Immediately return false if root region is not set
    if (!this.rootRegion) {
      return false;
    }

    // Run search if it hasn't been run already, or forced
    if (forceSearch || Object.keys(this.cachedVisitedRegions).length === 0) {
      this.searchRegions(items);
    }

    return this.cachedVisitedRegions[destination.getName()];
  }

  getFillableLocations(items: ItemCollection, forceSearch?: boolean): LocationCollection {
    let locations: Location[] = [];

    if (forceSearch || Object.keys(this.cachedVisitedRegions).length === 0) {
      this.searchRegions(items);
    }

    const visitedRegions = Object.keys(this.cachedVisitedRegions).filter(key => this.cachedVisitedRegions[key] === true);

    for (const key of visitedRegions) {
      const fillableLocations = this.getRegionByKey(key).getLocations().toArray().filter(location =>
        location.canFill(items, this.settings, true)
      );

      locations = locations.concat(fillableLocations);
    }

    return new LocationCollection(locations);
  }

  collectItems(collectedItems?: ItemCollection): ItemCollection {
    return null; //stub
  }
}

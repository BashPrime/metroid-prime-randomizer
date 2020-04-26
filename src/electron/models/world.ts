import { Region } from './region';
import { Location } from './location';
import { RandomizerSettings } from './randomizerSettings';
import { RegionCollection } from './regionCollection';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { MersenneTwister } from '../mersenneTwister';
import { SearchResults, VisitedRegionWrapper } from './searchResults';

/**
 * Generic representation of a Metroid Prime-like game world.
 * In actual use, this class is extended by a game-specific subclass, such as PrimeWorld.
 */
export class World {
  protected settings: RandomizerSettings;
  protected rng: MersenneTwister;
  protected regions: RegionCollection;
  protected itemPool: ItemCollection;
  protected cachedLocations: LocationCollection;
  protected rootRegion: Region;

  constructor(settings: RandomizerSettings) {
    this.settings = settings;
  }

  /**
   * Returns the collection of regions belonging to this world.
   */
  getRegions(): RegionCollection {
    return this.regions;
  }

  /**
   * Returns a region by its name.
   * @param key The name of the region being queried.
   */
  getRegionByKey(key: string): Region {
    return this.regions.getRegionByKey(key);
  }

  /**
   * Assigns a region collection to this world.
   * @param regions The region collection being added.
   */
  setRegions(regions: RegionCollection) {
    this.regions = regions;
  }

  /**
   * Returns the configuration settings used to generate this world.
   */
  getSettings(): RandomizerSettings {
    return this.settings;
  }

  /**
   * Sets the configuration settings used to generate this world.
   * @param settings The configuration object being set.
   */
  setSettings(settings: RandomizerSettings) {
    this.settings = settings;
  }

  /**
   * Returns the pool of items that will be placed in this world.
   */
  getItemPool(): ItemCollection {
    return this.itemPool;
  }

  /**
   * Assigns the to-be-placed pool of items to this world.
   * @param itemPool The item pool being added.
   */
  setItemPool(itemPool: ItemCollection) {
    this.itemPool = itemPool;
  }

  /**
   * Returns the random number generator used to generate this world.
   */
  getRng(): MersenneTwister {
    return this.rng;
  }

  /**
   * Assigns a random number generator to this world.
   * @param rng The random number generator being added.
   */
  setRng(rng: MersenneTwister) {
    this.rng = rng;
  }

  /**
   * Returns the starting point/region of this world.
   */
  getRootRegion(): Region {
    return this.rootRegion;
  }

  /**
   * Assigns the starting region to this world.
   * @param rootRegion The starting region to be set.
   */
  setRootRegion(rootRegion: Region) {
    this.rootRegion = rootRegion;
  }

  /**
   * Returns all of the item locations found in this world.
   */
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

  /**
   * Returns an item location by its name.
   * @param key The name of the location being queried.
   */
  getLocationByKey(key: string) {
    return this.getLocations().getLocationByKey(key);
  }

  /**
   * Connects the exits/entrances of all of this world's regions.
   */
  initializeEntrances(): void {
    for (const region of this.getRegions().toArray()) {
      for (const exit of region.getExits()) {
        exit.connect(this.getRegions().getRegionByKey(exit.getConnectedRegionKey()));
      }
    }
  }

  /**
   * Traverses the game world via graph search, marking which regions can be visited with the given items,
   * and returns the results of the search.
   *
   * @param items The player's assumed item inventory when running the search.
   * @param startingRegion The region to start the search in. Defaults to the root region if not provided.
   */
  searchRegions(items: ItemCollection, startingRegion?: Region): SearchResults {
    // If no starting region is defined, get the first region the Root region is connected to and start there
    if (!startingRegion) {
      startingRegion = this.rootRegion.getExits()[0].getConnectedRegion();
    }

    // Visited regions object
    const visited: VisitedRegionWrapper[] = [];

    // Use an array instance as a queue
    const regionQueue: Region[] = [];

    // Mark the starting region as visited and enqueue it
    visited.push({ region: startingRegion, entryPoint: null });
    regionQueue.push(startingRegion);

    while (regionQueue.length) {
      // Dequeue a region.
      const region = regionQueue.shift();

      // Get all exits (and their connected regions) for the current region.
      // If an adjacent region hasn't been visited, check if it can be visited.
      // If it can, mark it visited and enqueue it.
      for (const exit of region.getExits()) {
        const connectedRegion = exit.getConnectedRegion();

        // Check if the adjacent region can be visited
        if (exit.accessRule(items, this.settings)
          && !visited.find(visitedItem => visitedItem.region.getName() === connectedRegion.getName())) {
          visited.push({ region: connectedRegion, entryPoint: exit });
          regionQueue.push(connectedRegion);
        }
        // Else, continue BFS
      }
    }

    return new SearchResults({ visitedRegions: visited, items: items });
  }

  /**
   * Stub method meant to be overridden in a sub-class.
   * @param collectedItems
   */
  collectItems(collectedItems?: ItemCollection): ItemCollection {
    return null; //stub
  }
}

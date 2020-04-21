import { World } from './world';
import { LocationObject } from './location';
import { Entrance, EntranceObject } from './entrance';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { RandomizerSettings } from './randomizerSettings';

export interface RegionObject {
  name: string;
  locations?: LocationObject;
  exits?: EntranceObject;
}

/**
 * A region that has a name descriptor, item locations, and elevators (with their prerequisite items) required to access.
 */
export class Region {
  private name: string;
  private world: World;
  private locations: LocationCollection = new LocationCollection([]);
  private entrances: Entrance[] = [];
  private exits: Entrance[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Returns the name of the region.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the region's name.
   * @param name The region name being set.
   */
  setName(name: string) {
    this.name = name;
  }

  /**
   * Returns all item locations belonging to this region.
   */
  getLocations(): LocationCollection {
    return this.locations;
  }

  /**
   * Sets the collection of item locations belonging to this region.
   * @param locations The location collection being assigned.
   */
  setLocations(locations: LocationCollection) {
    this.locations = locations;
  }

  /**
   * Returns all of this region's exits to other regions.
   */
  getExits(): Entrance[] {
    return this.exits;
  }

  getExit(key: string): Entrance {
    return this.exits.find(exit => exit.getName() === key);
  }

  /**
   * Sets this region's available exits to other regions.
   * @param exits The collection of exits being assigned.
   */
  setExits(exits: Entrance[]) {
    this.exits = exits;
  }

  /**
   * Returns all of this region's entrances from other regions.
   */
  getEntrances(): Entrance[] {
    return this.entrances;
  }

  getEntrance(key: string): Entrance {
    return this.entrances.find(exit => exit.getName() === key);
  }

  /**
   * Sets this region's available entrances from other regions.
   * @param entrances The collection of entrances being assigned.
   */
  setEntrances(entrances: Entrance[]) {
    this.entrances = entrances;
  }

  /**
   * Returns the parent world that this region belongs to.
   */
  getWorld(): World {
    return this.world;
  }

  /**
   * Sets the parent world that this region belongs to.
   * @param world The game world being assigned.
   */
  setWorld(world: World) {
    this.world = world;
  }
}

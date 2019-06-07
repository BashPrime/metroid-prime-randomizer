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
 * @class
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

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getLocations(): LocationCollection {
    return this.locations;
  }

  setLocations(locations: LocationCollection) {
    this.locations = locations;
  }

  getExits(): Entrance[] {
    return this.exits;
  }

  setExits(exits: Entrance[]) {
    this.exits = exits;
  }

  getEntrances(): Entrance[] {
    return this.entrances;
  }

  setEntrances(entrances: Entrance[]) {
    this.entrances = entrances;
  }

  getWorld(): World {
    return this.world;
  }

  setWorld(world: World) {
    this.world = world;
  }

  canReach(items: ItemCollection, settings: RandomizerSettings): boolean {
    for (const entrance of this.entrances) {
      if (entrance.canReach(items, settings)) {
        return true;
      }
    }

    return false;
  }
}

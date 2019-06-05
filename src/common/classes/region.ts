import { World } from './world';
import { LocationObject } from './location';
import { Exit, ExitObject } from './exit';
import { LocationCollection } from './locationCollection';

export interface RegionObject {
  name: string;
  locations?: LocationObject;
  exits?: ExitObject;
}

/**
 * A region that has a name descriptor, item locations, and elevators (with their prerequisite items) required to access.
 * @class
 */
export class Region {
  private name: string;
  private world: World;
  private locations: LocationCollection = new LocationCollection([]);
  private entrances: Exit[] = [];
  private exits: Exit[] = [];

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

  getExits(): Exit[] {
    return this.exits;
  }

  setExits(exits: Exit[]) {
    this.exits = exits;
  }

  getEntrances(): Exit[] {
    return this.entrances;
  }

  setEntrances(entrances: Exit[]) {
    this.entrances = entrances;
  }

  getWorld(): World {
    return this.world;
  }

  setWorld(world: World) {
    this.world = world;
  }
}

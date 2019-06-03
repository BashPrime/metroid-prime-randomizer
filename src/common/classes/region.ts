import { LocationObject } from './location';
import { ExitObject } from './exit';

interface RegionArgs {
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
  private locations: LocationObject;
  private exits: ExitObject;

  constructor(args: RegionArgs) {
    this.exits = {};
    Object.assign(this, args);
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getLocations(): LocationObject {
    return this.locations;
  }

  setLocations(locations: LocationObject) {
    this.locations = locations;
  }

  getExits(): ExitObject {
    return this.exits;
  }

  setExits(exits: ExitObject) {
    this.exits = exits;
  }
}

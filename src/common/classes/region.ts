import { Location } from './location';
import { ExitObject } from './exit';

interface RegionArgs {
  name: string;
  locations?: { [key: string]: Location };
  exits?: ExitObject;
}

/**
 * A region that has a name descriptor, item locations, and elevators (with their prerequisite items) required to access.
 * @class
 */
export class Region {
  private name: string;
  private locations: { [key: string]: Location };
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

  getLocations(): { [key: string]: Location } {
    return this.locations;
  }

  setLocations(locations: { [key: string]: Location }) {
    this.locations = locations;
  }

  getExits(): ExitObject {
    return this.exits;
  }

  setExits(exits: ExitObject) {
    return this.exits;
  }
}

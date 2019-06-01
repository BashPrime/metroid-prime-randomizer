import { Location } from './location';
import { ItemCollection } from './itemCollection';
import { Elevator } from './elevator';

interface RegionArgs {
  name: string;
  locations?: { [key: string]: Location };
  elevators?: Elevator[];
}

/**
 * A region that has a name descriptor, item locations, and prerequisite items required to access.
 * @class
 */
export class Region {
  private name: string;
  private locations: { [key: string]: Location };
  private elevators: Elevator[];

  constructor(args: RegionArgs) {
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

  getElevators(): Elevator[] {
    return this.elevators;
  }

  setElevators(elevators: Elevator[]) {
    return this.elevators;
  }

  // canAccess(items: ItemCollection) {
  //   if (!this.accessItems) return true;

  //   for (const collection of this.accessItems) {
  //     if (collection.diff(items).size() === 0) return true;
  //   }

  //   return false;
  // }
}

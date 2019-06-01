import { Location } from './location';
import { ItemCollection } from './itemCollection';
import { Elevator } from './elevator';

interface RegionArgs {
  name: string;
  locations?: { [key: string]: Location };
  elevators?: Elevator[];
}

/**
 * A region that has a name descriptor, item locations, and elevators (with their prerequisite items) required to access.
 * @class
 */
export class Region {
  private name: string;
  private locations: { [key: string]: Location };
  private elevators: Elevator[];

  constructor(args: RegionArgs) {
    this.elevators = [];
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

  canAccess(items: ItemCollection) {
    for (const elevator of this.elevators) {
      if (elevator.canAccess(items)) return true;
    }

    return false;
  }
}

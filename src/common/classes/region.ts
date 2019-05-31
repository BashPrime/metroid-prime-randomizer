import { Location } from './location';
import { Item } from './item';



interface RegionArgs {
  name: string;
  locations?: { [key: string]: Location };
  accessItems?: Item[];
}

/**
 * A region that has a name descriptor, item locations, and prerequisite items required to access.
 * @class
 */
export class Region {
  private name: string;
  private locations: { [key: string]: Location };
  private accessItems: Item[];

  constructor(args: RegionArgs) {
    Object.assign(this, args);
  }

  getName(): string {
    return this.name;
  }

  getLocations(): { [key: string]: Location } {
    return this.locations;
  }

  getAccessItems(): Item[] {
    return this.accessItems;
  }
}

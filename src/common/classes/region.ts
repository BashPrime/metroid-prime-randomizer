import { Location } from './location';
import { Item } from './item';
import { ItemCollection } from './itemCollection';



interface RegionArgs {
  name: string;
  locations?: { [key: string]: Location };
  accessItems?: ItemCollection[]; //array of item collections. Access checks will iterate over item collections
}

/**
 * A region that has a name descriptor, item locations, and prerequisite items required to access.
 * @class
 */
export class Region {
  private name: string;
  private locations: { [key: string]: Location };
  private accessItems: ItemCollection[];

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

  getAccessItems(): ItemCollection[] {
    return this.accessItems;
  }

  setAccessItems(accessItems: ItemCollection[]): void {
    this.accessItems = accessItems;
  }

  canAccess(items: ItemCollection) {
    if (!this.accessItems) return true;

    for (const collection of this.accessItems) {
      if (collection.diff(items).size() === 0) return true;
    }

    return false;
  }
}

import {Collection} from './Collection';
import {ItemCollection} from './ItemCollection';
import {Location} from '../Location';

export class LocationCollection extends Collection {
  protected items: Array<Location>;

  constructor(items: Array<Location> = []) {
    super(items);
  }

  get(index: number): Location {
    return this.items[index];
  }

  public has(key: string): boolean {
    return this.items.find(item => item.getName() === key) ? true : false;
  }

  diff(otherItems: LocationCollection): LocationCollection {
    return new LocationCollection(this.items.filter(item => !otherItems.has(item.getName())));
  }

  merge(otherItems: LocationCollection): LocationCollection {
    return new LocationCollection(this.items.concat(otherItems.toArray()));
  }

  getEmptyLocations(): LocationCollection {
    return new LocationCollection(this.items.filter(location => !location.hasItem()));
  }

  toArray(): Array<Location> {
    return this.items;
  }

  getItems(): ItemCollection {
    return new ItemCollection(
      this.items.filter(location => {
        return location.hasItem();
      }).map(location => {
        return location.getItem();
      })
    );
  }
}

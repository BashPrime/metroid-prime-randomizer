import {Collection} from './Collection';
import {ItemCollection} from './ItemCollection';
import {Location} from '../Location';
import {PrimeItemName} from '../ItemType';

export class LocationCollection extends Collection {
  protected items: Array<Location>;

  constructor(items: Array<Location> = []) {
    super(items);
  }

  get(index: number): Location {
    return this.items[index];
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

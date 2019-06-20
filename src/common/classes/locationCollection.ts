import { Location } from './location';
import { ItemCollection } from './itemCollection';
import { Collection } from './collection';

export class LocationCollection extends Collection<Location> {
  protected items: Location[] = [];

  constructor(locations: Location[]) {
    super();
    this.items = locations;
  }

  filter(fn): LocationCollection {
    return new LocationCollection(this.items.filter(fn));
  }

  getLocationByKey(key: string): Location {
    return this.items.find(location => location.getName() === key);
  }

  getEmptyLocations(): Location[] {
    return this.items.filter(location => !location.hasItem());
  }

  has(key: string): boolean {
    return this.items.map(location => location.getName()).includes(key);
  }

  diff(otherLocations: LocationCollection): LocationCollection {
    return this.filter(item => !otherLocations.has(item.getName()));
  }

  merge(otherLocations: LocationCollection): LocationCollection {
    return new LocationCollection(this.items.concat(otherLocations.toArray()));
  }

  getItems(): ItemCollection {
    return new ItemCollection(
      this.items.filter(location => location.hasItem())
      .map(location => location.getItem())
    );
  }
}

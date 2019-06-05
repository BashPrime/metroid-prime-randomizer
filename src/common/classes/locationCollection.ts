import { Location } from './location';
import { ItemCollection } from './itemCollection';

export class LocationCollection {
  private locations: Location[] = [];

  constructor(locations: Location[]) {
    this.locations = locations;
  }

  getLocationsArray(): Location[] {
    return this.locations;
  }

  getLocationByKey(key: string): Location {
    return this.locations.find(location => location.getName() === key);
  }

  size(): number {
    return this.locations.length;
  }

  getEmptyLocations(): Location[] {
    return this.locations.filter(location => !location.hasItem());
  }

  has(locationKey: string): boolean {
    return this.locations.map(location => location.getName()).includes(locationKey);
  }

  diff(otherLocations: LocationCollection): LocationCollection {
    return new LocationCollection(this.locations.filter(item => !otherLocations.has(item.getName())));
  }

  merge(otherLocations: LocationCollection): LocationCollection {
    return new LocationCollection(this.locations.concat(otherLocations.getLocationsArray()));
  }

  getItems(): ItemCollection {
    return new ItemCollection(
      this.locations.filter(location => location.hasItem())
      .map(location => location.getItem())
    );
  }
}

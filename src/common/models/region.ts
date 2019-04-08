import { Location } from './location';

export class Region {
  private name: string;
  private locations: { [key: string]: Location };

  constructor(name: string, locations?: { [key: string]: Location }) {
    this.name = name;
    this.locations = locations;
  }

  getName(): string {
    return this.name;
  }

  getLocations(): { [key: string]: Location } {
    return this.locations;
  }
}

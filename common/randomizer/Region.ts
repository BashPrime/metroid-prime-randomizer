import {Location} from './Location';
import {RandomizerLogic} from './enums/RandomizerLogic';

export abstract class Region {
  protected name: string;
  protected locations: Map<string, Location>;

  public abstract init(config: any): void;

  public getName(): string {
    return this.name;
  }

  public getLocations(): Map<string, Location> {
    return this.locations;
  }

  public getLocationsArray(): Array<Location> {
    return Array.from(this.locations.values());
  }

  public abstract setVanillaArtifacts(): void;
}

import {Location} from './Location';
import {RandomizerLogic} from './enums/RandomizerLogic';

export abstract class Region {
  protected name: string;
  protected locations: Map<string, Location>;

  public init(logic: string = RandomizerLogic.NO_GLITCHES): void {
    switch (logic) {
      case RandomizerLogic.NORMAL:
        this.initNormal();
        break;
      case RandomizerLogic.HARD:
        this.initHard();
        break;
      case RandomizerLogic.INSANE:
        this.initInsane();
        break;
      case RandomizerLogic.NO_GLITCHES:
      default:
        this.initNoGlitches();
    }
  }

  public abstract initNoGlitches(): void;

  public abstract initNormal(): void;

  public abstract initHard(): void;

  public abstract initInsane(): void;

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

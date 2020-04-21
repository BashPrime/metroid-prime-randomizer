import { Region } from './region';
import { ItemCollection } from './itemCollection';
import { RandomizerSettings } from './randomizerSettings';

export interface EntranceObject {
  [key: string]: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;
};

export class Entrance {
  private name: string;
  private parentRegion: Region;
  private connectedRegion: Region;
  private connectedRegionKey: string;

  constructor(name: string, parentRegion?: Region) {
    this.name = name;
    this.parentRegion = parentRegion;
  }

  accessRule: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getParentRegion(): Region {
    return this.parentRegion;
  }

  setParentRegion(region: Region): void {
    this.parentRegion = region;
  }

  getConnectedRegion(): Region {
    return this.connectedRegion;
  }

  setConnectedRegion(region: Region): void {
    this.connectedRegion = region;
    this.setConnectedRegionKey(region.getName());
  }

  getConnectedRegionKey(): string {
    return this.connectedRegionKey;
  }

  setConnectedRegionKey(key: string): void {
    this.connectedRegionKey = key;
  }

  /**
   * Returns the opposite direction Entrance between this entrance's parent region and the connected region, or null if the connection is not bidirectional (two-way).
   */
  getOpposite(): Entrance {
    // Need to have a connected region/exits, or else we know the connection isn't bidirectional
    if (this.connectedRegion) {
      for (let exit of this.connectedRegion.getExits()) {
        // If the exit connects to this parent region, we have the other-way connection and return it immediately
        if (exit.getConnectedRegion().getName() === this.parentRegion.getName()) {
          return exit;
        }
      }
    }

    return null;
  }

  connect(region: Region): void {
    this.connectedRegion = region;

    // Make sure connections are bidirectional!
    const regionEntrances = region.getEntrances();
    regionEntrances.push(this);
    region.setEntrances(regionEntrances);
  }

  disconnect(): Region {
    const regionEntrances = this.connectedRegion.getEntrances();
    const newEntrances = regionEntrances.filter(entrance => entrance.getName() !== this.getName());
    this.connectedRegion.setEntrances(newEntrances);

    const previouslyConnected = this.connectedRegion;
    this.connectedRegion = null;
    return previouslyConnected;
  }

  connectToParent(region: Region): void {
    this.parentRegion = region;

    // Add region to parent's exits
    const regionExits = region.getExits();
    regionExits.push(this);
    region.setExits(regionExits);
  }

  disconnectFromParent(): Region {
    const regionExits = this.parentRegion.getExits();
    const newExits = regionExits.filter(exit => exit.getName() !== this.getName());
    this.parentRegion.setExits(newExits);

    const previouslyConnected = this.parentRegion;
    this.parentRegion = null;
    return previouslyConnected;
  }
}

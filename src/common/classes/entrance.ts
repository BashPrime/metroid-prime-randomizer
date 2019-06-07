import { Region } from './region';
import { ItemCollection } from './itemCollection';

export interface EntranceObject {
  [key: string]: (items?: ItemCollection) => boolean;
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

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getParentRegion(): Region {
    return this.parentRegion;
  }

  setParentRegion(region: Region) {
    this.parentRegion = region;
  }

  getConnectedRegion(): Region {
    return this.connectedRegion;
  }

  setConnectedRegion(region: Region) {
    this.connectedRegion = region;
  }

  getConnectedRegionKey(): string {
    return this.connectedRegionKey;
  }

  setConnectedRegionKey(key: string) {
    this.connectedRegionKey = key;
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

  canReach(items: ItemCollection): boolean {
    return true; // stub
  }

  canExit: (items: ItemCollection) => boolean;
}

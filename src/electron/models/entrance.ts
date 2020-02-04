import { Region } from './region';
import { ItemCollection } from './itemCollection';
import { RandomizerSettings } from './RandomizerSettings';

export interface EntranceObject {
  [key: string]: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;
};

export class Entrance {
  private name: string;
  private parentRegion: Region;
  private connectedRegion: Region;
  private connectedRegionKey: string;
  private elevator: boolean;

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

  isElevator(): boolean {
    return this.elevator;
  }

  setElevator(elevator: boolean): void {
    this.elevator = elevator;
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

  canReach(items: ItemCollection, settings: RandomizerSettings, noParent: boolean = false): boolean {
    return this.accessRule(items, settings) && (noParent || this.parentRegion.canReach(items));
  }
}

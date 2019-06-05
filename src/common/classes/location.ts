import { Item } from './item';
import { Region } from './region';
import { ItemCollection } from './itemCollection';
import { RandomizerSettings } from './randomizerSettings';

export interface LocationObject {
  [key: string]: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;
};

export class Location {
  private name: string;
  private parentRegion: Region;
  private item: Item;
  private enabled: boolean = true;

  constructor(name: string) {
    this.name = name;
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

  setParentRegion(parentRegion: Region) {
    this.parentRegion = parentRegion;
  }

  getItem(): Item {
    return this.item;
  }

  setItem(item: Item): void {
    this.item = item;
  }

  hasItem(): boolean {
    return this.item ? true : false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  canFill: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;
}

enum EnableType {
  ENABLED,
  PENDING,
  DISABLED
}

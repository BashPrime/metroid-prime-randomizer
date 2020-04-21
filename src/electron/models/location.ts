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
  private excluded: boolean = false;
  private locked: boolean = false;

  itemRule: (items: ItemCollection, settings: RandomizerSettings) => boolean;

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

  isExcluded(): boolean {
    return this.excluded;
  }

  setExcluded(excluded: boolean): void {
    this.excluded = excluded;
  }

  isLocked(): boolean {
    return this.locked;
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
  }
}

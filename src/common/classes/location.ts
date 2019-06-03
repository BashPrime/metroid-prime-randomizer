import { Item } from './item';
import { ItemCollection } from './itemCollection';
import { RandomizerSettings } from './randomizerSettings';

export interface LocationObject {
  [key: string]: (items?: ItemCollection, settings?: RandomizerSettings) => boolean;
};

export class Location {
  private name: string;
  private index: number;
  private item: Item;

  constructor(name: string, index: number, item?: Item) {
    this.name = name;
    this.index = index;
    this.item = item;
  }

  getName(): string {
    return this.name;
  }

  getIndex(): number {
    return this.index;
  }

  getItem(): Item {
    return this.item;
  }

  setItem(item: Item): void {
    this.item = item;
  }

  hasItem(): boolean {
    return this.item !== undefined;
  }
}

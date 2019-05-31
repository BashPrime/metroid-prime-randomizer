import { Item } from './item';

interface LocationArgs {
  name: string;
  index: number;
  item?: Item;
}

export class Location {
  private name: string;
  private index: number;
  private item: Item;

  constructor(args: LocationArgs) {
    Object.assign(this, args);
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

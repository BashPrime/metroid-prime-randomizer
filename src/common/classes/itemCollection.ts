import { Item } from './item';

export class ItemCollection {
  private items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  getItems(): Item[] {
    return this.items;
  }

  has(itemKey: string): boolean {
    return this.items.map(item => item.getName()).includes(itemKey);
  }

  hasCount(itemKey: string, count: number): boolean {
    return this.items.filter(item => item.getName() === itemKey).length >= count;
  }

  diff(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.filter(item => !otherItems.has(item.getName())));
  }

  merge(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.concat(otherItems.getItems()));
  }
}

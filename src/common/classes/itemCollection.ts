import { Item } from './item';
import { Collection } from './collection';

export class ItemCollection extends Collection<Item> {
  protected items: Item[];

  constructor(items: Item[]) {
    super();
    this.items = items;
  }

  filter(fn): ItemCollection {
    return new ItemCollection(this.items.filter(fn));
  }

  has(key: string): boolean {
    return this.items.map(item => item.getName()).includes(key);
  }

  hasCount(key: string, count: number): boolean {
    return this.items.filter(item => item.getName() === key).length >= count;
  }

  diff(otherItems: ItemCollection): ItemCollection {
    return this.filter(item => !otherItems.has(item.getName()));
  }

  merge(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.concat(otherItems.toArray()));
  }
}

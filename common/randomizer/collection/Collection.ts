export class Collection {
  protected items: Array<any>;

  constructor(items: Array<any> = []) {
    this.items = items;
  }

  public get(index: number): any {
    return this.items[index];
  }

  public add(item: any): void {
    this.items.push(item);
  }

  public remove(index: number): void {
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  public size(): number {
    return this.items.length;
  }

  public has(key: any): boolean {
    return this.items.indexOf(key) > -1;
  }

  public diff(otherItems: Collection): Collection {
    const otherArr = otherItems.toArray();
    return new Collection(this.items.filter(item => otherArr.indexOf(item) < 0));
  }

  public merge(otherItems: Collection): Collection {
    return new Collection(this.items.concat(otherItems.toArray()));
  }

  public toArray(): Array<any> {
    return this.items;
  }
}

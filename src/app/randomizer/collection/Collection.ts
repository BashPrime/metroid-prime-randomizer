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

    public size(): number {
        return this.items.length;
    }

    public has(key: any): boolean {
        return this.items.indexOf(key) > -1;
    }
}
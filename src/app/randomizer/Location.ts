import { Item } from './Item';
import { ItemCollection } from './collection/ItemCollection';

export class Location {
    protected name: string;
    protected fileName: string;
    protected id: number;
    protected item: Item = undefined;

    constructor(name:string, fileName: string, id: number) {
        this.name = name;
        this.fileName = fileName;
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public getItem(): Item {
        return this.item;
    }

    public setItem(item: Item): void {
        this.item = item;
    }

    public hasItem(): boolean {
        return this.item !== undefined;
    }

    public canFillItem = function(item: Item, items: ItemCollection): boolean {
        return false;
    }

    public canEscape = function(items, item): boolean {
        return true;
    }
}
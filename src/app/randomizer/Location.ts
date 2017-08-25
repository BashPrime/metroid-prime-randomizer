import { Item } from './Item';
import { ItemCollection } from './collection/ItemCollection';

export class Location {
    protected name: string;
    protected fileName: string;
    protected id: number;
    protected item: Item = undefined;
    protected majorItemLocation: boolean;

    constructor(name:string, fileName: string, id: number, majorItemLocation: boolean = false) {
        this.name = name;
        this.fileName = fileName;
        this.id = id;
        this.majorItemLocation = majorItemLocation;
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

    public isMajorItemLocation(): boolean {
        return this.majorItemLocation;
    }

    public canFillItem = function(item: Item, items: ItemCollection): boolean {
        return false;
    }

    public canEscape = function(items, item): boolean {
        return true;
    }    
}
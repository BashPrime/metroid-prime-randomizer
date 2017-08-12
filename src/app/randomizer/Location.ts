import { Item } from './Item';

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

    public getItem(): Item {
        return this.item;
    }

    public setItem(item: Item): void {
        this.item = item;
    }

    public canFill = function(items, item): boolean {
        return false;
    }

    public canEscape = function(items, item): boolean {
        return false;
    }
}
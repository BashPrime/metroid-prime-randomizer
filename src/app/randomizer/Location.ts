import { Item } from './Item';

export class Location {
    protected fileName: string;
    protected id: number;
    protected item: Item;

    constructor(fileName: string, id: number, item: Item) {
        this.fileName = fileName;
        this.id = id;
        this.item = item;
    }
}
import { Type } from "@angular/compiler/src/core";

export enum OptionType {
    NUMBER,
    STRING,
    BOOLEAN
}

export class Option {
    name: string;
    type: OptionType;
    bitWidth: number;
    shared: boolean;

    constructor (name: string, type: OptionType, bitWidth: number, shared: boolean) {
        this.name = name;
        this.type = type;
        this.bitWidth = bitWidth;
        this.shared = shared;
    }
}

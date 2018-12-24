import { Type } from "@angular/compiler/src/core";

export enum OptionType {
    NUMBER,
    STRING,
    BOOLEAN,
    DROPDOWN
}

export class Option {
    name: string;
    type: OptionType;
    bitWidth: number;
    shared: boolean;
    minValue: number;
    maxValue: number;

    constructor (name: string, type: OptionType, bitWidth: number, shared: boolean, minValue?: number, maxValue?: number) {
        this.name = name;
        this.type = type;
        this.bitWidth = bitWidth;
        this.shared = shared;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}

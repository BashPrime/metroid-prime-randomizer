import { ItemCategory } from '../enums/itemCategory';

export interface AmmoParams {
  name: string;
  maximum: number;
  items: readonly number[];
  broadCategory: ItemCategory;
  unlockedBy?: number;
  temporaries: readonly number[];
  models: readonly number[];
}

export default class Ammo implements AmmoParams {
  readonly name: string;
  readonly maximum: number;
  readonly items: readonly number[];
  readonly broadCategory: ItemCategory;
  readonly unlockedBy?: number;
  readonly temporaries: readonly number[] = [];
  readonly models: readonly number[] = [];

  constructor(params: AmmoParams) {
    Object.assign(this, params);
  }
}

import { ItemCategory } from '../enums/itemCategory';

export interface MajorItemParams {
  name: string;
  itemCategory: ItemCategory;
  broadCategory: ItemCategory;
  modelIndex?: number;
  progression: readonly number[];
  ammoIndex: readonly number[];
  convertsIndices: readonly number[];
  required: boolean;
  originalIndex?: number;
  probabilityOffset: number;
  probabilityMultiplier: number;
  warning?: string;
}

export default class MajorItem implements MajorItemParams {
  readonly name: string;
  readonly itemCategory: ItemCategory;
  readonly broadCategory: ItemCategory;
  readonly modelIndex?: number;
  readonly progression: readonly number[];
  readonly ammoIndex: readonly number[] = [];
  readonly convertsIndices: readonly number[] = [];
  readonly required: boolean = false;
  readonly originalIndex?: number;
  readonly probabilityOffset: number = 0;
  readonly probabilityMultiplier: number = 1;
  readonly warning?: string;

  constructor(params: MajorItemParams) {
    Object.assign(this, params);
  }
}

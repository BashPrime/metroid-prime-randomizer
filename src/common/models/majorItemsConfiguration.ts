import MajorItem from './majorItem';
import MajorItemState from './majorItemState';

interface ItemsState {
  [key: string]: readonly [item: MajorItem, itemState: MajorItemState];
}

export interface MajorItemsConfigurationParams {
  itemsState: ItemsState;
  minimumRandomStartingItems: number;
  maximumRandomStartingItems: number;
}

export default class MajorItemsConfiguration implements MajorItemsConfigurationParams {
  readonly itemsState: ItemsState;
  readonly minimumRandomStartingItems: number;
  readonly maximumRandomStartingItems: number;

  constructor(params: MajorItemsConfigurationParams) {
    Object.assign(this, params);
  }
}

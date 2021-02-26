export interface MajorItemStateParams {
  includeCopyInOriginalLocation: boolean;
  numShuffledPickups: number;
  numIncludedInStartingItems: number;
  includedAmmo: readonly number[];
  allowedAsRandomStartingItem: boolean;
}

export default class MajorItemState implements MajorItemStateParams {
  readonly includeCopyInOriginalLocation: boolean = false;
  readonly numShuffledPickups: number = 0;
  readonly numIncludedInStartingItems: number = 0;
  readonly includedAmmo: readonly number[] = [];
  readonly allowedAsRandomStartingItem: boolean = true;

  constructor(params: MajorItemStateParams) {
    Object.assign(this, params);
  }
}

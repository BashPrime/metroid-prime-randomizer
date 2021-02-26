export interface AmmoStateParams {
  variance: number;
  pickupCount: number;
  requiresMajorItem: boolean;
}

export default class AmmoState implements AmmoStateParams {
  readonly variance: number = 0;
  readonly pickupCount: number = 0;
  readonly requiresMajorItem: boolean = true;
  private readonly MAXIMUM_PICKUP_COUNT = 64;

  constructor(params: AmmoStateParams) {
    Object.assign(this, params);
  }
}

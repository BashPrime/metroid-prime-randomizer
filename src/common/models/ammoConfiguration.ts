import Ammo from './ammo';
import AmmoState from './ammoState';

interface MaximumAmmo {
  [key: number]: number;
}

interface ItemsState {
  [key: string]: readonly [ammo: Ammo, state: AmmoState];
}

export interface AmmoConfigurationParams {
  maximumAmmo: MaximumAmmo;
  itemsState: AmmoState;
}

export default class AmmoConfiguration implements AmmoConfigurationParams {
  readonly maximumAmmo: MaximumAmmo;
  readonly itemsState: AmmoState;

  constructor(params: AmmoConfigurationParams) {
    Object.assign(this, params);
  }
}

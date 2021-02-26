import { PickupModelStyle } from '../enums/pickupModelStyle';

export function defaultStyle() {
  return PickupModelStyle.VISIBLE;
}

export function longName(style: PickupModelStyle) {
  return PRETTY_MODEL_STYLES[style];
}

const PRETTY_MODEL_STYLES = {
  [PickupModelStyle.VISIBLE]: 'Visible',
  [PickupModelStyle.HIDDEN]: 'Hidden'
}

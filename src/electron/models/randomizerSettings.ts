import { Checkbox, SelectOption } from './option';

export interface RandomizerSettingsArgs {
  seed?: number;
  spoiler?: boolean;
  goal?: string;
  disabledLocations?: object;
  allowedTricks?: object;
}

export class RandomizerSettings {
  seed: number;
  spoiler: boolean;
  goal: string;
  disabledLocations: object;
  allowedTricks: object;

  constructor(args: RandomizerSettingsArgs) {
    Object.assign(this, args);
    this.assignDefaultSettings(args);
  }

  protected assignDefaultSettings(args: RandomizerSettingsArgs) {};
}

export function arrayRangeToObject(min: number, max: number): { [key: string]: number } {
  const obj = {};
  const arrayRange = Array.from({ length: max - min + 1 }, (x, i) => min + 1);

  arrayRange.forEach(item => {
    obj[item.toString()] = item;
  });

  return obj;
}

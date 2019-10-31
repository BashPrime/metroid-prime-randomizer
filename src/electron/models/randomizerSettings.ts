import { Checkbox, SelectOption } from './option';

export interface RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  goal?: string;
  disabledLocations?: object;
  allowedTricks?: object;
}

export class RandomizerSettings {
  seed: string;
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

export function numberRangeToObject(min: number, max: number): { [key: string]: number } {
  const obj = {};
  const arrayRange = Array.from({ length: max - min + 1 }, (x, i) => i + 1);

  arrayRange.forEach(item => {
    obj[item.toString()] = item;
  });

  return obj;
}

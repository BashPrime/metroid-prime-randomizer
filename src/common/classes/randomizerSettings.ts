import { Checkbox, SelectOption } from './option';

export interface RandomizerSettingsArgs {
  spoiler?: boolean;
  goal?: string;
  disabledLocations?: string[];
  allowedTricks?: string[];
}

export class RandomizerSettings {
  spoiler: boolean;
  goal: string;
  disabledLocations: string[];
  allowedTricks: string[];

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

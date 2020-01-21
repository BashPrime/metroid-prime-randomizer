import { Checkbox, SelectOption } from './option';

export interface RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  goal?: string;
  excludeLocations?: object;
  allowedTricks?: object;
}

export class RandomizerSettings {
  seed: string;
  spoiler: boolean;
  goal: string;
  excludeLocations: object;
  allowedTricks: object;

  constructor(args: RandomizerSettingsArgs) {
    Object.assign(this, args);
    this.assignDefaultSettings(args);
  }

  protected assignDefaultSettings(args: RandomizerSettingsArgs) {};
}

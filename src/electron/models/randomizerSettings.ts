import { Checkbox, SelectOption } from './option';

export interface RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  excludeLocations?: object;
  tricks?: object;
}

export class RandomizerSettings {
  seed: string;
  spoiler: boolean;
  excludeLocations: object;
  tricks: object;

  constructor() { }
}

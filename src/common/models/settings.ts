import { Checkbox } from './option';

export class Settings {
  spoiler: boolean;
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
  goal: string;
  goalArtifacts: number;
  artifactLocationHints: boolean;
  heatDamagePrevention: string;
  suitDamageReduction: string;
  disabledLocations: boolean[];
  allowedTricks: string[];
}

const settings = [
  new Checkbox({ name: 'spoiler', displayName: 'Create Spoiler', shared: true }),
  new Checkbox({ name: 'skipFrigate', displayName: 'Skip the Space Pirate Frigate', shared: true }),
  new Checkbox({ name: 'skipHudPopups', displayName: 'Skip Item Acquisition Popups', shared: true }),
  new Checkbox({ name: 'hideItemModels', displayName: 'Hide Item Models', shared: true }),
];

const tricks = {
  alcoveDash: {
    name: 'Alcove Dash',
    tooltip: `
      It's possible to reach Alcove without any items by either scan dashing off a Red Starburst (1.00 only),
      or by locking onto a Seedling in Temple Hall, maintaining the lock on, and dashing that way.
    `
  }
};

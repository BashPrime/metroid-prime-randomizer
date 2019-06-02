import { RandomizerSettings, RandomizerSettingsArgs, arrayRangeToObject } from '../randomizerSettings';
import { Checkbox, SelectOption } from '../option';


interface PrimeRandomizerSettingsArgs extends RandomizerSettingsArgs {
  spoiler?: boolean;
  skipFrigate?: boolean;
  skipHudPopups?: boolean;
  hideItemModels?: boolean;
  goal?: string;
  goalArtifacts?: number;
  artifactLocationHints?: boolean;
  heatDamagePrevention?: string;
  suitDamageReduction?: string;
  shuffleArtifacts?: boolean;
  shuffleMissileLauncher?: boolean;
  shuffleMorph?: boolean;
  shuffleBombs?: boolean;
  shuffleCharge?: boolean;
  shuffleSpaceJump?: boolean;
  disabledLocations?: string[];
  allowedTricks?: string[];
}

export class PrimeRandomizerSettings extends RandomizerSettings {
  spoiler: boolean;
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
  goal: string;
  goalArtifacts: number;
  artifactLocationHints: boolean;
  heatDamagePrevention: string;
  suitDamageReduction: string;
  disabledLocations: string[];
  allowedTricks: string[];

  constructor(args: PrimeRandomizerSettingsArgs) {
    super(args);
  }

  protected assignDefaultSettings(args: RandomizerSettingsArgs): void {
    // Get only settings metadata for arguments that weren't provided
    const argKeys = Object.keys(args);
    const defaultSettings = settings.filter(setting => !argKeys.includes(setting.name));

    // Assign default value to missing fields
    for (let setting of defaultSettings) {
      this[setting.name] = setting.default;
    }
  }
}

// Object containing settings metadata such as their default values, whether each setting is shared, etc
const settings = [
  new Checkbox({ name: 'spoiler', displayName: 'Create Spoiler', shared: true, default: false }),
  new Checkbox({ name: 'skipFrigate', displayName: 'Skip the Space Pirate Frigate', shared: true, default: true }),
  new Checkbox({ name: 'skipHudPopups', displayName: 'Skip Item Acquisition Popups', shared: true, default: true }),
  new Checkbox({ name: 'hideItemModels', displayName: 'Hide Item Models', shared: true, default: false }),
  new SelectOption({
    name: 'goal',
    displayName: 'Goal',
    shared: true,
    choices: {
      'always-open': 'Always Open',
      'artifact-collection': 'Artifact Collection',
      'all-bosses': 'All Bosses'
    },
    default: 'artifact-collection'
  }),
  new SelectOption({
    name: 'goalArtifacts',
    displayName: 'Number of Chozo Artifacts',
    shared: true,
    choices: arrayRangeToObject(1, 12),
    default: 12
  }),
  new Checkbox({ name: 'artifactLocationHints', displayName: 'Show Chozo Artifact location hints in Artifact Temple', shared: true, default: false }),
  new SelectOption({
    name: 'heatDamagePrevention',
    displayName: 'Heat Damage Prevention',
    shared: true,
    choices: {
      'any-suit': 'Any Suit',
      'varia-only': 'Varia Only'
    },
    default: 'any-suit'
  }),
  new SelectOption({
    name: 'suitDamageReduction',
    displayName: 'Suit Damage Reduction',
    shared: true,
    choices: {
      'default': 'Default',
      'progressive': 'Progressive'
    },
    default: 'default'
  }),
  new Checkbox({ name: 'shuffleArtifacts', displayName: 'Shuffle Chozo Artifacts', shared: true, default: true }),
  new Checkbox({ name: 'shuffleMissileLauncher', displayName: 'Shuffle Missile Launcher', shared: true, default: true }),
  new Checkbox({ name: 'shuffleMorph', displayName: 'Shuffle Morph Ball', shared: true, default: true }),
  new Checkbox({ name: 'shuffleBombs', displayName: 'Shuffle Bombs', shared: true, default: true }),
  new Checkbox({ name: 'shuffleCharge', displayName: 'Shuffle Charge Beam', shared: true, default: true }),
  new Checkbox({ name: 'shuffleSpaceJump', displayName: 'Shuffle Space Jump Boots', shared: true, default: true })
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

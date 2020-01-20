import * as bigInt from 'big-integer';
import * as crypto from 'crypto';

import { RandomizerSettings, RandomizerSettingsArgs } from '../randomizerSettings';
import { Checkbox, SelectOption, SettingsChoice, discreteNumberSelection } from '../option';
import { OptionType } from '../../enums/optionType';
import { AllowedTricks } from './allowedTricks';
import { SettingsFlagsArgs } from '../settingsFlags';
import { DisabledLocations } from './disabledLocations';
import * as Utilities from '../../utilities';

const SETTINGS_STRING_DELIMITER = '-';

interface PrimeRandomizerSettingsArgs extends RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  skipFrigate?: boolean;
  skipHudPopups?: boolean;
  hideItemModels?: boolean;
  goal?: string;
  goalArtifacts?: number;
  artifactLocationHints?: boolean;
  heatProtection?: string;
  suitDamageReduction?: string;
  disabledLocations?: SettingsFlagsArgs;
  allowedTricks?: SettingsFlagsArgs;
}

export class PrimeRandomizerSettings extends RandomizerSettings {
  seed: string;
  spoiler: boolean;
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
  goal: string;
  goalArtifacts: number;
  artifactLocationHints: boolean;
  heatProtection: string;
  suitDamageReduction: string;
  disabledLocations: DisabledLocations;
  allowedTricks: AllowedTricks;

  constructor(args: PrimeRandomizerSettingsArgs) {
    super(args);
    this.disabledLocations = new DisabledLocations(args.disabledLocations);
    this.allowedTricks = new AllowedTricks(args.allowedTricks);
  }

  getNumericSeed(): number {
    const stringToBeHashed = this.getSettingsString() + this.seed;
    const sha256Hash = crypto.createHash('sha256').update(stringToBeHashed).digest('hex');

    return Utilities.parseSafeIntegerFromSha256(sha256Hash);
  }

  getSettingsString(): string {
    let bits = '';
    const sharedSettings = settings.filter(setting => setting.shared);

    for (const setting of sharedSettings) {
      let settingValue = this[setting.name];

      // Convert value to string to ensure it is found in select option
      // if (setting.type === OptionType.SELECT && typeof(settingValue) === 'number') {
      //   settingValue = settingValue.toString();
      // }

      switch (setting.type) {
        case OptionType.BOOLEAN:
          bits += settingValue ? '1' : '0';
          break;
        case OptionType.SELECT:
          const index = setting.choices.map(choice => choice.value).indexOf(settingValue);
          bits += Utilities.toPaddedBitString(index, setting.bitWidth);
          break;
      }
    }

    // Get bitstring from allowed tricks
    let allowedBits = '';
    for (let key of Object.keys(this.allowedTricks)) {
      allowedBits += this.allowedTricks[key] ? '1' : '0';
    }

    return bigInt(bits, 2).toString(36) + SETTINGS_STRING_DELIMITER + this.allowedTricks.toSettingsString().toUpperCase();
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

  static fromSettingsString(settingsString: string): PrimeRandomizerSettings {
    // Return null if settings string is empty
    if (!settingsString) {
      return null;
    }

    const settingsStringSections = settingsString.split(SETTINGS_STRING_DELIMITER);

    // Get general settings first
    const settings = new PrimeRandomizerSettings(getGeneralSettingsFromSettingsString(settingsStringSections[0]));

    // Get allowed tricks if they are provided
    if (settingsStringSections.length >= 2) {
      settings.allowedTricks = AllowedTricks.fromSettingsString(settingsStringSections[1]);
    }

    return settings;
  }
}

export function getSetting(name: string): Checkbox | SelectOption {
  return settings.find(setting => setting.name === name);
}

function getGeneralSettingsFromSettingsString(settingsString): object {
  const newSettings = {};
  const bitString = Utilities.getPaddedBitStringFromSettingsString(settingsString, getTotalSharedSettingsBitWidth());

  let index = 0;
  for (const setting of settings.filter(setting => setting.shared)) {
    const bitWidth = setting.bitWidth;
    const currentBits = bitString.substr(index, bitWidth);

    switch (setting.type) {
      case OptionType.BOOLEAN:
        newSettings[setting.name] = parseInt(currentBits, 2) === 1 ? true : false;
        break;
      case OptionType.SELECT:
        newSettings[setting.name] = setting.choices[parseInt(currentBits, 2)].value;
        break;
    }
    index += bitWidth;
  }

  return newSettings;
}

function getAllowedTricksFromSettingString(settingsString: string): AllowedTricks {
  const newAllowedTricks = {};
  const allowedTrickKeys = Object.keys(new PrimeRandomizerSettings({}).allowedTricks);
  const bitString = Utilities.getPaddedBitStringFromSettingsString(settingsString, allowedTrickKeys.length);

  let index = 0;
  for (const key of allowedTrickKeys) {
    const currentBit = bitString.substr(index, 1);
    newAllowedTricks[key] = currentBit === '1' ? true : false;
    index += 1;
  }

  return new AllowedTricks(newAllowedTricks);
}

function getTotalSharedSettingsBitWidth(): number {
  let totalBitWidth = 0;

  for (const bitWidth of settings.filter(setting => setting.shared).map(setting => setting.bitWidth)) {
    totalBitWidth += bitWidth;
  }

  return totalBitWidth;
}

/**
 * Array of randomizer/patcher settings including their default values
 */
export const settings = [
  new Checkbox({ name: 'spoiler', shared: true, default: true }),
  new Checkbox({ name: 'skipFrigate', shared: true, default: true }),
  new Checkbox({ name: 'skipHudPopups', shared: true, default: true }),
  new Checkbox({ name: 'hideItemModels', shared: true, default: false }),
  new SelectOption({
    name: 'goal',
    shared: true,
    choices: [
      {
        name: 'Artifact Collection',
        value: 'artifact-collection'
      },
      {
        name: 'Always Open',
        value: 'always-open'
      },
      {
        name: 'All Bosses',
        value: 'all-bosses'
      }
    ],
    default: 'artifact-collection'
  }),
  new SelectOption({
    name: 'goalArtifacts',
    shared: true,
    choices: discreteNumberSelection(1, 12),
    default: 12
  }),
  new Checkbox({ name: 'artifactLocationHints', shared: true, default: true }),
  new SelectOption({
    name: 'heatProtection',
    shared: true,
    choices: [
      {
        name: 'Any Suit',
        value: 'any-suit'
      },
      {
        name: 'Varia Only',
        value: 'varia-only'
      }
    ],
    default: 'any-suit'
  }),
  new SelectOption({
    name: 'suitDamageReduction',
    shared: true,
    choices: [
      {
        name: 'Default',
        value: 'default'
      },
      {
        name: 'Progressive',
        value: 'progressive'
      }
    ],
    default: 'default'
  })
];

export const details: OptionDetails = {
  skipFrigate: {
    name: 'Skip the Space Pirate Frigate',
    description: ''
  },
  skipHudPopups: {
    name: 'Skip Item Acquisition Popups',
    description: ''
  },
  hideItemModels: {
    name: 'Hide Item Models',
    description: ''
  },
  goal: {
    name: 'Goal',
    description: ''
  },
  goalArtifacts: {
    name: 'Number of Chozo Artifacts',
    description: ''
  },
  artifactLocationHints: {
    name: 'Show Chozo Artifact location hints in Artifact Temple',
    description: ''
  },
  heatProtection: {
    name: 'Heat Protection',
    description: ''
  },
  suitDamageReduction: {
    name: 'Suit Damage Reduction',
    description: ''
  },
  alcoveNoItems: {
    name: 'Alcove with No Additional Items',
    description: `It's possible to reach the Alcove without any items by performing a dash jump from Samus's ship to the upper ledge.

    This can be done with a scan dash off the Red Starburst (1.00 only), or by locking onto a Seedling in Temple Hall.`
  },
  arborChamberWithoutPlasma: {
    name: 'Arbor Chamber without Plasma Beam',
    description: `Arbor Chamber can be entered through the ceiling by going out of bounds.`
  },
  boostThroughBombTunnels: {
    name: 'Traverse Morph Ball Bomb tunnels with Boost Ball',
    description: `In morph tunnels that normally require single bomb jumps to traverse or access them, a properly-timed boost can be used instead.

    This trick is difficult and not recommended for beginners.`
  },
  climbTowerOfLightNoMissiles: {
    name: 'Climb Tower of Light without Missiles',
    description: `Tower of Light can be climbed by dashing to the outside edges, skipping the 40 missile requirement.`
  },
  crossTwinFiresTunnelWithoutSpider: {
    name: 'Cross Twin Fires Tunnel without Spider Ball',
    description: `Twin Fires Tunnel can be crossed with an R jump, or a scan dash off the spider track from the wall.`
  },
  mainPlazaItemsOnlySpaceJump: {
    name: 'Main Plaza Items with only Space Jump',
    description: `The Grapple Ledge, Locked Door, and Half Pipe items can be reached with only Space Jump equipped.`
  },
  towerChamberNoGravity: {
    name: 'Tower Chamber without Gravity Suit',
    description: `The ledge can be reached by underwater slope jumping to the door without the Gravity Suit equipped.`
  },
  upperRuinedShrineTowerOfLightFewerAccessReqs: {
    name: 'Upper Ruined Shrine & Tower of Light - Fewer Access Requirements',
    description: `Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).`
  },
  warriorShrineWithoutBoost: {
    name: 'Warrior Shrine without Boost Ball',
    description: `Can space jump to the upper ledge in Monitor Station via R jump or dash.`
  }
};

interface OptionDetails {
  [key: string]: OptionDetail;
}

interface OptionDetail {
  name: string;
  description: string;
}

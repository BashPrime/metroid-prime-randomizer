import * as bigInt from 'big-integer';
import * as crypto from 'crypto';

import { RandomizerSettings, RandomizerSettingsArgs } from '../randomizerSettings';
import { Checkbox, SelectOption, SettingsChoice, discreteNumberSelection } from '../option';
import { OptionType } from '../../enums/optionType';
import { Tricks } from './tricks';
import { SettingsFlagsArgs } from '../settingsFlags';
import { ExcludeLocations } from './excludeLocations';
import * as Utilities from '../../utilities';

const SETTINGS_STRING_DELIMITER = '-';

export interface PrimeRandomizerSettingsArgs extends RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  elevatorShuffle?: boolean;
  skipFrigate?: boolean;
  skipHudPopups?: boolean;
  hideItemModels?: boolean;
  goal?: string;
  goalArtifacts?: number;
  artifactLocationHints?: boolean;
  heatProtection?: string;
  suitDamageReduction?: string;
  excludeLocations?: SettingsFlagsArgs;
  tricks?: SettingsFlagsArgs;
}

export class PrimeRandomizerSettings extends RandomizerSettings {
  seed: string;
  spoiler: boolean = false;
  elevatorShuffle: boolean = false;
  skipFrigate: boolean = true;
  skipHudPopups: boolean = true;
  hideItemModels: boolean = false;
  goal: string = 'artifact-collection';
  goalArtifacts: number = 12;
  artifactLocationHints: boolean = true;
  heatProtection: string = 'any-suit';
  suitDamageReduction: string = 'default';
  excludeLocations: ExcludeLocations = new ExcludeLocations();
  tricks: Tricks = new Tricks();

  constructor(args?: PrimeRandomizerSettingsArgs) {
    super();

    // Overload if args are supplied
    if (args) {
      // Overload general settings
      Object.assign(this, args);

      // Overload locations and tricks
      this.excludeLocations = new ExcludeLocations(args.excludeLocations);
      this.tricks = new Tricks(args.tricks);
    }
  }

  getNumericSeed(): number {
    if (!this.seed) {
      throw new Error('Cannot get numeric seed. Settings seed is undefined or null (' + this.seed + ')');
    }

    const stringToBeHashed = this.toSettingsString() + this.seed;
    const sha256Hash = crypto.createHash('sha256').update(stringToBeHashed).digest('hex');

    return Utilities.parseSafeIntegerFromSha256(sha256Hash);
  }

  toSettingsString(): string {
    let bits = '';
    const sharedSettings = settings.filter(setting => setting.shared);

    for (const setting of sharedSettings) {
      let settingValue = this[setting.name];

      switch (setting.type) {
        case OptionType.BOOLEAN:
          bits += settingValue ? '1' : '0';
          break;
        case OptionType.SELECT:
          const index = setting.choices.map(choice => choice.value).indexOf(settingValue);

          if (index < 0) {
            throw new Error('Cannot find index for setting ' + setting.name + ' (value: ' + settingValue + ')');
          }

          bits += Utilities.toPaddedBitString(index, setting.bitWidth);
          break;
      }
    }

    return bigInt(bits, 2).toString(36).toUpperCase()
      + SETTINGS_STRING_DELIMITER
      + this.excludeLocations.toSettingsString()
      + SETTINGS_STRING_DELIMITER
      + this.tricks.toSettingsString();
  }

  /**
   * Returns prettified version of this settings object, with more readable property keys.
   * @param excludedKeys Array of keys to filter out of the returned object
   */
  prettify(excludedKeys?: string[]) {
    const prettified = {};

    const filtered = Utilities.filterProperties(this, ['excludeLocations', 'tricks', ...excludedKeys]);

    for (let key of Object.keys(filtered)) {
      // Try to get prettified setting name, if applicable
      const newKey = details[key] ? details[key].name : key;
      // Try to get prettified value, otherwise use current value
      prettified[newKey] = getSetting(key) ? getSetting(key).choices.find(choice => choice.value === filtered[key]).name : filtered[key];
    }

    // Add excluded tricks and tricks as arrays instead of objects
    Object.assign(prettified, {
      ['Exclude Locations']: this.excludeLocations.toArray(),
      ['Tricks']: this.tricks.toArray()
    });

    return Utilities.sortObjectByProperties(prettified);
  }

  static fromSettingsString(settingsString: string): PrimeRandomizerSettings {
    // Return null if settings string is empty
    if (!settingsString) {
      return null;
    }

    const settingsStringSections = settingsString.split(SETTINGS_STRING_DELIMITER);

    // Settings string must have 3 sections:
    // Settings, excluded locations, allowed tricks
    if (settingsStringSections.length < 3) {
      return null;
    }

    // Get general settings first
    const settings = new PrimeRandomizerSettings(getGeneralSettingsFromSettingsString(settingsStringSections[0]));
    // Next, get excluded locations
    settings.excludeLocations = ExcludeLocations.fromSettingsString(settingsStringSections[1]);
    // Last, get tricks
    settings.tricks = Tricks.fromSettingsString(settingsStringSections[2]);

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
  new Checkbox({ name: 'elevatorShuffle', shared: true, default: false }),
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
  elevatorShuffle: {
    name: 'Elevator Shuffle',
    description: 'Shuffles all of the elevators bidirectionally.'
  },
  heatProtection: {
    name: 'Heat Protection',
    description: 'Test'
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

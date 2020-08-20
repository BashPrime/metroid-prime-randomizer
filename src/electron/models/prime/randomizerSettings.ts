import * as bigInt from 'big-integer';
import * as crypto from 'crypto';

import { RandomizerSettings, RandomizerSettingsArgs } from '../randomizerSettings';
import { Checkbox, SelectOption, discreteNumberSelection, ObjectOption, NumberOption } from '../option';
import { OptionType } from '../../enums/optionType';
import { PointOfNoReturnItems } from '../../enums/pointOfNoReturnItems';
import { Tricks } from './tricks';
import { SettingsFlagsArgs } from '../settingsFlags';
import { ExcludeLocations } from './excludeLocations';
import * as Utilities from '../../utilities';
import { startingAreas } from './entranceShuffle';
import { PERMALINK_SEPARATOR, SETTINGS_STRING_DELIMITER } from '../../../common/constants';
import { RandomStartingItems } from '../../../common/models/randomStartingItems';
import { ItemOverrides } from './itemOverrides';
import { ItemOverride } from '../../../common/models/itemOverride';
import { details } from '../../../common/data/settingsDetails';
import { RandomizerForm } from '../../../common/models/randomizerForm';
import { PrimeItem } from '../../enums/primeItem';

export interface PrimeRandomizerSettingsArgs extends RandomizerSettingsArgs {
  seed?: string;
  spoiler?: boolean;
  skipFrigate?: boolean;
  skipHudPopups?: boolean;
  hideItemModels?: boolean;
  enableMainPlazaLedgeDoor?: boolean;
  skipImpactCrater?: boolean;
  goal?: string;
  goalArtifacts?: number;
  artifactLocationHints?: boolean;
  heatProtection?: string;
  suitDamageReduction?: string;
  elevatorShuffle?: boolean;
  startingArea?: number;
  randomStartingItems?: RandomStartingItems;
  pointOfNoReturnItems?: string;
  junkItems?: string;
  shuffleMode?: string;
  itemOverrides?: ItemOverride[];
  excludeLocations?: SettingsFlagsArgs;
  tricks?: SettingsFlagsArgs;
}

export class PrimeRandomizerSettings extends RandomizerSettings {
  seed: string;
  spoiler: boolean = false;
  skipFrigate: boolean = true;
  skipHudPopups: boolean = true;
  hideItemModels: boolean = false;
  enableMainPlazaLedgeDoor = false;
  skipImpactCrater = false;
  goal: string = 'artifact-collection';
  goalArtifacts: number = 12;
  artifactLocationHints: boolean = true;
  heatProtection: string = 'any-suit';
  suitDamageReduction: string = 'default';
  elevatorShuffle: boolean = false;
  startingArea: number = 20;
  randomStartingItems: RandomStartingItems = {
    minimum: 0,
    maximum: 0
  };
  pointOfNoReturnItems: string = PointOfNoReturnItems.ALLOW_ALL;
  junkItems: string = PrimeItem.NOTHING;
  shuffleMode: string = 'full';
  itemOverrides: ItemOverrides = new ItemOverrides();
  excludeLocations: ExcludeLocations = new ExcludeLocations();
  tricks: Tricks = new Tricks();

  constructor(args?: PrimeRandomizerSettingsArgs) {
    super();

    // Overload if args are supplied
    if (args) {
      // Overload general settings
      Object.assign(this, args);

      // Overload locations and tricks
      this.itemOverrides = new ItemOverrides(args.itemOverrides);
      this.excludeLocations = new ExcludeLocations(args.excludeLocations);
      this.tricks = new Tricks(args.tricks);
    }
  }

  getNumericSeed(salt?: string): number {
    if (!this.seed) {
      throw new Error('Cannot get numeric seed. Settings seed is undefined or null (' + this.seed + ')');
    }

    let stringToBeHashed = this.toSettingsString() + this.seed;
    if (salt) {
      stringToBeHashed = stringToBeHashed.concat(crypto.createHash('sha256').update(salt).digest('hex'));
    }
    const sha256Hash = crypto.createHash('sha256').update(stringToBeHashed).digest('hex');

    return Utilities.parseSafeIntegerFromSha256(sha256Hash);
  }

  /**
   * Generates base36 representation of the settings.
   */
  toSettingsString(): string {
    let bits = '';
    const sharedSettings = settings.filter(setting => setting.shared);

    for (const setting of sharedSettings) {
      let settingValue = this[setting.name];
      bits += getBitstringFromOption(settingValue, setting);
    }

    return bigInt(bits, 2).toString(36).toUpperCase()
      + SETTINGS_STRING_DELIMITER
      + this.itemOverrides.toSettingsString()
      + SETTINGS_STRING_DELIMITER
      + this.excludeLocations.toSettingsString()
      + SETTINGS_STRING_DELIMITER
      + this.tricks.toSettingsString();
  }

  /**
   * Generates base64 permalink of the seed and settings string. Returns null if the seed is not defined.
   */
  toPermalink(): string {
    if (!this.seed) {
      return null;
    }

    return Buffer.from(this.seed + PERMALINK_SEPARATOR + this.toSettingsString()).toString('base64');
  }

  /**
   * Returns prettified version of this settings object, with more readable property keys.
   * @param excludedKeys Array of keys to filter out of the returned object
   */
  prettify(excludedKeys?: string[]) {
    const prettified = {};

    const filtered = Utilities.filterProperties(this, ['goalArtifacts', 'randomStartingItems', 'itemOverrides', 'excludeLocations', 'tricks', ...excludedKeys]);

    for (let key of Object.keys(filtered)) {
      // Try to get prettified setting name, if applicable
      const newKey = details[key] ? details[key].name : key;
      // Try to get prettified value, otherwise use current value
      prettified[newKey] = getSetting(key) ? getSetting(key).choices.find(choice => choice.value === filtered[key]).name : filtered[key];
    }

    // Add excluded tricks and tricks as arrays instead of objects
    Object.assign(prettified, {
      ['Number of Chozo Artifacts']: this.goalArtifacts,
      ['Random Starting Items']: {
        ['Minimum']: this.randomStartingItems.minimum,
        ['Maximum']: this.randomStartingItems.maximum
      },
      ['Item Overrides']: this.itemOverrides.prettify(),
      ['Exclude Locations']: this.excludeLocations.toArray(),
      ['Tricks']: this.tricks.toArray().map(item => details[item] ? details[item].name : item)
    });

    return Utilities.sortObjectByProperties(prettified);
  }

  toRandomizerForm(): RandomizerForm {
    return {
      romSettings: {
        skipFrigate: this.skipFrigate,
        skipHudPopups: this.skipHudPopups,
        hideItemModels: this.hideItemModels,
        enableMainPlazaLedgeDoor: this.enableMainPlazaLedgeDoor,
        skipImpactCrater: this.skipImpactCrater
      },
      rules: {
        goal: this.goal,
        goalArtifacts: this.goalArtifacts,
        artifactLocationHints: this.artifactLocationHints,
        elevatorShuffle: this.elevatorShuffle,
        heatProtection: this.heatProtection,
        suitDamageReduction: this.suitDamageReduction,
        startingArea: this.startingArea,
        randomStartingItems: this.randomStartingItems,
        pointOfNoReturnItems: this.pointOfNoReturnItems,
        junkItems: this.junkItems,
        shuffleMode: this.shuffleMode
      },
      itemOverrides: this.itemOverrides.toArray(),
      excludeLocations: this.excludeLocations.toArray(),
      tricks: this.tricks.toArray()
    };
  }

  static fromSettingsString(settingsString: string): PrimeRandomizerSettings {
    // Return null if settings string is empty
    if (!settingsString) {
      return null;
    }

    const settingsStringSections = settingsString.split(SETTINGS_STRING_DELIMITER);

    // Settings string must have 4 sections:
    // Settings, item overrides, excluded locations, allowed tricks
    if (settingsStringSections.length < 4) {
      throw new Error('Settings string is not a valid format. Expected 4 sections, got ' + settingsStringSections.length);
    }

    // Get general settings first
    const settings = new PrimeRandomizerSettings(getGeneralSettingsFromSettingsString(settingsStringSections[0]));
    // Next, get item overrides
    settings.itemOverrides = ItemOverrides.fromSettingsString(settingsStringSections[1]);
    // Next, get excluded locations
    settings.excludeLocations = ExcludeLocations.fromSettingsString(settingsStringSections[2]);
    // Last, get tricks
    settings.tricks = Tricks.fromSettingsString(settingsStringSections[3]);

    return settings;
  }
}

export function getSetting(name: string): Checkbox | SelectOption | NumberOption | ObjectOption {
  return settings.find(setting => setting.name === name);
}

function getGeneralSettingsFromSettingsString(settingsString): object {
  const newSettings = {};
  const bitString = Utilities.getPaddedBitStringFromSettingsString(settingsString, getTotalSharedSettingsBitWidth());

  let index = 0;
  for (const setting of settings.filter(setting => setting.shared)) {
    newSettings[setting.name] = parseOptionFromBitstring(bitString.substr(index, setting.bitWidth), setting);
    index += setting.bitWidth;
  }

  return newSettings;
}

function getBitstringFromOption(value: any, option: Checkbox | SelectOption | NumberOption | ObjectOption): string {
  switch (option.type) {
    case OptionType.BOOLEAN:
      return value ? '1' : '0';
    case OptionType.SELECT:
      const index = option.choices.map(choice => choice.value).indexOf(value);

      if (index < 0) {
        throw new Error('Cannot find index for setting ' + option.name + ' (value: ' + value + ')');
      }

      return Utilities.toPaddedBitString(index, option.bitWidth);
    case OptionType.NUMBER:
      return Utilities.toPaddedBitString(value, option.bitWidth);
    case OptionType.OBJECT:
      let bits = '';
      for (let [key, nestedOption] of Object.entries(option.options)) {
        bits += getBitstringFromOption(value[key], nestedOption);
      }
      return bits;
    default:
      return null;
  }
}

function parseOptionFromBitstring(bitString: string, option: Checkbox | SelectOption | NumberOption | ObjectOption): string | number | boolean | object {
  switch (option.type) {
    case OptionType.BOOLEAN:
      return parseInt(bitString, 2) === 1 ? true : false;
    case OptionType.SELECT:
      return option.choices[parseInt(bitString, 2)].value;
    case OptionType.NUMBER:
      return parseInt(bitString, 2);
    case OptionType.OBJECT:
      const obj = {};
      let offset = 0;

      for (let [key, nestedOption] of Object.entries(option.options)) {
        const subBits = bitString.substr(offset, nestedOption.bitWidth);
        obj[key] = parseOptionFromBitstring(subBits, nestedOption);
        offset += nestedOption.bitWidth;
      }

      return obj;
    default:
      return null;
  }
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
  new Checkbox({ name: 'enableMainPlazaLedgeDoor', shared: true, default: false }),
  new Checkbox({ name: 'skipImpactCrater', shared: true, default: false }),
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
  }),
  new SelectOption({
    name: 'startingArea',
    shared: true,
    choices: [
      ...startingAreas.map(area => {
        return { name: area.name, value: area.id }
      })
    ],
    default: 20
  }),
  new ObjectOption({
    name: 'randomStartingItems',
    shared: true,
    options: {
      minimum: new NumberOption({
        name: 'minimum',
        shared: false,
        minimum: 0,
        maximum: 25,
        default: 0
      }),
      maximum: new NumberOption({
        name: 'maximum',
        shared: false,
        minimum: 0,
        maximum: 25,
        default: 0
      })
    }
  }),
  new SelectOption({
    name: 'pointOfNoReturnItems',
    shared: true,
    choices: [
      {
        name: 'Allow All',
        value: PointOfNoReturnItems.ALLOW_ALL
      },
      {
        name: 'Allow Visible',
        value: PointOfNoReturnItems.ALLOW_VISIBLE
      },
      {
        name: 'Do Not Allow',
        value: PointOfNoReturnItems.DO_NOT_ALLOW
      }
    ],
    default: PointOfNoReturnItems.ALLOW_ALL
  }),
  new SelectOption({
    name: 'junkItems',
    shared: true,
    choices: [
      {
        name: '"Nothing" Item',
        value: PrimeItem.NOTHING
      },
      {
        name: 'Random Items',
        value: 'random-items'
      },
      {
        name: PrimeItem.ENERGY_TANK,
        value: PrimeItem.ENERGY_TANK
      },
      {
        name: PrimeItem.MISSILE_EXPANSION,
        value: PrimeItem.MISSILE_EXPANSION
      },
      {
        name: PrimeItem.POWER_BOMB_EXPANSION,
        value: PrimeItem.POWER_BOMB_EXPANSION
      },
      {
        name: PrimeItem.WAVEBUSTER,
        value: PrimeItem.WAVEBUSTER
      },
      {
        name: PrimeItem.ICE_SPREADER,
        value: PrimeItem.ICE_SPREADER
      },
      {
        name: PrimeItem.FLAMETHROWER,
        value: PrimeItem.FLAMETHROWER
      }
    ],
    default: PrimeItem.NOTHING
  }),
  new SelectOption({
    name: 'shuffleMode',
    shared: true,
    choices: [
      {
        name: 'Full',
        value: 'full'
      },
      {
        name: 'Major/Minor Split',
        value: 'major-minor'
      }
    ],
    default: 'full'
  }),
  new SelectOption({
    name: 'itemOverride',
    shared: false,
    choices: ItemOverrides.getStates(),
    default: 'shuffled'
  }),
  new SelectOption({
    name: 'outputType',
    shared: false,
    choices: [
      {
        name: 'Plain ISO (.iso)',
        value: 'iso'
      },
      {
        name: 'Compressed ISO (.ciso)',
        value: 'ciso'
      },
      {
        name: 'Gamecube Zip (.gcz)',
        value: 'gcz'
      }
    ],
    default: 'iso'
  })
];

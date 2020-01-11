import * as bigInt from 'big-integer';
import * as crypto from 'crypto';

import { RandomizerSettings, RandomizerSettingsArgs } from '../randomizerSettings';
import { Checkbox, SelectOption, SettingsChoice, discreteNumberSelection } from '../option';
import { OptionType } from '../../enums/optionType';
import { PrimeLocation } from '../../enums/primeLocation';
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
  disabledLocations?: DisabledLocations;
  allowedTricks?: AllowedTricks;
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

    return bigInt(bits, 2).toString(36) + SETTINGS_STRING_DELIMITER + bigInt(allowedBits, 2).toString(36).toUpperCase();
  }

  protected assignDefaultSettings(args: RandomizerSettingsArgs): void {
    // Get only settings metadata for arguments that weren't provided
    const argKeys = Object.keys(args);
    const defaultSettings = settings.filter(setting => !argKeys.includes(setting.name));

    // Assign default value to missing fields
    for (let setting of defaultSettings) {
      this[setting.name] = setting.default;
    }

    // Handle allowed tricks, disabled locations objects
    if (!argKeys.includes('allowedTricks'))
      this.allowedTricks = {
        alcoveNoItems: false,
        arborChamberWithoutPlasma: false,
        boostThroughBombTunnels: false,
        climbTowerOfLightNoMissiles: false,
        crossTwinFiresTunnelWithoutSpider: false,
        eliteResearchBoostClip: false,
        fieryShoresAccessWithoutMorphGrapple: false,
        furnaceAccessWithoutSpider: false,
        gravityChamberGrappleLedgeRJump: false,
        magmaPoolDash: false,
        mainPlazaItemsOnlySpaceJump: false,
        mainQuarryItemWithoutSpider: false,
        minesSpiderlessShafts: false,
        phendranaDepthsGrappleSkips: false,
        phendranaDepthsAccessWithoutSpider: false,
        plasmaProcessingWithoutGrappleSpider: false,
        removeThermalReqs: false,
        removeXrayReqs: false,
        ruinedFountainFlaahgraSkip: false,
        quarantineMonitorDash: false,
        towerChamberNoGravity: false,
        upperRuinedShrineTowerOfLightFewerAccessReqs: false,
        warriorShrineWithoutBoost: false,
        wateryHallUnderwaterFlaahgraSkip: false
      };

    if (!argKeys.includes('disabledLocations'))
      this.disabledLocations = {};
  }

  static fromSettingsString(settingsString: string): PrimeRandomizerSettings {
    // Return null if settings string is empty
    if (!settingsString) {
      return null;
    }

    const settingsStringSections = settingsString.split(SETTINGS_STRING_DELIMITER);

    // Get general settings first
    const newSettings = getGeneralSettingsFromSettingsString(settingsStringSections[0]);

    // Get allowed tricks if they are provided
    if (settingsStringSections.length >= 2) {
      newSettings['allowedTricks'] = getAllowedTricksFromSettingString(settingsStringSections[1]);
    }

    return new PrimeRandomizerSettings(newSettings);
  }
}

export function getSetting(name: string): Checkbox | SelectOption {
  return settings.find(setting => setting.name === name);
}

function getGeneralSettingsFromSettingsString(settingsString): object {
  const newSettings = {};
  const bitString = getPaddedBitStringFromSettingsString(settingsString, getTotalSharedSettingsBitWidth());

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
  const bitString = getPaddedBitStringFromSettingsString(settingsString, allowedTrickKeys.length);

  let index = 0;
  for (const trickKey of allowedTrickKeys) {
    const currentBit = bitString.substr(index, 1);
    newAllowedTricks[trickKey] = currentBit === '1' ? true : false;
    index += 1;
  }
  return newAllowedTricks as AllowedTricks;
}

function getTotalSharedSettingsBitWidth(): number {
  let totalBitWidth = 0;

  for (const bitWidth of settings.filter(setting => setting.shared).map(setting => setting.bitWidth)) {
    totalBitWidth += bitWidth;
  }

  return totalBitWidth;
}

function getPaddedBitStringFromSettingsString(settingsString: string, length: number) {
  const settingsBits = bigInt(settingsString, 36).toString(2);
  return '0'.repeat(length - settingsBits.length) + settingsBits;
}

/**
 * Array of randomizer/patcher settings including their default values
 */
export const settings = [
  new Checkbox({ name: 'spoiler', displayName: 'Create Spoiler', shared: true, default: true }),
  new Checkbox({ name: 'skipFrigate', displayName: 'Skip the Space Pirate Frigate', shared: true, default: true }),
  new Checkbox({ name: 'skipHudPopups', displayName: 'Skip Item Acquisition Popups', shared: true, default: true }),
  new Checkbox({ name: 'hideItemModels', displayName: 'Hide Item Models', shared: true, default: false }),
  new SelectOption({
    name: 'goal',
    displayName: 'Goal',
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
    displayName: 'Number of Chozo Artifacts',
    shared: true,
    choices: discreteNumberSelection(1, 12),
    default: 12
  }),
  new Checkbox({ name: 'artifactLocationHints', displayName: 'Show Chozo Artifact location hints in Artifact Temple', shared: true, default: true }),
  new SelectOption({
    name: 'heatProtection',
    displayName: 'Heat Protection',
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
    displayName: 'Suit Damage Reduction',
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

interface AllowedTricks {
  alcoveNoItems: boolean,
  arborChamberWithoutPlasma: boolean;
  boostThroughBombTunnels: boolean;
  climbTowerOfLightNoMissiles: boolean;
  crossTwinFiresTunnelWithoutSpider: boolean;
  eliteResearchBoostClip: boolean;
  fieryShoresAccessWithoutMorphGrapple: boolean;
  furnaceAccessWithoutSpider: boolean;
  gravityChamberGrappleLedgeRJump: boolean;
  magmaPoolDash: boolean;
  mainPlazaItemsOnlySpaceJump: boolean;
  mainQuarryItemWithoutSpider: boolean;
  minesSpiderlessShafts: boolean;
  phendranaDepthsGrappleSkips: boolean;
  phendranaDepthsAccessWithoutSpider: boolean;
  plasmaProcessingWithoutGrappleSpider: boolean;
  removeThermalReqs: boolean;
  removeXrayReqs: boolean;
  ruinedFountainFlaahgraSkip: boolean;
  quarantineMonitorDash: boolean;
  towerChamberNoGravity: boolean;
  upperRuinedShrineTowerOfLightFewerAccessReqs: boolean;
  warriorShrineWithoutBoost: boolean;
  wateryHallUnderwaterFlaahgraSkip: boolean;
};

interface DisabledLocations {
  [PrimeLocation.LANDING_SITE]?: boolean;
  [PrimeLocation.ALCOVE]?: boolean;
  [PrimeLocation.FRIGATE_CRASH_SITE]?: boolean;
  [PrimeLocation.OVERGROWN_CAVERN]?: boolean;
  [PrimeLocation.ROOT_CAVE]?: boolean;
  [PrimeLocation.ARTIFACT_TEMPLE]?: boolean;
  [PrimeLocation.TRANSPORT_TUNNEL_B]?: boolean;
  [PrimeLocation.ARBOR_CHAMBER]?: boolean;
  [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]?: boolean;
  [PrimeLocation.BIOHAZARD_CONTAINMENT]?: boolean;
  [PrimeLocation.HYDRO_ACCESS_TUNNEL]?: boolean;
  [PrimeLocation.GREAT_TREE_CHAMBER]?: boolean;
  [PrimeLocation.LIFE_GROVE_TUNNEL]?: boolean;
  [PrimeLocation.LIFE_GROVE_START]?: boolean;
  [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]?: boolean;
  [PrimeLocation.MAIN_PLAZA_HALF_PIPE]?: boolean;
  [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]?: boolean;
  [PrimeLocation.MAIN_PLAZA_TREE]?: boolean;
  [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]?: boolean;
  [PrimeLocation.RUINED_FOUNTAIN]?: boolean;
  [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]?: boolean;
  [PrimeLocation.RUINED_SHRINE_HALF_PIPE]?: boolean;
  [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]?: boolean;
  [PrimeLocation.VAULT]?: boolean;
  [PrimeLocation.TRAINING_CHAMBER]?: boolean;
  [PrimeLocation.RUINED_NURSERY]?: boolean;
  [PrimeLocation.TRAINING_CHAMBER_ACCESS]?: boolean;
  [PrimeLocation.MAGMA_POOL]?: boolean;
  [PrimeLocation.TOWER_OF_LIGHT]?: boolean;
  [PrimeLocation.TOWER_CHAMBER]?: boolean;
  [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]?: boolean;
  [PrimeLocation.RUINED_GALLERY_TUNNEL]?: boolean;
  [PrimeLocation.TRANSPORT_ACCESS_NORTH]?: boolean;
  [PrimeLocation.GATHERING_HALL]?: boolean;
  [PrimeLocation.HIVE_TOTEM]?: boolean;
  [PrimeLocation.SUNCHAMBER_FLAAHGRA]?: boolean;
  [PrimeLocation.SUNCHAMBER_GHOSTS]?: boolean;
  [PrimeLocation.WATERY_HALL_ACCESS]?: boolean;
  [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]?: boolean;
  [PrimeLocation.WATERY_HALL_UNDERWATER]?: boolean;
  [PrimeLocation.DYNAMO_LOWER]?: boolean;
  [PrimeLocation.DYNAMO_SPIDER_TRACK]?: boolean;
  [PrimeLocation.BURN_DOME_TUNNEL]?: boolean;
  [PrimeLocation.BURN_DOME_I_DRONE]?: boolean;
  [PrimeLocation.FURNACE_SPIDER_TRACKS]?: boolean;
  [PrimeLocation.FURNACE_TUNNEL]?: boolean;
  [PrimeLocation.HALL_OF_THE_ELDERS]?: boolean;
  [PrimeLocation.CROSSWAY]?: boolean;
  [PrimeLocation.ELDER_CHAMBER]?: boolean;
  [PrimeLocation.ANTECHAMBER]?: boolean;
  [PrimeLocation.LAVA_LAKE]?: boolean;
  [PrimeLocation.TRICLOPS_PIT]?: boolean;
  [PrimeLocation.STORAGE_CAVERN]?: boolean;
  [PrimeLocation.TRANSPORT_TUNNEL_A]?: boolean;
  [PrimeLocation.WARRIOR_SHRINE]?: boolean;
  [PrimeLocation.SHORE_TUNNEL]?: boolean;
  [PrimeLocation.FIERY_SHORES_MORPH_TRACK]?: boolean;
  [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]?: boolean;
  [PrimeLocation.PLASMA_PROCESSING]?: boolean;
  [PrimeLocation.MAGMOOR_WORKSTATION]?: boolean;
  [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE]?: boolean;
  [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK]?: boolean;
  [PrimeLocation.CHOZO_ICE_TEMPLE]?: boolean;
  [PrimeLocation.ICE_RUINS_WEST]?: boolean;
  [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]?: boolean;
  [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]?: boolean;
  [PrimeLocation.CHAPEL_OF_THE_ELDERS]?: boolean;
  [PrimeLocation.RUINED_COURTYARD]?: boolean;
  [PrimeLocation.PHENDRANA_CANYON]?: boolean;
  [PrimeLocation.QUARANTINE_CAVE]?: boolean;
  [PrimeLocation.RESEARCH_LAB_HYDRA]?: boolean;
  [PrimeLocation.QUARANTINE_MONITOR]?: boolean;
  [PrimeLocation.OBSERVATORY]?: boolean;
  [PrimeLocation.TRANSPORT_ACCESS]?: boolean;
  [PrimeLocation.CONTROL_TOWER]?: boolean;
  [PrimeLocation.RESEARCH_CORE]?: boolean;
  [PrimeLocation.FROST_CAVE]?: boolean;
  [PrimeLocation.RESEARCH_LAB_AETHER_TANK]?: boolean;
  [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]?: boolean;
  [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]?: boolean;
  [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]?: boolean;
  [PrimeLocation.STORAGE_CAVE]?: boolean;
  [PrimeLocation.SECURITY_CAVE]?: boolean;
  [PrimeLocation.MAIN_QUARRY]?: boolean;
  [PrimeLocation.SECURITY_ACCESS_A]?: boolean;
  [PrimeLocation.STORAGE_DEPOT_B]?: boolean;
  [PrimeLocation.STORAGE_DEPOT_A]?: boolean;
  [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]?: boolean;
  [PrimeLocation.ELITE_RESEARCH_LASER]?: boolean;
  [PrimeLocation.ELITE_CONTROL_ACCESS]?: boolean;
  [PrimeLocation.VENTILATION_SHAFT]?: boolean;
  [PrimeLocation.PHAZON_PROCESSING_CENTER]?: boolean;
  [PrimeLocation.PROCESSING_CENTER_ACCESS]?: boolean;
  [PrimeLocation.ELITE_QUARTERS]?: boolean;
  [PrimeLocation.CENTRAL_DYNAMO]?: boolean;
  [PrimeLocation.METROID_QUARANTINE_B]?: boolean;
  [PrimeLocation.METROID_QUARANTINE_A]?: boolean;
  [PrimeLocation.FUNGAL_HALL_B]?: boolean;
  [PrimeLocation.PHAZON_MINING_TUNNEL]?: boolean;
  [PrimeLocation.FUNGAL_HALL_ACCESS]?: boolean;
};

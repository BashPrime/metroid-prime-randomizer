import { RandomizerSettings, RandomizerSettingsArgs, arrayRangeToObject } from '../randomizerSettings';
import { Checkbox, SelectOption } from '../option';
import { PrimeLocation } from '../../enums/primeLocation';

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
  disabledLocations?: DisabledLocationsMap;
  allowedTricks?: AllowedTricksMap;
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
  disabledLocations: DisabledLocationsMap;
  allowedTricks: AllowedTricksMap;

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

    // Handle allowed tricks, disabled locations objects
    if (!argKeys.includes('allowedTricks'))
      this.allowedTricks = {};

    if (!argKeys.includes('disabledLocations'))
      this.disabledLocations = {};
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
  alcoveNoItems: {
    name: 'Alcove with No Additional Items',
    tooltip: `
      It's possible to reach the Alcove without any items by performing a dash jump from Samus's ship to the upper ledge.
      This can be done with a scan dash off the Red Starburst (1.00 only), or by locking onto a Seedling in Temple Hall.
    `
  },
  boostThroughBombTunnels: {
    name: 'Traverse Morph Ball Bomb tunnels with Boost Ball',
    tooltip: `
      In morph tunnels that normally require single bomb jumps to traverse or access them, a properly-timed boost can be used instead.

      This trick is difficult and not recommended for beginners.
    `
  },
  climbTowerOfLightNoMissiles: {
    name: 'Climb Tower of Light without Missiles',
    tooltip: `
      Tower of Light can be climbed by dashing to the outside edges, skipping the 40 missile requirement.
    `
  },
  crossTwinFiresTunnelWithoutSpider: {
    name: 'Cross Twin Fires Tunnel without Spider Ball',
    tooltip: `
      Twin Fires Tunnel can be crossed with an R jump, or a scan dash off the spider track from the wall.
    `
  },
  mainPlazaItemsOnlySpaceJump: {
    name: 'Main Plaza Items with only Space Jump',
    tooltip: `
      The Grapple Ledge, Locked Door, and Half Pipe items can be reached with only Space Jump equipped.
    `
  },
  towerChamberNoGravity: {
    name: 'Tower Chamber without Gravity Suit',
    tooltip: `
      Can be reached by slope jumping underwater to the door.
    `
  },
  upperRuinedShrineTowerOfLightFewerAccessReqs: {
    name: 'Upper Ruined Shrine & Tower of Light - Fewer Access Requirements',
    tooltip: `
      Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).
    `
  },
  warriorShrineWithoutBoost: {
    name: 'Warrior Shrine without Boost Ball',
    tooltip: `

      Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).
    `
  }
};

interface AllowedTricksMap {
  alcoveNoItems?: boolean;
  arborChamberWithoutPlasma?: boolean;
  boostThroughBombTunnels?: boolean;
  climbTowerOfLightNoMissiles?: boolean;
  crossTwinFiresTunnelWithoutSpider?: boolean;
  eliteResearchBoostClip?: boolean;
  fieryShoresAccessWithoutMorphGrapple?: boolean;
  furnaceAccessWithoutSpider?: boolean;
  gravityChamberGrappleLedgeRJump?: boolean;
  magmaPoolDash?: boolean;
  mainPlazaItemsOnlySpaceJump?: boolean;
  mainQuarryItemWithoutSpider?: boolean;
  minesSpiderlessShafts?: boolean;
  phendranaDepthsGrappleSkips?: boolean;
  phendranaDepthsAccessWithoutSpider?: boolean;
  plasmaProcessingWithoutGrappleSpider?: boolean;
  removeThermalReqs?: boolean;
  removeXrayReqs?: boolean;
  ruinedFountainFlaahgraSkip?: boolean;
  quarantineMonitorDash?: boolean;
  towerChamberNoGravity?: boolean;
  upperRuinedShrineTowerOfLightFewerAccessReqs?: boolean;
  warriorShrineWithoutBoost?: boolean;
  wateryHallUnderwaterFlaahgraSkip?: boolean;
};

interface DisabledLocationsMap {
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

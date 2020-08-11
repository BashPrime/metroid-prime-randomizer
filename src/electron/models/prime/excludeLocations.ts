import { PrimeLocation } from '../../enums/primeLocation';
import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class ExcludeLocations extends SettingsFlags {
  [PrimeLocation.LANDING_SITE] = false;
  [PrimeLocation.ALCOVE] = false;
  [PrimeLocation.FRIGATE_CRASH_SITE] = false;
  [PrimeLocation.OVERGROWN_CAVERN] = false;
  [PrimeLocation.ROOT_CAVE] = false;
  [PrimeLocation.ARTIFACT_TEMPLE] = false;
  [PrimeLocation.TRANSPORT_TUNNEL_B] = false;
  [PrimeLocation.ARBOR_CHAMBER] = false;
  [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA] = false;
  [PrimeLocation.BIOHAZARD_CONTAINMENT] = false;
  [PrimeLocation.HYDRO_ACCESS_TUNNEL] = false;
  [PrimeLocation.GREAT_TREE_CHAMBER] = false;
  [PrimeLocation.LIFE_GROVE_TUNNEL] = false;
  [PrimeLocation.LIFE_GROVE_START] = false;
  [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER] = false;
  [PrimeLocation.MAIN_PLAZA_HALF_PIPE] = false;
  [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE] = false;
  [PrimeLocation.MAIN_PLAZA_TREE] = false;
  [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR] = false;
  [PrimeLocation.RUINED_FOUNTAIN] = false;
  [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE] = false;
  [PrimeLocation.RUINED_SHRINE_HALF_PIPE] = false;
  [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL] = false;
  [PrimeLocation.VAULT] = false;
  [PrimeLocation.TRAINING_CHAMBER] = false;
  [PrimeLocation.RUINED_NURSERY] = false;
  [PrimeLocation.TRAINING_CHAMBER_ACCESS] = false;
  [PrimeLocation.MAGMA_POOL] = false;
  [PrimeLocation.TOWER_OF_LIGHT] = false;
  [PrimeLocation.TOWER_CHAMBER] = false;
  [PrimeLocation.RUINED_GALLERY_MISSILE_WALL] = false;
  [PrimeLocation.RUINED_GALLERY_TUNNEL] = false;
  [PrimeLocation.TRANSPORT_ACCESS_NORTH] = false;
  [PrimeLocation.GATHERING_HALL] = false;
  [PrimeLocation.HIVE_TOTEM] = false;
  [PrimeLocation.SUNCHAMBER_FLAAHGRA] = false;
  [PrimeLocation.SUNCHAMBER_GHOSTS] = false;
  [PrimeLocation.WATERY_HALL_ACCESS] = false;
  [PrimeLocation.WATERY_HALL_SCAN_PUZZLE] = false;
  [PrimeLocation.WATERY_HALL_UNDERWATER] = false;
  [PrimeLocation.DYNAMO_LOWER] = false;
  [PrimeLocation.DYNAMO_SPIDER_TRACK] = false;
  [PrimeLocation.BURN_DOME_TUNNEL] = false;
  [PrimeLocation.BURN_DOME_I_DRONE] = false;
  [PrimeLocation.FURNACE_SPIDER_TRACKS] = false;
  [PrimeLocation.FURNACE_TUNNEL] = false;
  [PrimeLocation.HALL_OF_THE_ELDERS] = false;
  [PrimeLocation.CROSSWAY] = false;
  [PrimeLocation.ELDER_CHAMBER] = false;
  [PrimeLocation.ANTECHAMBER] = false;
  [PrimeLocation.LAVA_LAKE] = false;
  [PrimeLocation.TRICLOPS_PIT] = false;
  [PrimeLocation.STORAGE_CAVERN] = false;
  [PrimeLocation.TRANSPORT_TUNNEL_A] = false;
  [PrimeLocation.WARRIOR_SHRINE] = false;
  [PrimeLocation.SHORE_TUNNEL] = false;
  [PrimeLocation.FIERY_SHORES_MORPH_TRACK] = false;
  [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL] = false;
  [PrimeLocation.PLASMA_PROCESSING] = false;
  [PrimeLocation.MAGMOOR_WORKSTATION] = false;
  [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE] = false;
  [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK] = false;
  [PrimeLocation.CHOZO_ICE_TEMPLE] = false;
  [PrimeLocation.ICE_RUINS_WEST] = false;
  [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE] = false;
  [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK] = false;
  [PrimeLocation.CHAPEL_OF_THE_ELDERS] = false;
  [PrimeLocation.RUINED_COURTYARD] = false;
  [PrimeLocation.PHENDRANA_CANYON] = false;
  [PrimeLocation.QUARANTINE_CAVE] = false;
  [PrimeLocation.RESEARCH_LAB_HYDRA] = false;
  [PrimeLocation.QUARANTINE_MONITOR] = false;
  [PrimeLocation.OBSERVATORY] = false;
  [PrimeLocation.TRANSPORT_ACCESS] = false;
  [PrimeLocation.CONTROL_TOWER] = false;
  [PrimeLocation.RESEARCH_CORE] = false;
  [PrimeLocation.FROST_CAVE] = false;
  [PrimeLocation.RESEARCH_LAB_AETHER_TANK] = false;
  [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK] = false;
  [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER] = false;
  [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE] = false;
  [PrimeLocation.STORAGE_CAVE] = false;
  [PrimeLocation.SECURITY_CAVE] = false;
  [PrimeLocation.MAIN_QUARRY] = false;
  [PrimeLocation.SECURITY_ACCESS_A] = false;
  [PrimeLocation.STORAGE_DEPOT_B] = false;
  [PrimeLocation.STORAGE_DEPOT_A] = false;
  [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE] = false;
  [PrimeLocation.ELITE_RESEARCH_LASER] = false;
  [PrimeLocation.ELITE_CONTROL_ACCESS] = false;
  [PrimeLocation.VENTILATION_SHAFT] = false;
  [PrimeLocation.PHAZON_PROCESSING_CENTER] = false;
  [PrimeLocation.PROCESSING_CENTER_ACCESS] = false;
  [PrimeLocation.ELITE_QUARTERS] = false;
  [PrimeLocation.CENTRAL_DYNAMO] = false;
  [PrimeLocation.METROID_QUARANTINE_B] = false;
  [PrimeLocation.METROID_QUARANTINE_A] = false;
  [PrimeLocation.FUNGAL_HALL_B] = false;
  [PrimeLocation.PHAZON_MINING_TUNNEL] = false;
  [PrimeLocation.FUNGAL_HALL_ACCESS] = false;

  constructor(args?: SettingsFlagsArgs) {
    super();

    if (args) {
      this.setSettings(args);
    }
  }

  setSettings(args: SettingsFlagsArgs): void {
    const allowedKeys = this.getSettingsKeys();

    // To prevent outdated settings flags from being assigned, filter them
    const filteredArgs = Object.keys(args)
      .filter(key => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = args[key];
        return obj;
      }, {});

    Object.assign(this, filteredArgs);
  }

  static fromSettingsString(settingsString: string): ExcludeLocations {
    const settings: SettingsFlagsArgs = {};
    const keys = new ExcludeLocations().getSettingsKeys();
    const bitString = getPaddedBitStringFromSettingsString(settingsString, keys.length);

    let index = 0;
    for (const key of keys) {
      const currentBit = bitString.substr(index, 1);
      settings[key] = currentBit === '1' ? true : false;
      index += 1;
    }

    return new ExcludeLocations(settings);
  }
}



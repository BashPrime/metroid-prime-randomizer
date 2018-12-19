import { World } from './World';
import { Item } from './Item';
import { Location } from './Location';
import { MersenneTwister } from './MersenneTwister';
import { Filler } from './Filler';
import { RandomAssumed } from './filler/RandomAssumed';
import { RandomizerMode } from './enums/RandomizerMode';
import { RandomizerLogic } from './enums/RandomizerLogic';
import { PrimeItem } from './enums/PrimeItem';
import { PrimeLocation } from './enums/PrimeLocation';
import { RandomizerArtifacts } from './enums/RandomizerArtifacts';
import { Utilities } from '../Utilities';
import * as crypto from 'crypto-js';
import { LocationCollection } from './collection/LocationCollection';
import { ItemCollection } from './collection/ItemCollection';
import { Goal } from './enums/goal';

export class Randomizer {
  private config: any;
  private seed: number;
  protected world: World;
  protected rng: MersenneTwister;
  private itemPool: Map<string, number>;

  constructor(config: any) {
    this.config = config;
  }

  randomize(): void {
    let randomizerSuccess = false;

    // If the randomizer errors out, try again by hashing the existing seed
    while (!randomizerSuccess) {
      /*
      * The seed number provided by the client isn't directly used to initialize the random number generator.
      * Instead, we use the sha256 hash of the seed number, with the custom 32-bit settings string appended to it.
      *
      * There's a problem though. JavaScript always uses double-precision floating-pont formatted numbers, which means
      * it can only use 52 bits to safely store integer values. sha256 hashes, are, you guessed it, 256 bits long,
      * so instead I'm only using the first 52 bits of the hash when we parse the hash as an integer.
      *
      * For reference, Number.MAX_SAFE_INTEGER as a hex string is '1fffffffffffff' (14 characters long)
      */
      const valueToHash = this.seed ? this.seed.toString(16) : (this.config.seed.toString() + this.config.settingsString);
      this.seed = this.getSafeSha256Integer(valueToHash);

      randomizerSuccess = this.fillItems();
    }
  }

  private fillItems(): boolean {
    const settings = this.config;
    this.world = new World(this.config);
    this.rng = new MersenneTwister(this.seed);
    this.itemPool = this.getInitialItemPool(settings);
    const itemFiller = new RandomAssumed(this.world, this.rng);

    try {
      // If the goal is All Bosses, fill the boss rooms with artifacts.
      if (settings.goal === Goal.ALL_BOSSES) {
        this.fillBossRoomsWithArtifacts();
      }

      // Fill items that are not being shuffled in the seed.
      this.fillUnshuffledItems(settings);

      // Fill any rooms that are completely restricted to logic and artifacts with expansions
      this.fillRestrictedRooms(settings);

      // Prefill a random number of Chozo Ruins locations with junk to reduce item bias
      this.fillChozoWithJunk();

      // Place Phazon Suit in a "lategame"/high item tier location, if setting is checked
      this.placeNoEarlyPhazonSuit(itemFiller, settings);

      /*
      * Place all progression items. This includes the following cases:
      * If any suitless Magmoor trick is checked, energy tanks are added to this pool.
      * If dashing and standable collision tricks are checked to skip Tower of Light missiles, only missile launcher is added to the pool.
      * If either of the above options are unchecked, 7 missile expansions are also added to the pool.
      * Items are checked for reachability and will always be placed to ensure the game can be beaten.
      */
      this.fillProgressiveItems(itemFiller, settings);

      /*
      * Fast fill the rest of the items.
      *
      * This item pool contains items that don't affect progression in any way,
      * including shuffled Chozo Artifacts, and the remaining Energy Tanks/Missile Expansions (if any).
      *
      * Because the progression items are already set in the game world at this point,
      * these items have no restrictions on placement.
      */
      this.fillJunkItems(itemFiller, settings);

      return true;
    } catch (err) {
      return false;
    }
  }

  private getSafeSha256Integer(str: string): number {
    const safeHexChars = Number.MAX_SAFE_INTEGER.toString(16).length;
    const strHash = crypto.SHA256(str).toString();

    /*
    * Parse the first 14 characters of the hash. If the resulting number is a safe integer, return it.
    * Otherwise, parse the first 13 characters of a hash and return the resulting number, which is
    * guaranteed to be a safe integer.
    *
    * For reference, Number.MAX_SAFE_INTEGER's hex equivalent is '1fffffffffffff' (length 14 characters)
    */
    let parsedHash = parseInt(strHash.substr(0, safeHexChars), 16);

    if (Number.isSafeInteger(parsedHash)) {
      return parsedHash;
    }

    return parseInt(strHash.substr(0, safeHexChars - 1), 16);
  }

  private getInitialItemPool(settings: any): Map<string, number> {
    const numberOfArtifacts = settings.goal === Goal.ALL_BOSSES ? 3 : settings.goalArtifacts;
    const emptyArtifactSlots = 12 - numberOfArtifacts;

    const itemPool = new Map<string, number>();
    itemPool.set(PrimeItem.MISSILE_LAUNCHER, 1);
    itemPool.set(PrimeItem.MORPH_BALL, 1);
    itemPool.set(PrimeItem.MORPH_BALL_BOMB, 1);
    itemPool.set(PrimeItem.VARIA_SUIT, 1);
    itemPool.set(PrimeItem.GRAVITY_SUIT, 1);
    itemPool.set(PrimeItem.PHAZON_SUIT, 1);
    itemPool.set(PrimeItem.SPACE_JUMP_BOOTS, 1);
    itemPool.set(PrimeItem.WAVE_BEAM, 1);
    itemPool.set(PrimeItem.ICE_BEAM, 1);
    itemPool.set(PrimeItem.PLASMA_BEAM, 1);
    itemPool.set(PrimeItem.CHARGE_BEAM, 1);
    itemPool.set(PrimeItem.POWER_BOMB, 1);
    itemPool.set(PrimeItem.THERMAL_VISOR, 1);
    itemPool.set(PrimeItem.XRAY_VISOR, 1);
    itemPool.set(PrimeItem.BOOST_BALL, 1);
    itemPool.set(PrimeItem.SPIDER_BALL, 1);
    itemPool.set(PrimeItem.GRAPPLE_BEAM, 1);
    itemPool.set(PrimeItem.SUPER_MISSILE, 1);
    itemPool.set(PrimeItem.WAVEBUSTER, 1);
    itemPool.set(PrimeItem.ICE_SPREADER, 1);
    itemPool.set(PrimeItem.FLAMETHROWER, 1);

    // Add more missile expansions the less artifacts that are in the seed
    itemPool.set(PrimeItem.MISSILE_EXPANSION, 49 + emptyArtifactSlots);

    itemPool.set(PrimeItem.ENERGY_TANK, 14);
    itemPool.set(PrimeItem.POWER_BOMB_EXPANSION, 4);

    // Initially set artifacts pool, all set to 0
    itemPool.set(PrimeItem.ARTIFACT_OF_TRUTH, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_STRENGTH, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_ELDER, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_WILD, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_WARRIOR, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_CHOZO, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_NATURE,0);
    itemPool.set(PrimeItem.ARTIFACT_OF_SUN, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_WORLD, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_SPIRIT, 0);
    itemPool.set(PrimeItem.ARTIFACT_OF_NEWBORN, 0);

    // If the goal isn't All Bosses, 
    if (settings.goal !== Goal.ALL_BOSSES) {
      let artifacts: string[];

      if (settings.goalArtifacts === 12) {
        artifacts = this.getArtifactsAsCollection().toArray().map(artifact => artifact.getName());
      } else {
        artifacts = this.getArtifactsAsCollection().randomArray(settings.goalArtifacts, this.rng).map(artifact => artifact.getName());
      }

      for (const artifact of artifacts) {
        itemPool.set(artifact, 1);
      }
    }

    return itemPool;
  }

  getWorld(): World {
    return this.world;
  }

  getSeed(): number {
    return this.seed;
  }

  private createItemsFromMap(itemsMap: Map<string, number>): Item[] {
    const items: Item[] = [];
    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  private fillChozoWithJunk(): void {
    // Fill up to 3/4 of available Chozo Ruins locations with junk items to reduce bias
    const chozoRuinsLocations = this.world.getRegion('Chozo Ruins').getLocationsArray().filter(location => {
      // Hive Totem needs to be open for most logics so don't include it in locations list
      return location.getName() !== PrimeLocation.HIVE_TOTEM && !location.hasItem();
    });
    const maxJunkRooms = Math.floor(chozoRuinsLocations.length * 0.75);
    const junkChozoLocations = new LocationCollection(chozoRuinsLocations).randomArray(Utilities.getRandomInt(0, maxJunkRooms, this.rng), this.rng) as Location[];

    for (const location of junkChozoLocations) {
      location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
    }

    this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - junkChozoLocations.length);
  }

  private fillProgressiveItems(itemFiller: RandomAssumed, settings: any): void {
    const itemsMap: Map<string, number> = new Map<string, number>();
    itemsMap.set(PrimeItem.MISSILE_LAUNCHER, this.itemPool.get(PrimeItem.MISSILE_LAUNCHER));
    /*
    * If dashing or standable terrain are unchecked,
    * add 35 more missiles to the item pool.
    *
    * This is to ensure Tower of Light can be in logic with 40 missiles.
    */
    if (!(settings.dashing && settings.standableTerrain)) {
      itemsMap.set(PrimeItem.MISSILE_EXPANSION, 7);
      this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 7);
    }
    itemsMap.set(PrimeItem.MORPH_BALL, this.itemPool.get(PrimeItem.MORPH_BALL));
    itemsMap.set(PrimeItem.MORPH_BALL_BOMB, this.itemPool.get(PrimeItem.MORPH_BALL_BOMB));
    itemsMap.set(PrimeItem.VARIA_SUIT, this.itemPool.get(PrimeItem.VARIA_SUIT));
    itemsMap.set(PrimeItem.GRAVITY_SUIT, this.itemPool.get(PrimeItem.GRAVITY_SUIT));
    itemsMap.set(PrimeItem.PHAZON_SUIT, this.itemPool.get(PrimeItem.PHAZON_SUIT));
    itemsMap.set(PrimeItem.SPACE_JUMP_BOOTS, this.itemPool.get(PrimeItem.SPACE_JUMP_BOOTS));
    itemsMap.set(PrimeItem.WAVE_BEAM, this.itemPool.get(PrimeItem.WAVE_BEAM));
    itemsMap.set(PrimeItem.ICE_BEAM, this.itemPool.get(PrimeItem.ICE_BEAM));
    itemsMap.set(PrimeItem.PLASMA_BEAM, this.itemPool.get(PrimeItem.PLASMA_BEAM));
    itemsMap.set(PrimeItem.CHARGE_BEAM, this.itemPool.get(PrimeItem.CHARGE_BEAM));
    itemsMap.set(PrimeItem.POWER_BOMB, this.itemPool.get(PrimeItem.POWER_BOMB));
    itemsMap.set(PrimeItem.POWER_BOMB_EXPANSION, this.itemPool.get(PrimeItem.POWER_BOMB_EXPANSION));
    itemsMap.set(PrimeItem.THERMAL_VISOR, this.itemPool.get(PrimeItem.THERMAL_VISOR));
    itemsMap.set(PrimeItem.XRAY_VISOR, this.itemPool.get(PrimeItem.XRAY_VISOR));
    itemsMap.set(PrimeItem.BOOST_BALL, this.itemPool.get(PrimeItem.BOOST_BALL));
    itemsMap.set(PrimeItem.SPIDER_BALL, this.itemPool.get(PrimeItem.SPIDER_BALL));
    itemsMap.set(PrimeItem.GRAPPLE_BEAM, this.itemPool.get(PrimeItem.GRAPPLE_BEAM));
    itemsMap.set(PrimeItem.SUPER_MISSILE, this.itemPool.get(PrimeItem.SUPER_MISSILE));

    const tankCount = this.getEnergyTankFillCount(settings);
    if (tankCount > 0) {
      itemsMap.set(PrimeItem.ENERGY_TANK, tankCount);
      this.itemPool.set(PrimeItem.ENERGY_TANK, this.itemPool.get(PrimeItem.ENERGY_TANK) - tankCount);
    }

    itemFiller.fill(this.createItemsFromMap(itemsMap));
  }

  private fillJunkItems(itemFiller: RandomAssumed, settings: any): void {
    const itemsMap: Map<string, number> = new Map<string, number>();

    itemsMap.set(PrimeItem.WAVEBUSTER, this.itemPool.get(PrimeItem.WAVEBUSTER));
    itemsMap.set(PrimeItem.ICE_SPREADER, this.itemPool.get(PrimeItem.ICE_SPREADER));
    itemsMap.set(PrimeItem.FLAMETHROWER, this.itemPool.get(PrimeItem.FLAMETHROWER));
    itemsMap.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION));
    itemsMap.set(PrimeItem.ENERGY_TANK, this.itemPool.get(PrimeItem.ENERGY_TANK));
    itemsMap.set(PrimeItem.ARTIFACT_OF_TRUTH, this.itemPool.get(PrimeItem.ARTIFACT_OF_TRUTH));
    itemsMap.set(PrimeItem.ARTIFACT_OF_STRENGTH, this.itemPool.get(PrimeItem.ARTIFACT_OF_STRENGTH));
    itemsMap.set(PrimeItem.ARTIFACT_OF_ELDER, this.itemPool.get(PrimeItem.ARTIFACT_OF_ELDER));
    itemsMap.set(PrimeItem.ARTIFACT_OF_WILD, this.itemPool.get(PrimeItem.ARTIFACT_OF_WILD));
    itemsMap.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, this.itemPool.get(PrimeItem.ARTIFACT_OF_LIFEGIVER));
    itemsMap.set(PrimeItem.ARTIFACT_OF_WARRIOR, this.itemPool.get(PrimeItem.ARTIFACT_OF_WARRIOR));
    itemsMap.set(PrimeItem.ARTIFACT_OF_CHOZO, this.itemPool.get(PrimeItem.ARTIFACT_OF_CHOZO));
    itemsMap.set(PrimeItem.ARTIFACT_OF_NATURE, this.itemPool.get(PrimeItem.ARTIFACT_OF_NATURE));
    itemsMap.set(PrimeItem.ARTIFACT_OF_SUN, this.itemPool.get(PrimeItem.ARTIFACT_OF_SUN));
    itemsMap.set(PrimeItem.ARTIFACT_OF_WORLD, this.itemPool.get(PrimeItem.ARTIFACT_OF_WORLD));
    itemsMap.set(PrimeItem.ARTIFACT_OF_SPIRIT, this.itemPool.get(PrimeItem.ARTIFACT_OF_SPIRIT));
    itemsMap.set(PrimeItem.ARTIFACT_OF_NEWBORN, this.itemPool.get(PrimeItem.ARTIFACT_OF_NEWBORN));

    itemFiller.fill(this.createItemsFromMap(itemsMap), true);
  }

  private getEnergyTankFillCount(settings): number {
    let tankCount = 0;

    if (settings.vmr || settings.earlyMagmoorNoSuit) {
      const vmrTanks = settings.vmrTanks;
      const magmoorTanks = settings.earlyMagmoorNoSuitTanks;
      const moreTanks = vmrTanks > magmoorTanks ? vmrTanks : magmoorTanks;

      if (settings.vmr && settings.earlyMagmoorNoSuit) {
        tankCount = moreTanks;
      } else if (settings.vmr) {
        tankCount = vmrTanks;
      } else {
        tankCount = magmoorTanks;
      }
    }

    return tankCount;
  }


  private fillUnshuffledItems(settings: any): void {
    const locations = this.world.getLocationsMap();

    // Chozo Artifacts
    if (!settings.shuffleArtifacts && settings.goal !== Goal.ALL_BOSSES) {
      const artifactLocations: { location: string, artifact: string }[] = [
        { location: PrimeLocation.ARTIFACT_TEMPLE, artifact: PrimeItem.ARTIFACT_OF_TRUTH },
        { location: PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER, artifact: PrimeItem.ARTIFACT_OF_CHOZO },
        { location: PrimeLocation.TOWER_CHAMBER, artifact: PrimeItem.ARTIFACT_OF_LIFEGIVER },
        { location: PrimeLocation.SUNCHAMBER_GHOSTS, artifact: PrimeItem.ARTIFACT_OF_WILD },
        { location: PrimeLocation.ELDER_CHAMBER, artifact: PrimeItem.ARTIFACT_OF_WORLD },
        { location: PrimeLocation.LAVA_LAKE, artifact: PrimeItem.ARTIFACT_OF_NATURE },
        { location: PrimeLocation.WARRIOR_SHRINE, artifact: PrimeItem.ARTIFACT_OF_STRENGTH },
        { location: PrimeLocation.CONTROL_TOWER, artifact: PrimeItem.ARTIFACT_OF_ELDER },
        { location: PrimeLocation.CHOZO_ICE_TEMPLE, artifact: PrimeItem.ARTIFACT_OF_SUN },
        { location: PrimeLocation.STORAGE_CAVE, artifact: PrimeItem.ARTIFACT_OF_SPIRIT },
        { location: PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE, artifact: PrimeItem.ARTIFACT_OF_WARRIOR },
        { location: PrimeLocation.PHAZON_MINING_TUNNEL, artifact: PrimeItem.ARTIFACT_OF_NEWBORN }
      ].filter(artifactLocation => this.itemPool.get(artifactLocation.artifact) > 0);

      for(const artifactLocation of artifactLocations) {
        locations.get(artifactLocation.location).setItem(Item.get(artifactLocation.artifact));
        this.itemPool.set(artifactLocation.artifact, 0);
      }
    }

    // Missile Launcher
    if (!settings.shuffleMissileLauncher) {
      locations.get(PrimeLocation.HIVE_TOTEM).setItem(Item.get(PrimeItem.MISSILE_LAUNCHER));
      this.itemPool.set(PrimeItem.MISSILE_LAUNCHER, 0);
    }

    // Morph Ball
    if (!settings.shuffleMorph) {
      locations.get(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE).setItem(Item.get(PrimeItem.MORPH_BALL));
      this.itemPool.set(PrimeItem.MORPH_BALL, 0);
    }

    // Morph Ball Bombs
    if (!settings.shuffleBombs) {
      locations.get(PrimeLocation.BURN_DOME_I_DRONE).setItem(Item.get(PrimeItem.MORPH_BALL_BOMB));
      this.itemPool.set(PrimeItem.MORPH_BALL_BOMB, 0);
    }

    // Charge Beam
    if (!settings.shuffleCharge) {
      locations.get(PrimeLocation.WATERY_HALL_SCAN_PUZZLE).setItem(Item.get(PrimeItem.CHARGE_BEAM));
      this.itemPool.set(PrimeItem.CHARGE_BEAM, 0);
    }

    // Space Jump Boots
    if (!settings.shuffleSpaceJump) {
      locations.get(PrimeLocation.ALCOVE).setItem(Item.get(PrimeItem.SPACE_JUMP_BOOTS));
      this.itemPool.set(PrimeItem.SPACE_JUMP_BOOTS, 0);
    }
  }

  private fillRestrictedRooms(settings: any): void {
    const locations = this.world.getLocationsMap();

    // Don't require Super Missiles
    if (settings.noSupers) {
      const noSupersLocations = [
        PrimeLocation.MAIN_PLAZA_TREE,
        PrimeLocation.RESEARCH_LAB_HYDRA,
        PrimeLocation.BIOHAZARD_CONTAINMENT,
        PrimeLocation.METROID_QUARANTINE_B,
        PrimeLocation.CROSSWAY,
        PrimeLocation.SUNCHAMBER_GHOSTS,
        PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK
      ];

      for (let key of noSupersLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }

    // No progression items in Crashed Frigate
    if (settings.noCrashedFrigate) {
      const noFrigateLocations = [
        PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA,
        PrimeLocation.BIOHAZARD_CONTAINMENT,
        PrimeLocation.HYDRO_ACCESS_TUNNEL
      ];

      for (let key of noFrigateLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }

    // Don't require Flaahgra
    if (settings.dontRequireFlaahgra) {
      const flaahgraLocations = [
        PrimeLocation.SUNCHAMBER_FLAAHGRA,
        PrimeLocation.SUNCHAMBER_GHOSTS
      ];

      for (let key of flaahgraLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }

    // Don't require Thardus
    if (settings.dontRequireThardus) {
      const thardusLocations = [
        PrimeLocation.QUARANTINE_CAVE,
        PrimeLocation.QUARANTINE_MONITOR
      ];

      for (let key of thardusLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }

    // Don't require Omega Pirate
    if (settings.dontRequireOmegaPirate) {
      const omegaPirateLocations = [
        PrimeLocation.ELITE_QUARTERS,
        PrimeLocation.PROCESSING_CENTER_ACCESS
      ];

      for (let key of omegaPirateLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }
  }

  private fillBossRoomsWithArtifacts(): void {
    const locations = this.world.getLocationsMap();
    const bossLocations = [
      PrimeLocation.SUNCHAMBER_FLAAHGRA,
      PrimeLocation.QUARANTINE_CAVE,
      PrimeLocation.ELITE_QUARTERS
    ];
    const artifacts = this.getArtifactsAsCollection().randomArray(bossLocations.length, this.rng).map(artifact => artifact.getName());

    for (let i = 0; i < bossLocations.length; i++) {
      locations.get(bossLocations[i]).setItem(Item.get(artifacts[i]));
    }
  }

  private placeNoEarlyPhazonSuit(itemFiller: RandomAssumed, settings: any): void {
    const locations = this.world.getLocationsMap();

    if (settings.noEarlyPhazonSuit) {
      const phazonLocations = [
        // Tallon Overworld
        PrimeLocation.ARBOR_CHAMBER,
        PrimeLocation.LIFE_GROVE_TUNNEL,
        PrimeLocation.LIFE_GROVE_START,
        PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER,
        PrimeLocation.GREAT_TREE_CHAMBER,
        PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA,
        PrimeLocation.BIOHAZARD_CONTAINMENT,
        PrimeLocation.HYDRO_ACCESS_TUNNEL,
        // Chozo Ruins
        PrimeLocation.FURNACE_SPIDER_TRACKS,
        PrimeLocation.DYNAMO_SPIDER_TRACK,
        PrimeLocation.TRAINING_CHAMBER,
        PrimeLocation.HALL_OF_THE_ELDERS,
        PrimeLocation.ELDER_CHAMBER,
        PrimeLocation.ANTECHAMBER,
        // Magmoor Caverns
        PrimeLocation.PLASMA_PROCESSING,
        // Phendrana Drifts
        PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE,
        PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK,
        PrimeLocation.CHOZO_ICE_TEMPLE,
        PrimeLocation.ICE_RUINS_WEST,
        PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE,
        PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK,
        PrimeLocation.QUARANTINE_CAVE,
        PrimeLocation.QUARANTINE_MONITOR,
        PrimeLocation.OBSERVATORY,
        PrimeLocation.TRANSPORT_ACCESS,
        PrimeLocation.CONTROL_TOWER,
        PrimeLocation.RESEARCH_CORE,
        PrimeLocation.RESEARCH_LAB_HYDRA,
        PrimeLocation.RESEARCH_LAB_AETHER_TANK,
        PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK,
        PrimeLocation.GRAVITY_CHAMBER_UNDERWATER,
        PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE,
        PrimeLocation.FROST_CAVE,
        PrimeLocation.STORAGE_CAVE,
        PrimeLocation.SECURITY_CAVE,
        // Phazon Mines
        PrimeLocation.MAIN_QUARRY,
        PrimeLocation.SECURITY_ACCESS_A,
        PrimeLocation.STORAGE_DEPOT_B,
        PrimeLocation.STORAGE_DEPOT_A,
        PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE,
        PrimeLocation.ELITE_RESEARCH_LASER,
        PrimeLocation.ELITE_CONTROL_ACCESS,
        PrimeLocation.VENTILATION_SHAFT,
        PrimeLocation.PHAZON_PROCESSING_CENTER,
        PrimeLocation.PROCESSING_CENTER_ACCESS,
        PrimeLocation.ELITE_QUARTERS,
        PrimeLocation.CENTRAL_DYNAMO,
        PrimeLocation.METROID_QUARANTINE_B,
        PrimeLocation.METROID_QUARANTINE_A,
        PrimeLocation.FUNGAL_HALL_B,
        PrimeLocation.FUNGAL_HALL_ACCESS
      ];

      if (settings.phazonMiningTunnelNoPhazonSuit) {
        phazonLocations.push(PrimeLocation.PHAZON_MINING_TUNNEL);
      }

      const availableLocations = phazonLocations.filter(item => {
        return !locations.get(item).hasItem();
      });

      const locationToFill = itemFiller.shuffleInPlace(availableLocations)[0];

      locations.get(locationToFill).setItem(Item.get(PrimeItem.PHAZON_SUIT));
      this.itemPool.set(PrimeItem.PHAZON_SUIT, 0);
    }
  }

  private getArtifactsAsCollection() {
    return new ItemCollection([
      Item.get(PrimeItem.ARTIFACT_OF_TRUTH),
      Item.get(PrimeItem.ARTIFACT_OF_STRENGTH),
      Item.get(PrimeItem.ARTIFACT_OF_ELDER),
      Item.get(PrimeItem.ARTIFACT_OF_WILD),
      Item.get(PrimeItem.ARTIFACT_OF_LIFEGIVER),
      Item.get(PrimeItem.ARTIFACT_OF_WARRIOR),
      Item.get(PrimeItem.ARTIFACT_OF_CHOZO),
      Item.get(PrimeItem.ARTIFACT_OF_NATURE),
      Item.get(PrimeItem.ARTIFACT_OF_SUN),
      Item.get(PrimeItem.ARTIFACT_OF_WORLD),
      Item.get(PrimeItem.ARTIFACT_OF_SPIRIT),
      Item.get(PrimeItem.ARTIFACT_OF_NEWBORN)
    ]);
  }
}

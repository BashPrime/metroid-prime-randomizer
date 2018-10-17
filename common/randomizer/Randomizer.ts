import { World } from './World';
import { Item } from './Item';
import { MersenneTwister } from './MersenneTwister';
import { Filler } from './Filler';
import { RandomAssumed } from './filler/RandomAssumed';
import { RandomizerMode } from './enums/RandomizerMode';
import { RandomizerLogic } from './enums/RandomizerLogic';
import { PrimeItem } from './enums/PrimeItem';
import { RandomizerArtifacts } from './enums/RandomizerArtifacts';
import { Utilities } from '../Utilities';
import * as crypto from 'crypto-js';

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
      const valueToHash = this.seed ? this.seed.toString(16) : (this.config.seed + this.config.settingsString);
      this.seed = this.getSafeSha256Integer(valueToHash);

      randomizerSuccess = this.fillItems();
    }
  }

  private fillItems(): boolean {
    this.world = new World(this.config);
    this.rng = new MersenneTwister(this.seed);
    this.itemPool = this.getInitialItemPool();

    const settings = this.config;
    const itemFiller = new RandomAssumed(this.world, this.rng);

    try {
      // First, fill items that are not being shuffled in the seed.
      this.fillUnshuffledItems(settings);

      // Next, fill any rooms that are completely restricted to logic and artifacts with expansions
      this.fillRestrictedRoomsWithJunk(settings);

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
      console.log("Error when filling items: " + err);
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

  private getInitialItemPool(): Map<string, number> {
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
    itemPool.set(PrimeItem.MISSILE_EXPANSION, 49);
    itemPool.set(PrimeItem.ENERGY_TANK, 14);
    itemPool.set(PrimeItem.POWER_BOMB_EXPANSION, 4);
    itemPool.set(PrimeItem.ARTIFACT_OF_TRUTH, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_STRENGTH, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_ELDER, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_WILD, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_WARRIOR, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_CHOZO, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_NATURE, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_SUN, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_WORLD, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_SPIRIT, 1);
    itemPool.set(PrimeItem.ARTIFACT_OF_NEWBORN, 1);

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
    if (!settings.shuffleArtifacts) {
      locations.get('Artifact Temple').setItem(Item.get(PrimeItem.ARTIFACT_OF_TRUTH));
      locations.get('Life Grove (Underwater Spinner)').setItem(Item.get(PrimeItem.ARTIFACT_OF_CHOZO));
      locations.get('Tower Chamber').setItem(Item.get(PrimeItem.ARTIFACT_OF_LIFEGIVER));
      locations.get('Sunchamber (Ghosts)').setItem(Item.get(PrimeItem.ARTIFACT_OF_WILD));
      locations.get('Elder Chamber').setItem(Item.get(PrimeItem.ARTIFACT_OF_WORLD));
      locations.get('Lava Lake').setItem(Item.get(PrimeItem.ARTIFACT_OF_NATURE));
      locations.get('Warrior Shrine').setItem(Item.get(PrimeItem.ARTIFACT_OF_STRENGTH));
      locations.get('Control Tower').setItem(Item.get(PrimeItem.ARTIFACT_OF_ELDER));
      locations.get('Chozo Ice Temple').setItem(Item.get(PrimeItem.ARTIFACT_OF_SUN));
      locations.get('Storage Cave').setItem(Item.get(PrimeItem.ARTIFACT_OF_SPIRIT));
      locations.get('Elite Research (Phazon Elite)').setItem(Item.get(PrimeItem.ARTIFACT_OF_WARRIOR));
      locations.get('Phazon Mining Tunnel').setItem(Item.get(PrimeItem.ARTIFACT_OF_NEWBORN));
      this.itemPool.set(PrimeItem.ARTIFACT_OF_TRUTH, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_STRENGTH, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_ELDER, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_WILD, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_WARRIOR, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_CHOZO, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_NATURE, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_SUN, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_WORLD, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_SPIRIT, 0);
      this.itemPool.set(PrimeItem.ARTIFACT_OF_NEWBORN, 0);
    }

    // Missile Launcher
    if (!settings.shuffleMissileLauncher) {
      locations.get('Hive Totem').setItem(Item.get(PrimeItem.MISSILE_LAUNCHER));
      this.itemPool.set(PrimeItem.MISSILE_LAUNCHER, 0);
    }

    // Morph Ball
    if (!settings.shuffleMorph) {
      locations.get('Ruined Shrine (Beetle Battle)').setItem(Item.get(PrimeItem.MORPH_BALL));
      this.itemPool.set(PrimeItem.MORPH_BALL, 0);
    }

    // Morph Ball Bombs
    if (!settings.shuffleBombs) {
      locations.get('Burn Dome (I. Drone)').setItem(Item.get(PrimeItem.MORPH_BALL_BOMB));
      this.itemPool.set(PrimeItem.MORPH_BALL_BOMB, 0);
    }

    // Charge Beam
    if (!settings.shuffleCharge) {
      locations.get('Watery Hall (Scan Puzzle)').setItem(Item.get(PrimeItem.CHARGE_BEAM));
      this.itemPool.set(PrimeItem.CHARGE_BEAM, 0);
    }

    // Space Jump Boots
    if (!settings.shuffleSpaceJump) {
      locations.get('Alcove').setItem(Item.get(PrimeItem.SPACE_JUMP_BOOTS));
      this.itemPool.set(PrimeItem.SPACE_JUMP_BOOTS, 0);
    }
  }

  private fillRestrictedRoomsWithJunk(settings: any): void {
    const locations = this.world.getLocationsMap();

    if (settings.noSupers) {
      const noSupersLocations = [
        'Main Plaza (Tree)',
        'Research Lab Hydra',
        'Biohazard Containment',
        'Metroid Quarantine B',
        'Crossway',
        'Sunchamber (Ghosts)',
        'Phendrana Shorelines (Spider Track)'
      ];

      for (let key of noSupersLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }

    if (settings.noCrashedFrigate) {
      const noFrigateLocations = [
        'Cargo Freight Lift to Deck Gamma',
        'Biohazard Containment',
        'Hydro Access Tunnel'
      ];

      for (let key of noFrigateLocations) {
        const location = locations.get(key);
        if (!location.hasItem()) {
          location.setItem(Item.get(PrimeItem.MISSILE_EXPANSION));
          this.itemPool.set(PrimeItem.MISSILE_EXPANSION, this.itemPool.get(PrimeItem.MISSILE_EXPANSION) - 1);
        }
      }
    }
  }
}

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

export class Randomizer {
  private config: any;
  private seed: number;
  protected world: World;
  protected rng: MersenneTwister;

  constructor(config: any) {
    this.config = config;
    this.world = new World(this.config);
  }

  randomize(): void {
    this.seed = this.config.seed;
    const settings = this.config.settings;

    this.rng = new MersenneTwister(this.seed);
    const itemFiller = new RandomAssumed(this.world, this.rng);

    // First, fill items that are not being shuffled in the seed.
    this.fillUnshuffledItems(settings);

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
  }

  getWorld(): World {
    return this.world;
  }

  getSeed(): number {
    return this.seed;
  }

  createItemsFromMap(itemsMap: Map<string, number>): Item[] {
    const items: Item[] = [];
    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  fillProgressiveItems(itemFiller: RandomAssumed, settings: any): void {
    const itemsMap: Map<string, number> = new Map<string, number>();
    if (settings.shuffleMissileLauncher) {
      itemsMap.set(PrimeItem.MISSILE_LAUNCHER, 1);
    }
    /*
    * If dashing or standable terrain are unchecked,
    * add 35 more missiles to the item pool.
    * 
    * This is to ensure Tower of Light can be in logic with 40 missiles.
    */
    if (!(settings.dashing && settings.standableTerrain)) {
      itemsMap.set(PrimeItem.MISSILE_EXPANSION, 7);
    }
    if (settings.shuffleMorph) {
      itemsMap.set(PrimeItem.MORPH_BALL, 1);
    }
    if (settings.shuffleBombs) {
      itemsMap.set(PrimeItem.MORPH_BALL_BOMB, 1);
    }
    itemsMap.set(PrimeItem.VARIA_SUIT, 1);
    itemsMap.set(PrimeItem.GRAVITY_SUIT, 1);
    itemsMap.set(PrimeItem.PHAZON_SUIT, 1);
    if (settings.shuffleSpaceJump) {
      itemsMap.set(PrimeItem.SPACE_JUMP_BOOTS, 1);
    }
    if (settings.shuffleBeams) {
      itemsMap.set(PrimeItem.WAVE_BEAM, 1);
      itemsMap.set(PrimeItem.ICE_BEAM, 1);
      itemsMap.set(PrimeItem.PLASMA_BEAM, 1);
    }
    if (settings.shuffleCharge) {
      itemsMap.set(PrimeItem.CHARGE_BEAM, 1);
    }
    if (settings.shufflePBs) {
      itemsMap.set(PrimeItem.POWER_BOMB, 1);
      itemsMap.set(PrimeItem.POWER_BOMB_EXPANSION, 4);
    }
    itemsMap.set(PrimeItem.THERMAL_VISOR, 1);
    itemsMap.set(PrimeItem.XRAY_VISOR, 1);
    itemsMap.set(PrimeItem.BOOST_BALL, 1);
    itemsMap.set(PrimeItem.SPIDER_BALL, 1);
    itemsMap.set(PrimeItem.GRAPPLE_BEAM, 1);
    if (settings.shuffleSupers) {
      itemsMap.set(PrimeItem.SUPER_MISSILE, 1);
    }

    const tankCount = this.getEnergyTankFillCount(settings);
    if (tankCount > 0) {
      itemsMap.set(PrimeItem.ENERGY_TANK, tankCount);
    }

    itemFiller.fill(this.createItemsFromMap(itemsMap));
  }

  fillJunkItems(itemFiller: RandomAssumed, settings: any): void {
    const itemsMap: Map<string, number> = new Map<string, number>();

    itemsMap.set(PrimeItem.WAVEBUSTER, 1);
    itemsMap.set(PrimeItem.ICE_SPREADER, 1);
    itemsMap.set(PrimeItem.FLAMETHROWER, 1);

    const expansions = !(settings.dashing && settings.standableTerrain) ? 7 : 0;
    itemsMap.set(PrimeItem.MISSILE_EXPANSION, 49 - expansions);

    const tankCount = this.getEnergyTankFillCount(settings);
    if (tankCount < 14) {
      itemsMap.set(PrimeItem.ENERGY_TANK, 14 - tankCount);
    }

    // Artifacts
    if (settings.shuffleArtifacts) {
      itemsMap.set(PrimeItem.ARTIFACT_OF_TRUTH, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_STRENGTH, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_ELDER, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_WILD, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_WARRIOR, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_CHOZO, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_NATURE, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_SUN, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_WORLD, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_SPIRIT, 1);
      itemsMap.set(PrimeItem.ARTIFACT_OF_NEWBORN, 1);
    }

    itemFiller.fill(this.createItemsFromMap(itemsMap), true);
  }

  getEnergyTankFillCount(settings): number {
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


  fillUnshuffledItems(settings: any): void {
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
    }

    // Missile Launcher
    if (!settings.shuffleMissileLauncher) {
      locations.get('Hive Totem').setItem(Item.get(PrimeItem.MISSILE_LAUNCHER));
    }

    // Morph Ball
    if (!settings.shuffleMorph) {
      locations.get('Ruined Shrine (Beetle Battle)').setItem(Item.get(PrimeItem.MORPH_BALL));
    }

    // Morph Ball Bombs
    if (!settings.shuffleBombs) {
      locations.get('Burn Dome (I. Drone)').setItem(Item.get(PrimeItem.MORPH_BALL_BOMB));
    }

    // Charge Beam
    if (!settings.shuffleCharge) {
      locations.get('Watery Hall (Scan Puzzle)').setItem(Item.get(PrimeItem.CHARGE_BEAM));
    }

    // Space Jump Boots
    if (!settings.shuffleSpaceJump) {
      locations.get('Alcove').setItem(Item.get(PrimeItem.SPACE_JUMP_BOOTS));
    }

    // Super Missile
    if (!settings.shuffleSupers) {
      locations.get('Observatory').setItem(Item.get(PrimeItem.SUPER_MISSILE));
    }

    // Wave, Ice, Plasma Beams
    if (!settings.shuffleBeams) {
      locations.get('Chapel of the Elders').setItem(Item.get(PrimeItem.WAVE_BEAM));
      locations.get('Antechamber').setItem(Item.get(PrimeItem.ICE_BEAM));
      locations.get('Plasma Processing').setItem(Item.get(PrimeItem.PLASMA_BEAM));
    }

    // Power Bombs/Expansions
    if (!settings.shufflePBs) {
      locations.get('Central Dynamo').setItem(Item.get(PrimeItem.POWER_BOMB));
      locations.get('Magma Pool').setItem(Item.get(PrimeItem.POWER_BOMB_EXPANSION));
      locations.get('Ice Ruins West').setItem(Item.get(PrimeItem.POWER_BOMB_EXPANSION));
      locations.get('Security Cave').setItem(Item.get(PrimeItem.POWER_BOMB_EXPANSION));
      locations.get('Fiery Shores (Warrior Shrine Tunnel)').setItem(Item.get(PrimeItem.POWER_BOMB_EXPANSION));
    }
  }
}

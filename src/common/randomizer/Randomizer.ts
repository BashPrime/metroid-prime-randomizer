import {World} from './World';
import {Item} from './Item';
import {MersenneTwister} from './MersenneTwister';
import {Filler} from './Filler';
import {RandomAssumed} from './filler/RandomAssumed';
import {RandomizerMode} from './enums/RandomizerMode';
import {RandomizerLogic} from './enums/RandomizerLogic';
import {PrimeItem} from './enums/PrimeItem';

export class Randomizer {
  protected mode: string;
  protected logic: string;
  protected difficulty: string;
  protected goal: string;
  protected world: World;
  protected rng: MersenneTwister;
  protected seed: number;

  constructor(mode: string, logic: string, difficulty: string) {
    this.mode = mode;
    this.logic = logic;
    this.difficulty = difficulty;
    this.world = new World(this.mode, this.logic, this.difficulty);
  }

  randomize(seed?: number): void {
    if (seed == null) {
      seed = this.getRandomInt(1, 1000000000);
    }
    this.seed = seed;
    this.rng = new MersenneTwister(this.seed);
    new RandomAssumed(this.world, this.rng).fill(this.getPriorityItems(), this.getUpgrades(), this.getArtifacts(), this.getExpansions());
  }

  getWorld(): World {
    return this.world;
  }

  getMode(): string {
    return this.mode;
  }

  getLogic(): string {
    return this.logic;
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  getSeed(): number {
    return this.seed;
  }

  getArtifacts(): Array<Item> {
    const items: Array<Item> = [];
    const itemsMap: Map<string, number> = new Map<string, number>();
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

    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  getPriorityItems(): Array<Item> {
    const items: Array<Item> = [];
    const itemsMap: Map<string, number> = new Map<string, number>();
    switch (this.logic) {
      case RandomizerLogic.MINOR_GLITCHES:
        itemsMap.set(PrimeItem.MISSILE_LAUNCHER, 1);
        break;
      case RandomizerLogic.NO_GLITCHES:
      default:
        itemsMap.set(PrimeItem.MISSILE_LAUNCHER, 1);
        itemsMap.set(PrimeItem.MORPH_BALL, 1);
    }

    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  getUpgrades(): Array<Item> {
    const items: Array<Item> = [];
    const itemsMap: Map<string, number> = new Map<string, number>();
    itemsMap.set(PrimeItem.MORPH_BALL_BOMB, 1);
    itemsMap.set(PrimeItem.VARIA_SUIT, 1);
    itemsMap.set(PrimeItem.GRAVITY_SUIT, 1);
    itemsMap.set(PrimeItem.PHAZON_SUIT, 1);
    itemsMap.set(PrimeItem.SPACE_JUMP_BOOTS, 1);
    itemsMap.set(PrimeItem.WAVE_BEAM, 1);
    itemsMap.set(PrimeItem.ICE_BEAM, 1);
    itemsMap.set(PrimeItem.PLASMA_BEAM, 1);
    itemsMap.set(PrimeItem.CHARGE_BEAM, 1);
    itemsMap.set(PrimeItem.POWER_BOMB, 1);
    itemsMap.set(PrimeItem.THERMAL_VISOR, 1);
    itemsMap.set(PrimeItem.XRAY_VISOR, 1);
    itemsMap.set(PrimeItem.BOOST_BALL, 1);
    itemsMap.set(PrimeItem.SPIDER_BALL, 1);
    itemsMap.set(PrimeItem.GRAPPLE_BEAM, 1);
    itemsMap.set(PrimeItem.SUPER_MISSILE, 1);
    itemsMap.set(PrimeItem.WAVEBUSTER, 1);
    itemsMap.set(PrimeItem.ICE_SPREADER, 1);
    itemsMap.set(PrimeItem.FLAMETHROWER, 1);

    if (this.logic !== RandomizerLogic.NO_GLITCHES) {
      itemsMap.set(PrimeItem.MORPH_BALL, 1);
      itemsMap.set(PrimeItem.ENERGY_TANK, 6);
    }

    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  getExpansions(): Array<Item> {
    const items: Array<Item> = [];
    const itemsMap: Map<string, number> = new Map<string, number>();

    itemsMap.set(PrimeItem.MISSILE_EXPANSION, 49);

    if (this.logic === RandomizerLogic.NO_GLITCHES) {
      itemsMap.set(PrimeItem.ENERGY_TANK, 14);
    } else {
      itemsMap.set(PrimeItem.ENERGY_TANK, 8);
    }

    itemsMap.set(PrimeItem.POWER_BOMB_EXPANSION, 4);

    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  getRandomInt(min: number, max: number, rng: MersenneTwister = new MersenneTwister()) {
    return Math.floor(rng.random() * (max - min + 1)) + min;
  }
}

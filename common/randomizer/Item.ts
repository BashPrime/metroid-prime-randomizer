import { PrimeItem } from './enums/PrimeItem';
import {PrimeItemId} from './enums/PrimeItemId';

export class Item {
  protected static items: Map<string, Item>;
  protected name: string;
  protected id: number;
  protected model: number;
  protected animSet: number;
  protected animCharacter: number;
  protected rotation: { x: number, y: number, z: number };
  protected xrayModel: number;
  protected xraySkin: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  public static get(key: string): Item {
    const items: Map<string, Item> = this.all();
    return items.get(key);
  }

  public static all(): Map<string, Item> {
    if (this.items !== undefined) {
      return this.items;
    }

    this.items = new Map<string, Item>();
    this.items.set(PrimeItem.MISSILE_EXPANSION, new Item(PrimeItem.MISSILE_EXPANSION, PrimeItemId.MISSILE_EXPANSION));
    this.items.set(PrimeItem.ENERGY_TANK, new Item(PrimeItem.ENERGY_TANK, PrimeItemId.ENERGY_TANK));
    this.items.set(PrimeItem.POWER_BOMB_EXPANSION, new Item(PrimeItem.POWER_BOMB_EXPANSION, PrimeItemId.POWER_BOMB_EXPANSION));
    this.items.set(PrimeItem.SPACE_JUMP_BOOTS, new Item(PrimeItem.SPACE_JUMP_BOOTS, PrimeItemId.SPACE_JUMP_BOOTS));
    this.items.set(PrimeItem.MISSILE_LAUNCHER, new Item(PrimeItem.MISSILE_LAUNCHER, PrimeItemId.MISSILE_LAUNCHER));
    this.items.set(PrimeItem.WAVE_BEAM, new Item(PrimeItem.WAVE_BEAM, PrimeItemId.WAVE_BEAM));
    this.items.set(PrimeItem.ICE_BEAM, new Item(PrimeItem.ICE_BEAM, PrimeItemId.ICE_BEAM));
    this.items.set(PrimeItem.PLASMA_BEAM, new Item(PrimeItem.PLASMA_BEAM, PrimeItemId.PLASMA_BEAM));
    this.items.set(PrimeItem.CHARGE_BEAM, new Item(PrimeItem.CHARGE_BEAM, PrimeItemId.CHARGE_BEAM));
    this.items.set(PrimeItem.SUPER_MISSILE, new Item(PrimeItem.SUPER_MISSILE, PrimeItemId.SUPER_MISSILE));
    this.items.set(PrimeItem.WAVEBUSTER, new Item(PrimeItem.WAVEBUSTER, PrimeItemId.WAVEBUSTER));
    this.items.set(PrimeItem.ICE_SPREADER, new Item(PrimeItem.ICE_SPREADER, PrimeItemId.ICE_SPREADER));
    this.items.set(PrimeItem.FLAMETHROWER, new Item(PrimeItem.FLAMETHROWER, PrimeItemId.FLAMETHROWER));
    this.items.set(PrimeItem.GRAPPLE_BEAM, new Item(PrimeItem.GRAPPLE_BEAM, PrimeItemId.GRAPPLE_BEAM));
    this.items.set(PrimeItem.MORPH_BALL, new Item(PrimeItem.MORPH_BALL, PrimeItemId.MORPH_BALL));
    this.items.set(PrimeItem.BOOST_BALL, new Item(PrimeItem.BOOST_BALL, PrimeItemId.BOOST_BALL));
    this.items.set(PrimeItem.SPIDER_BALL, new Item(PrimeItem.SPIDER_BALL, PrimeItemId.SPIDER_BALL));
    this.items.set(PrimeItem.MORPH_BALL_BOMB, new Item(PrimeItem.MORPH_BALL_BOMB, PrimeItemId.MORPH_BALL_BOMB));
    this.items.set(PrimeItem.POWER_BOMB, new Item(PrimeItem.POWER_BOMB, PrimeItemId.POWER_BOMB));
    this.items.set(PrimeItem.VARIA_SUIT, new Item(PrimeItem.VARIA_SUIT, PrimeItemId.VARIA_SUIT));
    this.items.set(PrimeItem.GRAVITY_SUIT, new Item(PrimeItem.GRAVITY_SUIT, PrimeItemId.GRAVITY_SUIT));
    this.items.set(PrimeItem.PHAZON_SUIT, new Item(PrimeItem.PHAZON_SUIT, PrimeItemId.PHAZON_SUIT));
    this.items.set(PrimeItem.THERMAL_VISOR, new Item(PrimeItem.THERMAL_VISOR, PrimeItemId.THERMAL_VISOR));
    this.items.set(PrimeItem.XRAY_VISOR, new Item(PrimeItem.XRAY_VISOR, PrimeItemId.XRAY_VISOR));
    this.items.set(PrimeItem.ARTIFACT_OF_TRUTH, new Item(PrimeItem.ARTIFACT_OF_TRUTH, PrimeItemId.ARTIFACT_OF_TRUTH));
    this.items.set(PrimeItem.ARTIFACT_OF_STRENGTH, new Item(PrimeItem.ARTIFACT_OF_STRENGTH, PrimeItemId.ARTIFACT_OF_STRENGTH));
    this.items.set(PrimeItem.ARTIFACT_OF_ELDER, new Item(PrimeItem.ARTIFACT_OF_ELDER, PrimeItemId.ARTIFACT_OF_ELDER));
    this.items.set(PrimeItem.ARTIFACT_OF_WILD, new Item(PrimeItem.ARTIFACT_OF_WILD, PrimeItemId.ARTIFACT_OF_WILD));
    this.items.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, new Item(PrimeItem.ARTIFACT_OF_LIFEGIVER, PrimeItemId.ARTIFACT_OF_LIFEGIVER));
    this.items.set(PrimeItem.ARTIFACT_OF_WARRIOR, new Item(PrimeItem.ARTIFACT_OF_WARRIOR, PrimeItemId.ARTIFACT_OF_WARRIOR));
    this.items.set(PrimeItem.ARTIFACT_OF_CHOZO, new Item(PrimeItem.ARTIFACT_OF_CHOZO, PrimeItemId.ARTIFACT_OF_CHOZO));
    this.items.set(PrimeItem.ARTIFACT_OF_NATURE, new Item(PrimeItem.ARTIFACT_OF_NATURE, PrimeItemId.ARTIFACT_OF_NATURE));
    this.items.set(PrimeItem.ARTIFACT_OF_SUN, new Item(PrimeItem.ARTIFACT_OF_SUN, PrimeItemId.ARTIFACT_OF_SUN));
    this.items.set(PrimeItem.ARTIFACT_OF_WORLD, new Item(PrimeItem.ARTIFACT_OF_WORLD, PrimeItemId.ARTIFACT_OF_WORLD));
    this.items.set(PrimeItem.ARTIFACT_OF_SPIRIT, new Item(PrimeItem.ARTIFACT_OF_SPIRIT, PrimeItemId.ARTIFACT_OF_SPIRIT));
    this.items.set(PrimeItem.ARTIFACT_OF_NEWBORN, new Item(PrimeItem.ARTIFACT_OF_NEWBORN, PrimeItemId.ARTIFACT_OF_NEWBORN));
    return this.items;
  }

  public getName(): string {
    return this.name;
  }

  public getID(): number {
    return this.id;
  }

  public getModel(): number {
    return this.model;
  }
}

import { Item } from '../item';
import { PrimeItem } from '../../enums/primeItem';

/**
 * Key-based item map typed for convenience.
 */
type ItemMap = { [key: string]: Item };

/**
 * Describes whether an item is a major upgrade, an ammo expansion, or a Chozo Artifact.
 */
export enum ItemType {
  ITEM = 'Item',
  ARTIFACT = 'Artifact',
  EXPANSION = 'Expansion'
};

/**
 * Determines the precedence of items being placed.
 */
export enum ItemPriority {
  PROGRESSION,
  ARTIFACTS,
  EXTRA
};

/**
 * List of all items and expansions in Metroid Prime.
 */
export const primeItems: ItemMap = {
  [PrimeItem.MISSILE_LAUNCHER]: new Item(PrimeItem.MISSILE_LAUNCHER, ItemType.ITEM, 0),
  [PrimeItem.MISSILE_EXPANSION]: new Item(PrimeItem.MISSILE_EXPANSION, ItemType.EXPANSION, 0),
  [PrimeItem.ENERGY_TANK]: new Item(PrimeItem.ENERGY_TANK, ItemType.EXPANSION, 1),
  [PrimeItem.THERMAL_VISOR]: new Item(PrimeItem.THERMAL_VISOR, ItemType.ITEM, 2),
  [PrimeItem.XRAY_VISOR]: new Item(PrimeItem.XRAY_VISOR, ItemType.ITEM, 3),
  [PrimeItem.VARIA_SUIT]: new Item(PrimeItem.VARIA_SUIT, ItemType.ITEM, 4),
  [PrimeItem.GRAVITY_SUIT]: new Item(PrimeItem.GRAVITY_SUIT, ItemType.ITEM, 5),
  [PrimeItem.PHAZON_SUIT]: new Item(PrimeItem.PHAZON_SUIT, ItemType.ITEM, 6),
  [PrimeItem.MORPH_BALL]: new Item(PrimeItem.MORPH_BALL, ItemType.ITEM, 7),
  [PrimeItem.BOOST_BALL]: new Item(PrimeItem.BOOST_BALL, ItemType.ITEM, 8),
  [PrimeItem.SPIDER_BALL]: new Item(PrimeItem.SPIDER_BALL, ItemType.ITEM, 9),
  [PrimeItem.MORPH_BALL_BOMB]: new Item(PrimeItem.MORPH_BALL_BOMB, ItemType.ITEM, 10),
  [PrimeItem.POWER_BOMB_EXPANSION]: new Item(PrimeItem.POWER_BOMB_EXPANSION, ItemType.EXPANSION, 11),
  [PrimeItem.POWER_BOMB]: new Item(PrimeItem.POWER_BOMB, ItemType.ITEM, 12),
  [PrimeItem.CHARGE_BEAM]: new Item(PrimeItem.CHARGE_BEAM, ItemType.ITEM, 13),
  [PrimeItem.SPACE_JUMP_BOOTS]: new Item(PrimeItem.SPACE_JUMP_BOOTS, ItemType.ITEM, 14),
  [PrimeItem.GRAPPLE_BEAM]: new Item(PrimeItem.GRAPPLE_BEAM, ItemType.ITEM, 15),
  [PrimeItem.SUPER_MISSILE]: new Item(PrimeItem.SUPER_MISSILE, ItemType.ITEM, 16),
  [PrimeItem.WAVEBUSTER]: new Item(PrimeItem.WAVEBUSTER, ItemType.ITEM, 17),
  [PrimeItem.ICE_SPREADER]: new Item(PrimeItem.ICE_SPREADER, ItemType.ITEM, 18),
  [PrimeItem.FLAMETHROWER]: new Item(PrimeItem.FLAMETHROWER, ItemType.ITEM, 19),
  [PrimeItem.WAVE_BEAM]: new Item(PrimeItem.WAVE_BEAM, ItemType.ITEM, 20),
  [PrimeItem.ICE_BEAM]: new Item(PrimeItem.ICE_BEAM, ItemType.ITEM, 21),
  [PrimeItem.PLASMA_BEAM]: new Item(PrimeItem.PLASMA_BEAM, ItemType.ITEM, 22),
  [PrimeItem.ARTIFACT_OF_LIFEGIVER]: new Item(PrimeItem.ARTIFACT_OF_LIFEGIVER, ItemType.ARTIFACT, 23),
  [PrimeItem.ARTIFACT_OF_WILD]: new Item(PrimeItem.ARTIFACT_OF_WILD, ItemType.ARTIFACT, 24),
  [PrimeItem.ARTIFACT_OF_WORLD]: new Item(PrimeItem.ARTIFACT_OF_WORLD, ItemType.ARTIFACT, 25),
  [PrimeItem.ARTIFACT_OF_SUN]: new Item(PrimeItem.ARTIFACT_OF_SUN, ItemType.ARTIFACT, 26),
  [PrimeItem.ARTIFACT_OF_ELDER]: new Item(PrimeItem.ARTIFACT_OF_ELDER, ItemType.ARTIFACT, 27),
  [PrimeItem.ARTIFACT_OF_SPIRIT]: new Item(PrimeItem.ARTIFACT_OF_SPIRIT, ItemType.ARTIFACT, 28),
  [PrimeItem.ARTIFACT_OF_TRUTH]: new Item(PrimeItem.ARTIFACT_OF_TRUTH, ItemType.ARTIFACT, 29),
  [PrimeItem.ARTIFACT_OF_CHOZO]: new Item(PrimeItem.ARTIFACT_OF_CHOZO, ItemType.ARTIFACT, 30),
  [PrimeItem.ARTIFACT_OF_WARRIOR]: new Item(PrimeItem.ARTIFACT_OF_WARRIOR, ItemType.ARTIFACT, 31),
  [PrimeItem.ARTIFACT_OF_NEWBORN]: new Item(PrimeItem.ARTIFACT_OF_NEWBORN, ItemType.ARTIFACT, 32),
  [PrimeItem.ARTIFACT_OF_NATURE]: new Item(PrimeItem.ARTIFACT_OF_NATURE, ItemType.ARTIFACT, 33),
  [PrimeItem.ARTIFACT_OF_STRENGTH]: new Item(PrimeItem.ARTIFACT_OF_STRENGTH, ItemType.ARTIFACT, 34),
  [PrimeItem.NOTHING]: new Item(PrimeItem.NOTHING, ItemType.EXPANSION, 35),
  [PrimeItem.SCAN_VISOR]: new Item(PrimeItem.SCAN_VISOR, ItemType.ITEM, 36)
};

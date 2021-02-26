import { ItemCategory } from '../enums/itemCategory';

export const MAJOR_ITEM_CATEGORIES: string[] = [
  ItemCategory.VISOR,
  ItemCategory.SUIT,
  ItemCategory.BEAM,
  ItemCategory.MORPH_BALL,
  ItemCategory.MOVEMENT,
  ItemCategory.MISSILE,
  ItemCategory.CHARGE_COMBO,
];

export const CHOZO_ARTIFACT_CATEGORIES: string[] = [
  ItemCategory.CHOZO_ARTIFACT
];

export const LONG_NAMES: { [key: string]: string } = {
  [ItemCategory.VISOR]: 'Visors',
  [ItemCategory.SUIT]: 'Suits',
  [ItemCategory.BEAM]: 'Beams',
  [ItemCategory.MORPH_BALL]: 'Morph Ball',
  [ItemCategory.MOVEMENT]: 'Movement',
  [ItemCategory.MISSILE]: 'Missile',
  [ItemCategory.CHARGE_COMBO]: 'Charge Combos',
  [ItemCategory.ENERGY_TANK]: 'Energy Tanks',
};

export const HINT_DETAILS: { [key: string]: [article: string, item: string] } = {
  [ItemCategory.VISOR]: ['a ', 'visor'],
  [ItemCategory.SUIT]: ['a ', 'suit'],
  [ItemCategory.BEAM]: ['a ', 'beam'],
  [ItemCategory.MORPH_BALL]: ['a ', 'morph ball system'],
  [ItemCategory.MOVEMENT]: ['a ', 'movement system'],
  [ItemCategory.MISSILE]: ['a ', 'missile system'],
  [ItemCategory.CHARGE_COMBO]: ['a ', 'charge combo'],
  [ItemCategory.ENERGY_TANK]: ['an ', 'Energy Tank'],
  [ItemCategory.CHOZO_ARTIFACT]: ['a ', 'Chozo Artifact'],
  [ItemCategory.MISSILE_RELATED]: ['a ', 'missile-related upgrade'],
  [ItemCategory.MORPH_BALL_RELATED]: ['a ', 'morph ball-related upgrade'],
  [ItemCategory.BEAM_RELATED]: ['a ', 'beam-related upgrade'],
  [ItemCategory.LIFE_SUPPORT]: ['a ', 'life support system'],
  [ItemCategory.EXPANSION]: ['an ', 'expansion'],
}

export function isMajorCategory(category: string): boolean {
  return MAJOR_ITEM_CATEGORIES.includes(category);
}

export function isArtifact(category: string): boolean {
  return CHOZO_ARTIFACT_CATEGORIES.includes(category);
}

export function longName(category: string): string {
  return LONG_NAMES[category];
}

export function hintDetails(category: string): [string, string] {
  return HINT_DETAILS[category];
}

export function generalDetails(category: string): [string, string] {
  if (isMajorCategory(category)) {
    return ['a ', 'major upgrade'];
  } else if (isArtifact(category)) {
    return ['an ', 'artifact'];
  }

  return ['an ', 'expansion'];
}

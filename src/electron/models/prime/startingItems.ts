import { PrimeItem } from '../../enums/primeItem';
import { toPaddedBitString } from '../../utilities';
import { Item } from '../item';

const items: { name: string, bitLength: number }[] = [
  { name: PrimeItem.SCAN_VISOR, bitLength: 1 },
  { name: PrimeItem.MISSILE, bitLength: 8 },
  { name: PrimeItem.ENERGY_TANK, bitLength: 4 },
  { name: PrimeItem.POWER_BOMB, bitLength: 3 },
  { name: PrimeItem.WAVE_BEAM, bitLength: 1 },
  { name: PrimeItem.ICE_BEAM, bitLength: 1 },
  { name: PrimeItem.PLASMA_BEAM, bitLength: 1 },
  { name: PrimeItem.CHARGE_BEAM, bitLength: 1 },
  { name: PrimeItem.MORPH_BALL, bitLength: 1 },
  { name: PrimeItem.MORPH_BALL_BOMB, bitLength: 1 },
  { name: PrimeItem.SPIDER_BALL, bitLength: 1 },
  { name: PrimeItem.BOOST_BALL, bitLength: 1 },
  { name: PrimeItem.VARIA_SUIT, bitLength: 1 },
  { name: PrimeItem.GRAVITY_SUIT, bitLength: 1 },
  { name: PrimeItem.PHAZON_SUIT, bitLength: 1 },
  { name: PrimeItem.THERMAL_VISOR, bitLength: 1 },
  { name: PrimeItem.XRAY_VISOR, bitLength: 1 },
  { name: PrimeItem.SPACE_JUMP_BOOTS, bitLength: 1 },
  { name: PrimeItem.GRAPPLE_BEAM, bitLength: 1 },
  { name: PrimeItem.SUPER_MISSILE, bitLength: 1 },
  { name: PrimeItem.WAVEBUSTER, bitLength: 1 }
  // Ice Spreader and Flamethrower are not included, limitation of the patcher
];

export function toRandomprimeFormat(startingItems: Item[]): number {
  // Object representing the number of items
  let itemBitString = '';

  for (const item of items) {
    let value: number;

    // Special cases for missiles and power bombs
    switch (item.name) {
      // Scan visor isn't shuffled in the item pool yet, so make sure it gets added
      case PrimeItem.SCAN_VISOR: {
        value = 1;
        break;
      }
      // Each missile is worth 5
      case PrimeItem.MISSILE: {
        const missileCoefficient = 5;
        value = missileCoefficient * startingItems.filter((startingItem: Item) =>
          startingItem.getName() === PrimeItem.MISSILE_LAUNCHER
          || startingItem.getName() === PrimeItem.MISSILE_EXPANSION).length;
        break;
      }
      // Main Power bomb is worth 4
      case PrimeItem.POWER_BOMB: {
        const mainPowerBombCoefficient = 4;
        value = mainPowerBombCoefficient * startingItems.filter(startingItem =>
          startingItem.getName() === PrimeItem.POWER_BOMB).length
        + startingItems.filter(startingItem =>
            startingItem.getName() === PrimeItem.POWER_BOMB_EXPANSION).length;
        break;
      }
      // Not missiles or power bombs, handle as usual
      default: {
        value = startingItems.filter(startingItem => startingItem.getName() === item.name).length;
      }
    }

    // Append value to bit string.
    // Randomprime reads the bits from right to left, so we are appending to the beginning of the string
    itemBitString = toPaddedBitString(value, item.bitLength) + itemBitString;
  }

  return parseInt(itemBitString, 2);
}

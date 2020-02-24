import { PrimeItem } from '../../enums/primeItem';
import { toPaddedBitString } from '../../utilities';
import { Item } from '../item';
import { PrimeWorld } from './world';
import * as Utilities from '../../utilities';
import { ItemOverrides } from './itemOverrides';
import { ItemMap, mapToItemPool } from './itemPool';

interface StartingItems {
  [key: string]: {
    bitWidth: number;
    maximum: number;
    randomPrimeOnly?: boolean;
    exclude?: boolean;
  }
}

/**
 * Reference of items containing starting item information pertaining to the randomizer logic and the randomprime patcher.
 *
 * The un-excluded items in this list are intentionally ordered to match how the
 * randomprime patcher handles the starting items bitstring.
 */
const items: StartingItems = {
  [PrimeItem.SCAN_VISOR]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.MISSILE]: { bitWidth: 8, maximum: 0, randomPrimeOnly: true },
  [PrimeItem.ENERGY_TANK]: { bitWidth: 4, maximum: 14 },
  [PrimeItem.POWER_BOMB]: { bitWidth: 4, maximum: 1 },
  [PrimeItem.WAVE_BEAM]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.ICE_BEAM]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.PLASMA_BEAM]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.CHARGE_BEAM]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.MORPH_BALL]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.MORPH_BALL_BOMB]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.SPIDER_BALL]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.BOOST_BALL]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.VARIA_SUIT]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.GRAVITY_SUIT]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.PHAZON_SUIT]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.THERMAL_VISOR]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.XRAY_VISOR]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.SPACE_JUMP_BOOTS]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.GRAPPLE_BEAM]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.SUPER_MISSILE]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.WAVEBUSTER]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.ICE_SPREADER]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.FLAMETHROWER]: { bitWidth: 1, maximum: 1 },
  [PrimeItem.MISSILE_LAUNCHER]: { bitWidth: 0, maximum: 1, exclude: true },
  [PrimeItem.MISSILE_EXPANSION]: { bitWidth: 0, maximum: 49, exclude: true },
  [PrimeItem.POWER_BOMB_EXPANSION]: { bitWidth: 0, maximum: 4, exclude: true }
};

/**
 * Sets the starting items for a world, based on the random starting settings and overrides.
 * @param world The world to set the starting items for.
 */
export function setStartingItems(world: PrimeWorld): void {
  const startingItems: ItemMap = getStartingItemsMap();
  const itemEntries = Object.entries(items);
  const settings = world.getSettings();
  const rng = world.getRng();

  // Get any starting items from item overrides
  for (let override of settings.itemOverrides.toArray()) {
    if (override.state === ItemOverrides.STATES.startingItem) {
      // Initially set the count to the maximum for the starting item (1 if the item isn't an expansion)
      // This value will be overwritten if the override is for an expansion.
      let startCount = items[override.name].maximum;

      // If the item is an expansion, use either its count value or the maximum for the item.
      if (override.isExpansion && override.count < items[override.name].maximum) {
        startCount = override.count;
      }

      // Apply the count to the starting items map
      startingItems[override.name] = startCount;
    }
  }

  // If scan visor override isn't present, make it a starting item by default.
  // When no overrides are provided, scan visor is the only item that will be set as a starting item; all others will be shuffled.
  if (!settings.itemOverrides[PrimeItem.SCAN_VISOR]) {
    startingItems[PrimeItem.SCAN_VISOR] = items[PrimeItem.SCAN_VISOR].maximum;
  }

  // Pick a random number of starting items from a min and max range
  let numberOfRandomStartingItems = Utilities.getRandomInt(settings.randomStartingItemsMin, settings.randomStartingItemsMax, rng);

  // Add the given number of random starting items, using items list to choose what we're adding
  for (let i = 0; i < numberOfRandomStartingItems; i++) {
    // Look for an item that can have its value incremented.
    let incrementedItem = false;

    // Keep getting a random item until we find one that can be added to.
    while (!incrementedItem) {
      const item = itemEntries[Utilities.getRandomInt(0, itemEntries.length - 1, rng)];
      const itemKey = item[0];
      const itemInfo = item[1];

      // Increment the item if we can, set flag to true
      if (startingItems[itemKey] < itemInfo.maximum) {
        startingItems[itemKey]++;
        incrementedItem = true;
      }
    }
  }

  const filteredStartingItems = filterItemMap(startingItems);
  world.setStartingItems(filteredStartingItems);
}

export function toRandomprimeFormat(startingItems: Item[]): number {
  // Bitstring representing the number of items
  let itemBitString = '';

  // Iterate through all un-excluded items (excluded items are not useful for building randomprime string)
  for (let [key, info] of Object.entries(items).filter(([key, info]) => !info.exclude)) {
    let value: number;

    // Special cases for missiles and power bombs
    switch (key) {
      // Each missile is worth 5
      case PrimeItem.MISSILE: {
        const missileCoefficient = 5;
        value = missileCoefficient * startingItems.filter((startingItem: Item) =>
          startingItem.getName() === PrimeItem.MISSILE_LAUNCHER
          || startingItem.getName() === PrimeItem.MISSILE_EXPANSION).length;
        break;
      }
      // Main Power bomb is worth 4, expansions are worth 1
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
        value = startingItems.filter(startingItem => startingItem.getName() === key).length;
      }
    }

    // Append value to bit string.
    // Randomprime reads the bits from right to left, so we are appending to the beginning of the string
    itemBitString = toPaddedBitString(value, info.bitWidth) + itemBitString;
  }

  return parseInt(itemBitString, 2);
}

/**
 * Returns an item map with each item set to 0.
 */
function getStartingItemsMap(): ItemMap {
  const map: ItemMap = {};

  // Build map out of non randomprime-specific items
  for (let [key, info] of Object.entries(items).filter(([key, info]) => !info.randomPrimeOnly)) {
    map[key] = 0;
  }

  return map;
}

/**
 * Removes any items with a value of 0 from the provided item map, and returns a filtered copy.
 *
 * @param map The item map to filter.
 */
function filterItemMap(map: ItemMap): ItemMap {
  return Object.keys(map)
    .filter(key => map[key] > 0)
    .reduce((obj, key) => {
      obj[key] = map[key];
      return obj;
    }, {});
}

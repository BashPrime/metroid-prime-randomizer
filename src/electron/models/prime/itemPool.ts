import { PrimeItem } from '../../enums/primeItem';
import { Item } from '../item';
import { primeItems, ItemPriority, ItemType } from './items';
import { PrimeLocation } from '../../enums/primeLocation';
import { PrimeWorld } from './world';
import { randomArray } from '../../utilities';
import { PrimeItemCollection } from './itemCollection';
import { ItemOverrides } from './itemOverrides';
import * as Utilities from '../../utilities';

export type ItemMap = { [key: string]: number };

interface ItemPool {
  [key: string]: ItemPoolObject[];
}

interface ItemPoolObject {
  count: number;
  type: PoolType;
}

enum PoolType {
  ALWAYS,
  JUNK,
  ARTIFACTS
}

type ItemsObject = {
  pool: Item[],
  placedItems: { [key: string]: Item };
}

const vanillaUpgrades = {
  [PrimeLocation.HIVE_TOTEM]: PrimeItem.MISSILE_LAUNCHER,
  [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: PrimeItem.MORPH_BALL,
  [PrimeLocation.BURN_DOME_I_DRONE]: PrimeItem.MORPH_BALL_BOMB,
  [PrimeLocation.PHENDRANA_CANYON]: PrimeItem.BOOST_BALL,
  [PrimeLocation.QUARANTINE_CAVE]: PrimeItem.SPIDER_BALL,
  [PrimeLocation.CENTRAL_DYNAMO]: PrimeItem.POWER_BOMB,
  [PrimeLocation.SUNCHAMBER_FLAAHGRA]: PrimeItem.VARIA_SUIT,
  [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: PrimeItem.GRAVITY_SUIT,
  [PrimeLocation.ELITE_QUARTERS]: PrimeItem.PHAZON_SUIT,
  [PrimeLocation.CHAPEL_OF_THE_ELDERS]: PrimeItem.WAVE_BEAM,
  [PrimeLocation.ANTECHAMBER]: PrimeItem.ICE_BEAM,
  [PrimeLocation.PLASMA_PROCESSING]: PrimeItem.PLASMA_BEAM,
  [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: PrimeItem.CHARGE_BEAM,
  [PrimeLocation.OBSERVATORY]: PrimeItem.SUPER_MISSILE,
  [PrimeLocation.RESEARCH_CORE]: PrimeItem.THERMAL_VISOR,
  [PrimeLocation.LIFE_GROVE_START]: PrimeItem.XRAY_VISOR,
  [PrimeLocation.ALCOVE]: PrimeItem.SPACE_JUMP_BOOTS,
  [PrimeLocation.STORAGE_DEPOT_B]: PrimeItem.GRAPPLE_BEAM,
  [PrimeLocation.TOWER_OF_LIGHT]: PrimeItem.WAVEBUSTER,
  [PrimeLocation.SHORE_TUNNEL]: PrimeItem.ICE_SPREADER,
  [PrimeLocation.STORAGE_DEPOT_A]: PrimeItem.FLAMETHROWER
};

const vanillaArtifacts = {
  [PrimeLocation.ARTIFACT_TEMPLE]: PrimeItem.ARTIFACT_OF_TRUTH,
  [PrimeLocation.WARRIOR_SHRINE]: PrimeItem.ARTIFACT_OF_STRENGTH,
  [PrimeLocation.CONTROL_TOWER]: PrimeItem.ARTIFACT_OF_ELDER,
  [PrimeLocation.SUNCHAMBER_GHOSTS]: PrimeItem.ARTIFACT_OF_WILD,
  [PrimeLocation.TOWER_CHAMBER]: PrimeItem.ARTIFACT_OF_LIFEGIVER,
  [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: PrimeItem.ARTIFACT_OF_WARRIOR,
  [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: PrimeItem.ARTIFACT_OF_CHOZO,
  [PrimeLocation.LAVA_LAKE]: PrimeItem.ARTIFACT_OF_NATURE,
  [PrimeLocation.CHOZO_ICE_TEMPLE]: PrimeItem.ARTIFACT_OF_SUN,
  [PrimeLocation.ELDER_CHAMBER]: PrimeItem.ARTIFACT_OF_WORLD,
  [PrimeLocation.STORAGE_CAVE]: PrimeItem.ARTIFACT_OF_SPIRIT,
  [PrimeLocation.PHAZON_MINING_TUNNEL]: PrimeItem.ARTIFACT_OF_NEWBORN
};

const bossLocations = [
  PrimeLocation.SUNCHAMBER_FLAAHGRA,
  PrimeLocation.QUARANTINE_CAVE,
  PrimeLocation.ELITE_QUARTERS
];

const expansions: string[] = [
  PrimeItem.ENERGY_TANK,
  PrimeItem.MISSILE_EXPANSION,
  PrimeItem.POWER_BOMB_EXPANSION
];

/**
 * Generates and sets the item pool for a given world.
 * @param world The world to apply the item pool to.
 */
export function generateItemPool(world: PrimeWorld): void {
  const corePoolObj = getPoolCore(world);
  const pool = new PrimeItemCollection(corePoolObj.pool);
  const placedItems = corePoolObj.placedItems;

  world.setItemPool(pool);

  // Place items in the world, and lock their given locations
  for (const key of Object.keys(placedItems)) {
    const location = world.getLocationByKey(key);
    const item = placedItems[key];

    location.setItem(item);
    location.setLocked(true);
  }
}

/**
 * Builds an array of Item objects from a key-number pair map.
 *
 * @param map The item map to be processed.
 * @param priority Optional. If provided, all items in the resulting item array
 * will have their priority set to the given priority.
 */
export function mapToItemPool(map: ItemMap, priority?: ItemPriority): Item[] {
  const pool = [];

  for (const key of Object.keys(map)) {
    const item = primeItems[key].copy();
    if (priority || priority === ItemPriority.PROGRESSION) {
      item.setPriority(priority);
    }

    pool.push(...Array(map[key]).fill(item));
  }

  return pool;
}

/**
 * Gets the core item pool and placed items, applying mutators depending on what settings are provided.
 * @param world The world instance containing info such as settings and muatators.
 */
function getPoolCore(world: PrimeWorld): ItemsObject {
  const itemPool = getItemPoolBase();
  const numberOfLocations = world.getLocations().size();
  const settings = world.getSettings();
  const rng = world.getRng();

  const pool: Item[] = [];
  const placedItems: {
    [key: string]: Item;
  } = {};

  // Apply item overrides if needed
  for (let override of settings.itemOverrides.toArray()) {
    // Override the item count depending on the override state and if it's an expansion
    // If override is to be shuffled, get the new override count and apply it here.
    if (override.state === ItemOverrides.STATES.shuffled) {
      // The initial item pool only has one object entry for each item, so we can safely use index 0.
      itemPool[override.name][0].count = override.count;
    }
    // Handle non-shuffle states
    // If the override is an expansion, we leave the ammo pickups alone.
    // If the override is NOT an expansion, there is only one instance of the item. Remove it from the item pool if it's vanilla
    // Starting items will be handled in the next loop
    else if (!override.isExpansion && override.state === ItemOverrides.STATES.vanilla) {
      itemPool[override.name][0].count = 0;

      // add the vanilla item to placedItems under its vanilla location
      const location = Object.entries(vanillaUpgrades).find(([location, item]) => item === override.name)[0];
      placedItems[location] = primeItems[override.name];
    }
  }

  // Handle the starting items
  for (let [key, count] of Object.entries(world.getStartingItems())) {
    // Keep the expansions in the item pool. Only remove the upgrades.
    if (!expansions.includes(key)) {
      itemPool[key][0].count = 0;
    }
  }

  // If there are enough missiles, take some from the junk items pool
  // and put them in the always items pool to ensure the Tower of Light item can be reached
  // in a glitchless setting.
  const towerOfLightExpansions = itemPool[PrimeItem.MISSILE_LAUNCHER][0].count > 0 ? 7 : 8;

  if (itemPool[PrimeItem.MISSILE_EXPANSION][0].count >= towerOfLightExpansions) {
    itemPool[PrimeItem.MISSILE_EXPANSION].push({ count: towerOfLightExpansions, type: PoolType.ALWAYS });
    itemPool[PrimeItem.MISSILE_EXPANSION][0].count -= towerOfLightExpansions;
  }

  const alwaysItems = getItemMapFromItemPool(itemPool, PoolType.ALWAYS);
  const junkItems = getItemMapFromItemPool(itemPool, PoolType.JUNK);
  const artifactsItems = getItemMapFromItemPool(itemPool, PoolType.ARTIFACTS);

  // Push the alwaysItems and junkItems to the final item pool
  pool.push(...mapToItemPool(alwaysItems, ItemPriority.PROGRESSION));
  pool.push(...mapToItemPool(junkItems, ItemPriority.EXTRA));

  // Handle artifacts for item pool
  const artifactsPool = mapToItemPool(artifactsItems, ItemPriority.ARTIFACTS);
  switch (settings.goal) {
    case 'artifact-collection': {
      // Get random subset of artifacts if less than the maximum (12)
      if (settings.goalArtifacts < 12) {
        pool.push(...randomArray(artifactsPool, settings.goalArtifacts, rng));
      }
      // All 12 artifacts are used
      else {
        pool.push(...artifactsPool);
      }
      break;
    }
    case 'all-bosses': {
      // Fill boss locations with artifacts
      const artifacts = randomArray(artifactsPool, bossLocations.length, rng);

      bossLocations.forEach((location, index) => {
        placedItems[location] = artifacts[index];
      });
      break;
    }
  }

  const numberOfUnplacedLocations = numberOfLocations - Object.keys(placedItems).length;
  // The item pool should not have more items than the number of unplaced locations
  if (pool.length > numberOfUnplacedLocations) {
    throw new Error('Cannot set core item pool. There are more items to be placed than there are locations available. (' + pool.length + ' items, ' + numberOfUnplacedLocations + ' locations)');
  }

  // If the item pool has less than the number of unplaced locations, fill the remainder with junk items
  else if (pool.length < numberOfUnplacedLocations) {
    pool.push(...getJunkItems(world, numberOfUnplacedLocations - pool.length));
  }

  return { pool: pool, placedItems: placedItems };
}

/**
 * Generates an array of junk items and returns it.
 *
 * @param world The world object being processed.
 * @param size The requested size of the item array being returned.
 */
function getJunkItems(world: PrimeWorld, size: number): Item[] {
  const settings = world.getSettings();

  if (settings.junkItems === 'random-items') {
    const randomItems: Item[] = [];
    const filteredItemEntries = Object.entries(primeItems).filter(([key, item]) => item.getType() !== ItemType.ARTIFACT);

    for (let i = 0; i < size; i++) {
      randomItems.push(filteredItemEntries[Utilities.getRandomInt(0, filteredItemEntries.length, world.getRng())][1]);
    }

    // Item priority needs to be "extra"
    return randomItems.map(item => {
      item.setPriority(ItemPriority.EXTRA);
      return item;
    });
  }

  return mapToItemPool({
    [settings.junkItems]: size
  }, ItemPriority.EXTRA);
}

/**
 * Returns the default item pool state.
 *
 * This pool can be modified through item overrides during the item pool generation.
 */
function getItemPoolBase(): ItemPool {
  return {
    [PrimeItem.MISSILE_LAUNCHER]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.MORPH_BALL]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.MORPH_BALL_BOMB]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.BOOST_BALL]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.SPIDER_BALL]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.POWER_BOMB]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.POWER_BOMB_EXPANSION]: [{ count: 4, type: PoolType.ALWAYS }],
    [PrimeItem.VARIA_SUIT]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.GRAVITY_SUIT]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.PHAZON_SUIT]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.WAVE_BEAM]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.ICE_BEAM]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.PLASMA_BEAM]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.CHARGE_BEAM]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.SUPER_MISSILE]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.SCAN_VISOR]: [{ count: 0, type: PoolType.ALWAYS }],
    [PrimeItem.THERMAL_VISOR]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.XRAY_VISOR]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.SPACE_JUMP_BOOTS]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.GRAPPLE_BEAM]: [{ count: 1, type: PoolType.ALWAYS }],
    [PrimeItem.ENERGY_TANK]: [{ count: 14, type: PoolType.ALWAYS }],
    // Expansions and junk beam combos
    [PrimeItem.MISSILE_EXPANSION]: [
      // Initial state for missile expansions.
      // If there are enough missiles, some will be taken out and put into the
      // always pool for the Tower of Light glitchless item check.
      { count: 49, type: PoolType.JUNK }
    ],
    [PrimeItem.WAVEBUSTER]: [{ count: 1, type: PoolType.JUNK }],
    [PrimeItem.ICE_SPREADER]: [{ count: 1, type: PoolType.JUNK }],
    [PrimeItem.FLAMETHROWER]: [{ count: 1, type: PoolType.JUNK }],
    // Artifacts
    [PrimeItem.ARTIFACT_OF_TRUTH]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_STRENGTH]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_ELDER]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_WILD]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_LIFEGIVER]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_WARRIOR]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_CHOZO]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_NATURE]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_SUN]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_WORLD]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_SPIRIT]: [{ count: 1, type: PoolType.ARTIFACTS }],
    [PrimeItem.ARTIFACT_OF_NEWBORN]: [{ count: 1, type: PoolType.ARTIFACTS }],
  };
}

/**
 * Populates and returns an ItemMap object from the given item pool, and filters by the given pool type.
 *
 * @param pool The item pool to be processed.
 * @param type The pool type to filter by.
 */
function getItemMapFromItemPool(pool: ItemPool, type: PoolType) {
  const itemMap: ItemMap = {};
  for (let [key, objectArray] of Object.entries(pool)) {
    const poolObject = objectArray.find(item => item.type === type);

    if (poolObject) {
      itemMap[key] = poolObject.count;
    }
  }

  return itemMap;
}

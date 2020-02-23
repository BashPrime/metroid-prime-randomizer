import { PrimeItem } from '../../enums/primeItem';
import { Item } from '../item';
import { primeItems, ItemPriority } from './items';
import { PrimeLocation } from '../../enums/primeLocation';
import { PrimeWorld } from './world';
import { randomArray } from '../../utilities';
import { PrimeItemCollection } from './itemCollection';
import { ItemOverrides } from './itemOverrides';

export type ItemPool = Item[];
type ItemMap = { [key: string]: number };
type ItemsObject = {
  pool: ItemPool,
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
  [PrimeLocation.STORAGE_DEPOT_B]: PrimeItem.GRAPPLE_BEAM
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

function mapToItemPool(map: ItemMap, priority?: ItemPriority): ItemPool {
  const pool = [];

  for (const key of Object.keys(map)) {
    const item = primeItems[key].copy();
    if (priority) {
      item.setPriority(priority);
    }

    pool.push(...Array(map[key]).fill(item));
  }

  return pool;
}

/**
 * TOOD
 *
 * Refactor this function.
 *
 * Get the initial item bases, mutate based on item overrides. Do a more general handling of empty items if
 * the item pool is less than 100 items big (replace with nothing items)
 *
 * Improve handling of goal/artifact handling
 */
function getPoolCore(world: PrimeWorld): ItemsObject {
  const numberOfLocations = world.getLocations().size();
  const settings = world.getSettings();
  const rng = world.getRng();

  const pool: ItemPool = [];
  const placedItems: {
    [key: string]: Item;
  } = {};

  // Get alwaysItems, which we may be modifying later
  const alwaysItems = getAlwaysItemsBase();

  // Apply item overrides to alwaysItems if needed
  for (let override of settings.itemOverrides.toArray()) {
    // Override the item count depending on the override state
    alwaysItems[override.itemName] = override.state !== ItemOverrides.STATES.shuffled
      ? 0 // state is either vanilla or starting item
      : override.shuffle; // state is shuffle

    // If state is vanilla, set the item in its vanilla location and add to placedItems
    if (override.state === ItemOverrides.STATES.vanilla) {
      const location = Object.entries(vanillaUpgrades).find(([location, item]) => item === override.itemName)[0];
      placedItems[location] = primeItems[override.itemName];
    }
  }

  pool.push(...mapToItemPool(alwaysItems, ItemPriority.PROGRESSION));
  pool.push(...mapToItemPool(getJunkItemsBase(), ItemPriority.EXTRA));
  const artifactsPool = mapToItemPool(getArtifactsBase(), ItemPriority.EXTRA);

  // Handle artifacts for item pool
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
    throw new Error('Cannot set core item pool. There are more items to be placed than there are locations available.');
  }

  // If the item pool has less than the number of unplaced locations, fill the remainder with "Nothing" items
  else if (pool.length < numberOfUnplacedLocations) {
    pool.push(...mapToItemPool({
      [PrimeItem.NOTHING]: numberOfUnplacedLocations - pool.length
    }, ItemPriority.EXTRA));
  }

  return { pool: pool, placedItems: placedItems };
}

function getAlwaysItemsBase(): ItemMap {
  return {
    [PrimeItem.MISSILE_LAUNCHER]: 1,
    [PrimeItem.MISSILE_EXPANSION]: 7, // minimum number of expansions along with missile launcher for Tower of Light glitchless check
    [PrimeItem.MORPH_BALL]: 1,
    [PrimeItem.MORPH_BALL_BOMB]: 1,
    [PrimeItem.BOOST_BALL]: 1,
    [PrimeItem.SPIDER_BALL]: 1,
    [PrimeItem.POWER_BOMB]: 1,
    [PrimeItem.POWER_BOMB_EXPANSION]: 4,
    [PrimeItem.VARIA_SUIT]: 1,
    [PrimeItem.GRAVITY_SUIT]: 1,
    [PrimeItem.PHAZON_SUIT]: 1,
    [PrimeItem.WAVE_BEAM]: 1,
    [PrimeItem.ICE_BEAM]: 1,
    [PrimeItem.PLASMA_BEAM]: 1,
    [PrimeItem.CHARGE_BEAM]: 1,
    [PrimeItem.SUPER_MISSILE]: 1,
    [PrimeItem.THERMAL_VISOR]: 1,
    [PrimeItem.XRAY_VISOR]: 1,
    [PrimeItem.SPACE_JUMP_BOOTS]: 1,
    [PrimeItem.GRAPPLE_BEAM]: 1
  };
}

function getJunkItemsBase(): ItemMap {
  return {
    [PrimeItem.ENERGY_TANK]: 14,
    [PrimeItem.MISSILE_EXPANSION]: 42,
    [PrimeItem.WAVEBUSTER]: 1,
    [PrimeItem.ICE_SPREADER]: 1,
    [PrimeItem.FLAMETHROWER]: 1
  };
}

function getArtifactsBase(): ItemMap {
  return {
    [PrimeItem.ARTIFACT_OF_TRUTH]: 1,
    [PrimeItem.ARTIFACT_OF_STRENGTH]: 1,
    [PrimeItem.ARTIFACT_OF_ELDER]: 1,
    [PrimeItem.ARTIFACT_OF_WILD]: 1,
    [PrimeItem.ARTIFACT_OF_LIFEGIVER]: 1,
    [PrimeItem.ARTIFACT_OF_WARRIOR]: 1,
    [PrimeItem.ARTIFACT_OF_CHOZO]: 1,
    [PrimeItem.ARTIFACT_OF_NATURE]: 1,
    [PrimeItem.ARTIFACT_OF_SUN]: 1,
    [PrimeItem.ARTIFACT_OF_WORLD]: 1,
    [PrimeItem.ARTIFACT_OF_SPIRIT]: 1,
    [PrimeItem.ARTIFACT_OF_NEWBORN]: 1
  };
}

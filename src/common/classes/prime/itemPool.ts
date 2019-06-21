import { PrimeItem } from '../../enums/primeItem';
import { Item } from '../item';
import { primeItems, ItemPriority } from './items';
import { PrimeLocation } from '../../enums/primeLocation';
import { PrimeWorld } from './world';
import { randomArray } from '../../utilities';
import { PrimeItemCollection } from './itemCollection';

export type ItemPool = Item[];
type ItemMap = { [key: string]: number };
type ItemsObject = {
  pool: ItemPool,
  placedItems: { [key: string]: string };
}

function mapToItemPool(map: ItemMap, priority?: ItemPriority): ItemPool {
  const pool = [];

  for (const key of Object.keys(map)) {
    const item = primeItems[key];
    if (priority) {
      item.setPriority(priority);
    }

    pool.push(...Array(map[key]).fill(item));
  }

  return pool;
}

const alwaysItems: ItemPool = mapToItemPool({
  [PrimeItem.MISSILE_LAUNCHER]: 1,
  [PrimeItem.MISSILE_EXPANSION]: 7,
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
}, ItemPriority.PROGRESSION);

const junkItemsBase: ItemPool = mapToItemPool({
  [PrimeItem.ENERGY_TANK]: 14,
  [PrimeItem.MISSILE_EXPANSION]: 42
}, ItemPriority.EXTRA);

const artifactsBase: ItemPool = mapToItemPool({
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
}, ItemPriority.EXTRA);

const bossLocationNames: PrimeLocation[] = [
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
    const itemKey = placedItems[key];
    const item = primeItems[itemKey];

    location.setItem(item);
    location.setLocked(true);
  }
}


function getPoolCore(world: PrimeWorld): ItemsObject {
  const settings = world.getSettings();
  const rng = world.getRng();

  const pool = [];
  const placedItems = {};

  pool.push(...alwaysItems);
  pool.push(...junkItemsBase);

  // Handle artifacts for item pool
  switch (settings.goal) {
    case 'artifact-collection': {
      // Get random subset of artifacts, replace missing with missile expansions
      if (settings.goalArtifacts < 12) {
        pool.push(...randomArray(artifactsBase, settings.goalArtifacts, rng));
        pool.push(...mapToItemPool({
          [PrimeItem.MISSILE_EXPANSION]: 12 - settings.goalArtifacts
        }));
      }
      // All 12 artifacts are used
      else {
        pool.push(...artifactsBase);
      }
      break;
    }
    case 'all-bosses': {
      // Fill boss locations with artifacts
      const artifacts = randomArray(artifactsBase, bossLocationNames.length, rng);
      bossLocationNames.forEach((location, index) => {
        placedItems[location] = artifacts[index];
      });
      break;
    }
    case 'always-open': {
      // Replace all artifacts with missile expansions
      pool.push(...mapToItemPool({
        [PrimeItem.MISSILE_EXPANSION]: 12
      }));
    }
  }

  return { pool: pool, placedItems: placedItems };
}

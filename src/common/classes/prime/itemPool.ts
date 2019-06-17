import { PrimeItem } from '../../enums/primeItem';
import { primeItems } from './items';
import { PrimeLocation } from '../../enums/primeLocation';
import { PrimeWorld } from './world';
import { randomArray } from '../../utilities';

type ItemMap = { [key: string]: number };
type ItemPool = string[];

function mapToItemPool(map: ItemMap): ItemPool {
  const pool = [];

  for (const key of Object.keys(map)) {
    pool.push(...Array(map[key]).fill(key));
  }

  return pool;
}

const alwaysItems: ItemPool = mapToItemPool({
  [PrimeItem.MISSILE_LAUNCHER]: 1,
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
});

const junkItemsBase: ItemPool = mapToItemPool({
  [PrimeItem.ENERGY_TANK]: 14,
  [PrimeItem.MISSILE_EXPANSION]: 49
});

const artifactNamesBase: ItemPool = mapToItemPool({
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
});

const bossLocationNames: PrimeLocation[] = [
  PrimeLocation.SUNCHAMBER_FLAAHGRA,
  PrimeLocation.QUARANTINE_CAVE,
  PrimeLocation.ELITE_QUARTERS
];

export function generateItemPool(world: PrimeWorld): void {
  // stub for now
}


function getPoolCore(world: PrimeWorld) {
  // Stub for now
}

function getArtifactPool(world: PrimeWorld): ItemPool {
  const settings = world.getSettings();
  const rng = world.getRng();

  if (settings.goal === 'Artifact Collection') {
    if (settings.goalArtifacts < 12) {
      // Get random subset of artifacts
      return randomArray(artifactNamesBase, settings.goalArtifacts, rng);
    }

    return artifactNamesBase;
  } else if (settings.goal === 'All Bosses') {
    // Fill boss locations with artifacts and return empty array
    fillAllBossesWithArtifacts(world);
  }

  // This is also a catch all for Always Open
  return [];
}

function fillAllBossesWithArtifacts(world: PrimeWorld): void {
  const bossLocations = bossLocationNames.map(locationName => world.getLocationByKey(locationName));
  const rng = world.getRng();
  const artifacts = randomArray(artifactNamesBase, bossLocationNames.length, rng).map(artifactName => primeItems[artifactName] );

  bossLocations.forEach((location, index) => {
    location.setItem(artifacts[index]);
  });
}

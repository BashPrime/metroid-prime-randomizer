import { PrimeWorld } from './world';
import { primeLocations } from './locations';
import { PrimeRegion } from '../../enums/primeRegion';
import * as Utilities from '../../utilities';
import { PrimeLocation } from '../../enums/primeLocation';

export function setRules(world: PrimeWorld): void {
  const locations = world.getLocations();

  // Set excluded locations
  for (let key of world.getSettings().excludeLocations.toArray()) {
    locations.getLocationByKey(key).setExcluded(true);
  }

  // Automatically artifact temple from being in progression if goal is always open
  if (world.getSettings().goal === 'always-open') {
    locations.getLocationByKey(PrimeLocation.ARTIFACT_TEMPLE).setExcluded(true);
  }

  // Pre-fill Chozo Ruins randomly from 0-26 items to balance the logic
  nerfChozoLocations(world);
}

function nerfChozoLocations(world: PrimeWorld): void {
  const rng = world.getRng();

  const allChozoLocationNames = primeLocations.filter(location => location.region === PrimeRegion.CHOZO_RUINS)
    .map(location => location.name) as string[];
  const baseChozoLocations = world.getLocations().toArray().filter(location => {
    // Hive Totem needs to be open for most seeds, so don't include it in locations list
    return allChozoLocationNames.includes(location.getName()) && location.getName() !== PrimeLocation.HIVE_TOTEM && !location.hasItem() && !location.isExcluded()
  });
  // We are junk filling at most 75% (26 maximum) of the Chozo Ruins locations.
  const numberOfLocationsToNerf = Utilities.getRandomInt(0, Math.floor(allChozoLocationNames.length * 0.75), rng);

  // Get the Chozo locations we are going to fill
  const nerfedChozoLocations = Utilities.randomArray(baseChozoLocations, numberOfLocationsToNerf, rng);

  // Exclude the locations from progression
  for (const location of nerfedChozoLocations) {
    location.setExcluded(true);
  }
}

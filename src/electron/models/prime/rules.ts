import { PrimeWorld } from './world';
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
}

import { PrimeWorld } from './world';

export function setRules(world: PrimeWorld): void {
  // Set the root node of the world graph
  world.setRootRegion(world.getRegionByKey('Root'));

  const locations = world.getLocations();
  // Set excluded locations
  for (let key of world.getSettings().excludeLocations.toArray()) {
    locations.getLocationByKey(key).setExcluded(true);
  }
}

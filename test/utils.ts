import { PrimeRandomizerSettings } from '../src/electron/models/prime/randomizerSettings';
import { PrimeWorld } from '../src/electron/models/prime/world';
import { setEntrances } from '../src/electron/models/prime/entranceShuffle';

export function setUpWorld(settings: PrimeRandomizerSettings) {
  const world = new PrimeWorld(settings);
  world.loadRegions();
  world.setRootRegion(world.getRegionByKey('Root'));
  setEntrances(world);
  return world;
}
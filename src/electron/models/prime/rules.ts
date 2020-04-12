import { PrimeWorld } from './world';
import { primeLocations } from './locations';
import { primeItems } from './items';
import { PrimeRegion } from '../../enums/primeRegion';
import * as Utilities from '../../utilities';
import { PrimeLocation } from '../../enums/primeLocation';
import { ItemPriority } from './items';
import { Item } from '../item';
import { PrimeItem } from '../../enums/primeItem';

export function setRules(world: PrimeWorld): void {
  const locations = world.getLocations();

  // Set the root node of the world graph
  world.setRootRegion(world.getRegionByKey('Root'));

  // Set excluded locations
  for (let key of world.getSettings().excludeLocations.toArray()) {
    locations.getLocationByKey(key).setExcluded(true);
  }

  // Automatically artifact temple from being in progression if goal is always open
  if (world.getSettings().goal === 'always-open') {
    locations.getLocationByKey(PrimeLocation.ARTIFACT_TEMPLE).setExcluded(true);
  }

  // If the starting area is Chozo Transport North, automatically put Missile Launcher in Hive Totem to ensure the seed can be completed
  if (world.getStartingArea().id === 1) {
    const missileLauncher = primeItems[PrimeItem.MISSILE_LAUNCHER];
    locations.getLocationByKey(PrimeLocation.HIVE_TOTEM).setItem(missileLauncher);
    world.getItemPool().remove(missileLauncher);
  }
}

export function prefillChozoWithJunk(world: PrimeWorld): void {
  const rng = world.getRng();
  const baseItemPool = world.getItemPool();
  const junkItemPool = baseItemPool.shuffle(rng).filter((item: Item) => item.getPriority() === ItemPriority.EXTRA);

  const allChozoLocationNames = primeLocations.filter(location => location.region === PrimeRegion.CHOZO_RUINS)
    .map(location => location.name) as string[];
  const baseChozoLocations = world.getLocations().toArray().filter(location => {
    // Hive Totem needs to be open for most seeds, so don't include it in locations list
    return allChozoLocationNames.includes(location.getName()) && location.getName() !== PrimeLocation.HIVE_TOTEM && !location.hasItem()
  });
  // We are junk filling at most 75% (26) of the Chozo Ruins locations.
  const numberOfLocationsToFill = Utilities.getRandomInt(0, Math.floor(allChozoLocationNames.length * 0.75), rng);

  // Get the Chozo locations we are going to fill
  const junkChozoLocations = Utilities.randomArray(baseChozoLocations, numberOfLocationsToFill, rng);

  // Fill the locations, and trim the item pool
  for (const location of junkChozoLocations) {
    const itemToFill = junkItemPool.pop();
    location.setItem(itemToFill);
    baseItemPool.remove(itemToFill);
  }
}

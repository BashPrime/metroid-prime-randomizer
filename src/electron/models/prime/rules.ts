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

  // Exclude random early Chozo Ruins locations to balance the logic
  nerfEarlyChozoLocations(world);
}

function nerfEarlyChozoLocations(world: PrimeWorld): void {
  const rng = world.getRng();

  // Some otherwise "early" locations are excluded as they have significantly more item dependencies
  const earlyChozoLocationNames = [
    'Main Plaza (Half-Pipe)',
    'Main Plaza (Grapple Ledge)',
    'Main Plaza (Tree)',
    'Main Plaza (Locked Door)',
    'Ruined Shrine (Beetle Battle)',
    'Ruined Shrine (Half-Pipe)',
    'Ruined Shrine (Lower Tunnel)',
    'Vault',
    'Ruined Nursery',
    'Ruined Gallery (Missile Wall)',
    'Ruined Gallery (Tunnel)',
    'Transport Access North',
    'Gathering Hall',
    'Sunchamber (Flaahgra)',
    'Watery Hall Access',
    'Watery Hall (Scan Puzzle)',
    'Watery Hall (Underwater)',
    'Dynamo (Lower)',
    'Dynamo (Spider Track)',
    'Burn Dome (Tunnel)',
    'Burn Dome (I. Drone)',
    'Furnace (Tunnel)'
  ];

  const baseChozoLocations = world.getLocations().toArray().filter(location => {
    return earlyChozoLocationNames.includes(location.getName()) && !location.hasItem() && !location.isExcluded()
  });

  /*
   * Location excluding is as follows:
   * 1. Pick a random integer in a range from 25% to 50% of the available locations. This will be our minimum number.
   * 2. Pick a random integer in a range from 50% to 90% of the available locations. This will be our maximum number.
   * 3. Pick a random integer in a range from the chosen minimum and maximum numbers. This will be the number used.
   */
  const minimumLocations = Utilities.getRandomInt(Math.floor(earlyChozoLocationNames.length * 0.25), Math.floor(earlyChozoLocationNames.length * 0.50), rng);
  const maximumLocations = Utilities.getRandomInt(Math.floor(earlyChozoLocationNames.length * 0.50), Math.floor(earlyChozoLocationNames.length * 0.90), rng);

  // Pick a number from a range between 0 and 90% of the early locations
  const numberOfLocationsToNerf = Utilities.getRandomInt(minimumLocations, maximumLocations, rng);

  // Get the Chozo locations we are going to fill
  const nerfedChozoLocations = Utilities.randomArray(baseChozoLocations, numberOfLocationsToNerf, rng);

  // Exclude the locations from progression
  for (const location of nerfedChozoLocations) {
    location.setExcluded(true);
  }
}

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
  const earlyChozoLocationNames: string[] = [
    PrimeLocation.MAIN_PLAZA_HALF_PIPE,
    PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE,
    PrimeLocation.MAIN_PLAZA_TREE,
    PrimeLocation.MAIN_PLAZA_LOCKED_DOOR,
    PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE,
    PrimeLocation.RUINED_SHRINE_HALF_PIPE,
    PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL,
    PrimeLocation.VAULT,
    PrimeLocation.RUINED_NURSERY,
    PrimeLocation.RUINED_GALLERY_MISSILE_WALL,
    PrimeLocation.RUINED_GALLERY_TUNNEL,
    PrimeLocation.TRANSPORT_ACCESS_NORTH,
    PrimeLocation.GATHERING_HALL,
    PrimeLocation.SUNCHAMBER_FLAAHGRA,
    PrimeLocation.WATERY_HALL_ACCESS,
    PrimeLocation.WATERY_HALL_SCAN_PUZZLE,
    PrimeLocation.WATERY_HALL_UNDERWATER,
    PrimeLocation.DYNAMO_LOWER,
    PrimeLocation.DYNAMO_SPIDER_TRACK,
    PrimeLocation.BURN_DOME_TUNNEL,
    PrimeLocation.BURN_DOME_I_DRONE,
    PrimeLocation.FURNACE_TUNNEL
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

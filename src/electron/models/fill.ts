import { World } from './world';
import { LocationCollection } from './locationCollection';
import { ItemCollection } from './itemCollection';
import { Location } from './location';
import { Item } from './item';
import { PrimeItemCollection } from './prime/itemCollection';
import { primeLocations } from './prime/locations';
import { PrimeRegion } from '../enums/primeRegion';
import { SearchResults } from './searchResults';
import { PrimeRandomizerSettings } from './prime/randomizerSettings';
import { ItemType } from './prime/items';
import { PrimeItem } from '../enums/primeItem';

interface WeightedLocation {
  location: Location,
  weight: number
}

const majorLocations: string[] = primeLocations.filter(location => location.isMajor).map(location => location.name as string);
const minorLocations: string[] = primeLocations.filter(location => !location.isMajor).map(location => location.name as string);

export function fillRestrictive(world: World, itemPool: ItemCollection) {
  const rng = world.getRng();
  const totalItems = itemPool.size();

  while (itemPool.size() > 0) {
    // Take next item out of the item pool before searching the world for available locations to ensure completeability
    const itemToPlace = itemPool.pop();

    // Collect available placed progression items using the current item pool for accurate dependency checking
    // We are intentionally filtering to progression items to rule out the player collecting a junk missile expansion as their first source of progression
    const assumedItems = new PrimeItemCollection(world.collectItems(itemPool).toArray());

    // Run one more search with our assumed items to get the most up-to-date region checks
    const searchResults = world.searchRegions(assumedItems);

    // Get fillable, shuffled weighted locations
    const fillableWeightedLocations = getFillableWeightedLocations(searchResults, world, itemToPlace);

    // If there are none, we are out of locations to place
    if (!fillableWeightedLocations.length) {
      throw new RangeError('Game unbeatable: No more locations to place ' + itemToPlace.getName() + ' (' + itemPool.size() + '/' + totalItems + ' items remaining)');
    }

    // Pick a number in a range 0 - cumulative weight, then fill location with the item meeting that threshold
    const sumOfWeights = fillableWeightedLocations.map(location => location.weight).reduce((a, b) => a + b);
    const weightedSelection = Math.floor(rng.random() * sumOfWeights);

    let total = 0;
    for (let weightedLocation of fillableWeightedLocations) {
      total += weightedLocation.weight;

      if (total >= weightedSelection) {
        weightedLocation.location.setItem(itemToPlace);
        break;
      }
    }
  }
};

export function fillFast(world: World, locations: LocationCollection, itemPool: ItemCollection, allowExcludedLocations?: boolean) {
  const rng = world.getRng();
  const shuffledLocations = locations.shuffle(rng);

  for (let locationToFill of shuffledLocations.toArray()) {
    // Move on to the next location if the location already has an item, or is excluded and we're not allowing them
    if (locationToFill.hasItem() || (!allowExcludedLocations && locationToFill.isExcluded())) {
      continue;
    }

    let itemToPlace = itemPool.pop();

    // Exit the loop if there are no items left
    if (!itemToPlace) {
      break;
    }

    locationToFill.setItem(itemToPlace);
  }
};

function getFillableWeightedLocations(searchResults: SearchResults, world: World, itemToPlace: Item): WeightedLocation[] {
  const unfilledShuffledLocations = new LocationCollection(searchResults.getLocations().filter(location => {
    if ((world.getSettings() as PrimeRandomizerSettings).shuffleMode === 'major-minor') {
      const filteredLocations = itemToPlace.getType() === ItemType.EXPANSION && itemToPlace.getName() !== PrimeItem.ENERGY_TANK
        ? minorLocations : majorLocations;

      return !location.hasItem() && filteredLocations.includes(location.getName());
    }

    return !location.hasItem();
  })).shuffle(world.getRng()).toArray();
  const assumedItems = searchResults.getItems();
  const fillableLocations: Location[] = [];

  // Iterate through the unfilled locations
  for (const location of unfilledShuffledLocations) {
    const visitedRegion = searchResults.getVisitedRegion(location.getParentRegion());

    // This is the first check, to see if we can reach the location and get to (or fill it with) the item.
    const canFillLocation = !location.isExcluded() && !location.hasItem() && location.itemRule(assumedItems, world.getSettings());

    if (canFillLocation) {
      // If we can fill the item, run a search starting at the location's parent region to check if we can continue after filling it with the item.
      const searchResultsWithObtainedItem = world.searchRegions(new PrimeItemCollection([...assumedItems.toArray(), itemToPlace]), location.getParentRegion());

      // Get the region we came from to enter the current location's parent region
      const entryPointRegion = visitedRegion.entryPoint ? visitedRegion.entryPoint.getParentRegion() : null;

      // We're basically checking if we can leave the location's parent region via its original entry point, be it directly or indirectly.
      // This is to handle cases like Ventilation Shaft where you need more items to leave the way you came in than when you entered.
      if (!entryPointRegion || searchResultsWithObtainedItem.getVisitedRegion(entryPointRegion)) {
        fillableLocations.push(location);
      }
    }
  }

  // Don't bother assigning weights if there are no fillable locations
  if (!fillableLocations) {
    return [];
  }

  return getWeightedLocations(fillableLocations);
}

function getWeightedLocations(locations: Location[]): WeightedLocation[] {
  // Don't bother if there are no locations to begin with
  if (!locations.length) {
    return [];
  }

  const weightedLocations: WeightedLocation[] = [];
  const primeRegionWeights = {
    [PrimeRegion.TALLON_OVERWORLD]: 0,
    [PrimeRegion.CHOZO_RUINS]: 0,
    [PrimeRegion.MAGMOOR_CAVERNS]: 0,
    [PrimeRegion.PHENDRANA_DRIFTS]: 0,
    [PrimeRegion.PHAZON_MINES]: 0
  };

  const locationsWithRegions: { location: Location, region: string }[] = [];
  let numberOfRegionsAvailable = 0;

  // Assign regions to the locations
  for (const location of locations) {
    const region = primeLocations.find(primeLocation => primeLocation.name === location.getName()).region;
    locationsWithRegions.push({ location: location, region: region });
  }

  // Get the number of available regions for use in calculating the average.
  // If a region has no locations, it will not increment this number.
  for (const region of Object.keys(primeRegionWeights)) {
    if (locationsWithRegions.find(el => el.region === region)) {
      numberOfRegionsAvailable++;
    }
  }

  // Get the average number of locations per represented region.
  const averageLocationCount = locations.length / numberOfRegionsAvailable;

  // Get the total number of locations for each region, and divide the agerage against it to get the region's weight
  for (const region of Object.keys(primeRegionWeights)) {
    const numberOfRegionLocations = locationsWithRegions.filter(el => el.region === region).length;

    // Can't divide the average by zero
    if (numberOfRegionLocations > 0) {
      primeRegionWeights[region] = averageLocationCount / numberOfRegionLocations;
    }
  }

  // Build the weighted locations array
  for (const el of locationsWithRegions) {
    weightedLocations.push({
      location: el.location,
      weight: primeRegionWeights[el.region]
    });
  }

  return weightedLocations;
}

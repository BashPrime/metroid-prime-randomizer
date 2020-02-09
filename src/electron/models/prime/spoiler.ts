import { PrimeWorld } from './world';
import { elevatorTableBase, getElevatorsMap } from './entranceShuffle';
import { version } from '../../../../package.json';
import { primeLocations } from './locations';

export class Spoiler {
  info: {
    version: string;
    seed: string;
    hash: string[];
  };
  startingLocation: string;
  startingItems: { [key: string]: number };
  elevators: { [key: string]: string };
  locations: PrimeLocations;
  walkthrough: { [key: string]: string }[];

  static generateFromWorld(world: PrimeWorld): Spoiler {
    const spoiler = new Spoiler();

    // Set spoiler info
    spoiler.info = {
      version: version,
      seed: world.getSettings().seed,
      hash: []
    };

    // Set starting location
    spoiler.startingLocation = 'Landing Site';

    // Set starting items
    spoiler.startingItems = {};

    // Set elevator layout
    const elevatorLayout = world.getElevatorLayout() ? world.getElevatorLayout() : elevatorTableBase;
    spoiler.elevators = getElevatorsMap(elevatorLayout);

    // Set locations
    spoiler.locations = {
      ['Tallon Overworld']: {},
      ['Chozo Ruins']: {},
      ['Magmoor Caverns']: {},
      ['Phendrana Drifts']: {},
      ['Phazon Mines']: {}
    };

    for (let location of world.getLocations().toArray()) {
      const matchedRegion = primeLocations.find(location2 => location2.name === location.getName()).region;
      spoiler.locations[matchedRegion][location.getName()] = location.getItem().getName();
    }

    // Get the seed walkthrough
    spoiler.walkthrough = [];

    return spoiler;
  }
}

type PrimeLocations = {
  ['Tallon Overworld']: { [key: string]: string },
  ['Chozo Ruins']: { [key: string]: string },
  ['Magmoor Caverns']: { [key: string]: string },
  ['Phendrana Drifts']: { [key: string]: string },
  ['Phazon Mines']: { [key: string]: string }
};

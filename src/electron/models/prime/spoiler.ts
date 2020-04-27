import { PrimeWorld } from './world';
import { elevatorTableBase, getElevatorsMap } from './entranceShuffle';
import { version } from '../../../../package.json';
import { primeLocations } from './locations';

interface PrimeLocations {
  ['Tallon Overworld']: { [key: string]: string };
  ['Chozo Ruins']: { [key: string]: string };
  ['Magmoor Caverns']: { [key: string]: string };
  ['Phendrana Drifts']: { [key: string]: string };
  ['Phazon Mines']: { [key: string]: string };
}

export class Spoiler {
  ['Info']: {
    ['Version']: string;
    ['Seed']: string;
    ['Settings String']: string;
    ['Permalink']: string;
    ['Patcher Layout String']: string;
    ['Seed Hash']: string[];
  };
  ['Settings']: object;
  ['Starting Area']: string;
  ['Starting Items']: { [key: string]: number };
  ['Elevators']: { [key: string]: string };
  ['Locations']: PrimeLocations;
  ['Playthrough']: object[];

  static generateFromWorld(world: PrimeWorld): Spoiler {
    const spoiler = new Spoiler();

    // Set spoiler info
    spoiler['Info'] = {
      ['Version']: version,
      ['Seed']: world.getSettings().seed,
      ['Settings String']: world.getSettings().toSettingsString(),
      ['Permalink']: world.getSettings().toPermalink(),
      ['Patcher Layout String']: world.getRandomprimePatcherLayoutString(),
      ['Seed Hash']: world.getLayoutHash()
    };

    // Set settings
    // Blacklisting the exclude locations and allowed tricks objects as we'll be using arrays to show disabled/enabled fields.
    spoiler['Settings'] = world.getSettings().prettify(['seed', 'spoiler']);

    // Set starting area
    spoiler['Starting Area'] = world.getStartingArea().name;

    // Set starting items
    spoiler['Starting Items'] = world.getStartingItems();

    // Set elevator layout
    // Because we can use undefined elevator layouts for the patcher to quickly set the default layout, refer to the base table when undefined.
    const elevatorLayout = world.getElevatorLayout() ? world.getElevatorLayout() : elevatorTableBase;
    spoiler['Elevators'] = getElevatorsMap(elevatorLayout);

    // Set locations
    spoiler['Locations'] = {
      ['Tallon Overworld']: {},
      ['Chozo Ruins']: {},
      ['Magmoor Caverns']: {},
      ['Phendrana Drifts']: {},
      ['Phazon Mines']: {}
    };

    for (let location of world.getLocations().toArray()) {
      const matchedRegion = primeLocations.find(location2 => location2.name === location.getName()).region;
      spoiler['Locations'][matchedRegion][location.getName()] = location.getItem().getName();
    }

    // Get the seed playthrough
    spoiler['Playthrough'] = world.getPlaythrough();

    return spoiler;
  }
}

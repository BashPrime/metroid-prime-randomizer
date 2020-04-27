import { PrimeWorld } from './world';
import { getRandomInt } from '../../utilities';
import { MersenneTwister } from '../../mersenneTwister';
import { STARTING_AREA_LANDING_SITE, STARTING_AREA_RANDOM } from '../../../common/constants';
import { Elevator as ElevatorEnum } from '../../enums/elevator';

export interface Elevator {
  id: number;
  name: string;
  destination: number;
  region: Region;
}

export interface StartingArea {
  id: number;
  name: string;
  region: string;
}

interface ElevatorRegions {
  [key: string]: Elevator[],
}

enum Region {
  TALLON = 'tallon',
  CHOZO = 'chozo',
  MAGMOOR = 'magmoor',
  PHENDRANA = 'phendrana',
  MINES = 'mines'
}

export const startingAreas: StartingArea[] = [
  // Default
  { id: 20, name: ElevatorEnum.LANDING_SITE, region: ElevatorEnum.LANDING_SITE },
  { id: -1, name: 'Random', region: undefined },
  { id: 7, name: ElevatorEnum.ARTIFACT_TEMPLE, region:ElevatorEnum.ARTIFACT_TEMPLE },
  // Tallon
  { id: 6, name: ElevatorEnum.TALLON_NORTH, region: ElevatorEnum.TALLON_NORTH },
  { id: 8, name: ElevatorEnum.TALLON_EAST, region: ElevatorEnum.TALLON_EAST },
  { id: 9, name: ElevatorEnum.TALLON_WEST, region: ElevatorEnum.TALLON_WEST },
  { id: 10, name: ElevatorEnum.TALLON_SOUTH_CHOZO, region: ElevatorEnum.TALLON_SOUTH_CHOZO },
  { id: 11, name: ElevatorEnum.TALLON_SOUTH_MINES, region: ElevatorEnum.TALLON_SOUTH_MINES },
  // Chozo
  { id: 0, name: ElevatorEnum.CHOZO_WEST, region: ElevatorEnum.CHOZO_WEST },
  { id: 1, name: ElevatorEnum.CHOZO_NORTH, region: ElevatorEnum.CHOZO_NORTH },
  { id: 2, name: ElevatorEnum.CHOZO_EAST, region: ElevatorEnum.CHOZO_EAST },
  { id: 3, name: ElevatorEnum.CHOZO_SOUTH, region: ElevatorEnum.CHOZO_SOUTH },
  // Magmoor
  { id: 14, name: ElevatorEnum.MAGMOOR_NORTH, region: ElevatorEnum.MAGMOOR_NORTH },
  { id: 15, name: ElevatorEnum.MAGMOOR_WEST, region: ElevatorEnum.MAGMOOR_WEST },
  { id: 16, name: ElevatorEnum.MAGMOOR_EAST, region: ElevatorEnum.MAGMOOR_EAST },
  { id: 17, name: ElevatorEnum.MAGMOOR_SOUTH_MINES, region: ElevatorEnum.MAGMOOR_SOUTH_MINES },
  { id: 18, name: ElevatorEnum.MAGMOOR_SOUTH_PHENDRANA, region: ElevatorEnum.MAGMOOR_SOUTH_PHENDRANA },
  // Phendrana
  { id: 4, name: ElevatorEnum.PHENDRANA_NORTH, region: ElevatorEnum.PHENDRANA_NORTH },
  { id: 5, name: ElevatorEnum.PHENDRANA_SOUTH, region: ElevatorEnum.PHENDRANA_SOUTH },
  // Mines
  { id: 12, name: ElevatorEnum.MINES_EAST, region: ElevatorEnum.MINES_EAST },
  { id: 13, name: ElevatorEnum.MINES_WEST, region: ElevatorEnum.MINES_WEST }
  // { id: 19, name: 'Crater Entry Point' } // While a valid randomprime starting location, not using for the randomizer.
];

export const elevatorTableBase: Elevator[] = [
  // Tallon
  { id: 6, name: ElevatorEnum.TALLON_NORTH, destination: 0, region: Region.TALLON },
  { id: 8, name: ElevatorEnum.TALLON_EAST, destination: 2, region: Region.TALLON },
  { id: 9, name: ElevatorEnum.TALLON_WEST, destination: 16, region: Region.TALLON },
  { id: 10, name: ElevatorEnum.TALLON_SOUTH_CHOZO, destination: 3, region: Region.TALLON },
  { id: 11, name: ElevatorEnum.TALLON_SOUTH_MINES, destination: 12, region: Region.TALLON },
  // Chozo
  { id: 0, name: ElevatorEnum.CHOZO_WEST, destination: 6, region: Region.CHOZO },
  { id: 1, name: ElevatorEnum.CHOZO_NORTH, destination: 14, region: Region.CHOZO },
  { id: 2, name: ElevatorEnum.CHOZO_EAST, destination: 8, region: Region.CHOZO },
  { id: 3, name: ElevatorEnum.CHOZO_SOUTH, destination: 10, region: Region.CHOZO },
  // Magmoor
  { id: 14, name: ElevatorEnum.MAGMOOR_NORTH, destination: 1, region: Region.MAGMOOR },
  { id: 15, name: ElevatorEnum.MAGMOOR_WEST, destination: 4, region: Region.MAGMOOR },
  { id: 16, name: ElevatorEnum.MAGMOOR_EAST, destination: 9, region: Region.MAGMOOR },
  { id: 17, name: ElevatorEnum.MAGMOOR_SOUTH_MINES, destination: 13, region: Region.MAGMOOR },
  { id: 18, name: ElevatorEnum.MAGMOOR_SOUTH_PHENDRANA, destination: 5, region: Region.MAGMOOR },
  // Phendrana
  { id: 4, name: ElevatorEnum.PHENDRANA_NORTH, destination: 15, region: Region.PHENDRANA },
  { id: 5, name: ElevatorEnum.PHENDRANA_SOUTH, destination: 18, region: Region.PHENDRANA },
  // Mines
  { id: 12, name: ElevatorEnum.MINES_EAST, destination: 11, region: Region.MINES },
  { id: 13, name: ElevatorEnum.MINES_WEST, destination: 17, region: Region.MINES }
];

export const endgameTeleporters: Elevator[] = [
  { id: 7, name: ElevatorEnum.ARTIFACT_TEMPLE, destination: 19, region: Region.TALLON },
  { id: 19, name: ElevatorEnum.CRATER_ENTRY_POINT, destination: 7, region: undefined }
];

export function setEntrances(world: PrimeWorld): void {
  // Set up vanilla entrances and exits
  world.initializeEntrances();

  // Set the starting location (if needed)
  if (world.getSettings().startingArea !== STARTING_AREA_LANDING_SITE) {
    // Shuffle the starting point if the random option is used
    const startId = world.getSettings().startingArea === STARTING_AREA_RANDOM
      ? startingAreas[getRandomInt(0, startingAreas.length - 1, world.getRng())].id
      : world.getSettings().startingArea;

    const startingArea = startingAreas.find(area => area.id === startId);

    // Landing site could have been chosen randomly, only run if it wasn't chosen
    if (startingArea.id !== STARTING_AREA_LANDING_SITE) {
      world.applyStartingArea(startingArea);
    }
  }

  // Shuffle the elevators and apply them to the world instance (used for the patcher layout encoding)
  if (world.getSettings().elevatorShuffle) {
    // Get shuffled elevators, and append endgame artifact temple portal to ensure layout string encoding works
    const shuffledElevators = shuffleElevatorsTwoWay(world.getRng());
    world.applyElevatorLayout(shuffledElevators);
  }
}

/**
 * Shuffles the game's elevators bidirectionally.
 * @param rng Seeded random number generator, typically taken from a PrimeWorld instance
 */
function shuffleElevatorsTwoWay(rng: MersenneTwister): Elevator[] {
  const shuffledElevators = [];
  const availableElevators = copyElevatorList(elevatorTableBase);
  const elevatorsByRegion = getElevatorsByRegion(availableElevators);

  while (availableElevators.length) {
    // Get the region with the most unshuffled elevators
    const sourceRegion = Object.keys(elevatorsByRegion).reduce((a, b) => elevatorsByRegion[a].length > elevatorsByRegion[b].length ? a : b);
    const sourceElevators = elevatorsByRegion[sourceRegion];

    // The remaining elevators from the other regions are the destination/target elevators
    const targetElevators = availableElevators.filter(elevator => elevator.region !== sourceRegion);

    // Get the first elevator from the source elevators list
    const sourceElevator = sourceElevators[0];
    const targetElevator = targetElevators[getRandomInt(0, targetElevators.length - 1, rng)];

    // Connect source elevator to target elevator (and vice-versa)
    sourceElevator.destination = targetElevator.id;
    targetElevator.destination = sourceElevator.id;

    // Push source and target elevator to the shuffled elevators object
    shuffledElevators.push(sourceElevator);
    shuffledElevators.push(targetElevator);

    // Remove source and target elevators from the available list and from the worlds object
    availableElevators.splice(availableElevators.findIndex(elevator => elevator.id === sourceElevator.id), 1);
    availableElevators.splice(availableElevators.findIndex(elevator => elevator.id === targetElevator.id), 1);
    elevatorsByRegion[sourceElevator.region].splice(elevatorsByRegion[sourceElevator.region].findIndex(elevator => elevator.id === sourceElevator.id), 1);
    elevatorsByRegion[targetElevator.region].splice(elevatorsByRegion[targetElevator.region].findIndex(elevator => elevator.id === targetElevator.id), 1);
  }

  // Sort elevators back into base table order (mainly for spoiler output)
  const baseElevatorIds = elevatorTableBase.map(elevator => elevator.id);
  const sortedShuffledElevators = shuffledElevators.sort((a, b) => {
    const indexA = baseElevatorIds.indexOf(a.id);
    const indexB = baseElevatorIds.indexOf(b.id);

    if (indexA < indexB) return -1;
    else if (indexA > indexB) return 1;
    return 0;
  });

  return sortedShuffledElevators;
}

export function getElevatorsMap(elevators: Elevator[]): { [key: string]: string } {
  const map: { [key: string]: string } = {};

  for (let elevator of elevators) {
    const destination = elevators.find(elevator2 => elevator2.id === elevator.destination);
    map[elevator.name] = destination.name;
  }

  return map;
}

export function getLandingSiteArea(): StartingArea {
  return startingAreas.find(area => area.id === STARTING_AREA_LANDING_SITE);
}

function getElevatorsByRegion(elevators: Elevator[]): ElevatorRegions {
  const regions: ElevatorRegions = {
    [Region.TALLON]: [],
    [Region.CHOZO]: [],
    [Region.MAGMOOR]: [],
    [Region.PHENDRANA]: [],
    [Region.MINES]: []
  };

  // Iterate by base table order
  for (const elevator of elevators) {
    regions[elevator.region].push(elevator);
  }

  return regions;
}

function copyElevatorList(list: Elevator[]): Elevator[] {
  return JSON.parse(JSON.stringify(list)) as Elevator[];
}

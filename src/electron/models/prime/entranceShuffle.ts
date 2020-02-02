import { PrimeWorld } from './world';
import { getRandomInt } from '../../utilities';
import { MersenneTwister } from '../../mersenneTwister';

interface ElevatorRegions {
  [key: string]: Elevator[],
}

interface Elevator {
  id: number;
  name: string;
  destination: number;
  region: Region;
  shuffled?: boolean;
}

enum Region {
  TALLON = 'tallon',
  CHOZO = 'chozo',
  MAGMOOR = 'magmoor',
  PHENDRANA = 'phendrana',
  MINES = 'mines'
}

const elevatorTableBase: Elevator[] = [
  { id: 6, name: 'Tallon North', destination: 0, region: Region.TALLON },
  { id: 8, name: 'Tallon Overgrown Cavern', destination: 2, region: Region.TALLON },
  { id: 9, name: 'Tallon Root Cave', destination: 16, region: Region.TALLON },
  { id: 10, name: 'Tallon South Upper', destination: 3, region: Region.TALLON },
  { id: 11, name: 'Tallon South Lower', destination: 12, region: Region.TALLON },
  { id: 0, name: 'Chozo West', destination: 6, region: Region.CHOZO },
  { id: 1, name: 'Chozo Sun Tower', destination: 14, region: Region.CHOZO },
  { id: 2, name: 'Chozo Reflecting Pool', destination: 8, region: Region.CHOZO },
  { id: 3, name: 'Chozo Reflecting Pool', destination: 10, region: Region.CHOZO },
  { id: 14, name: 'Magmoor Lava Lake', destination: 1, region: Region.MAGMOOR },
  { id: 15, name: 'Magmoor First Half', destination: 4, region: Region.MAGMOOR },
  { id: 16, name: 'Magmoor Transport Tallon West', destination: 9, region: Region.MAGMOOR },
  { id: 17, name: 'Magmoor Second Half', destination: 13, region: Region.MAGMOOR },
  { id: 18, name: 'Magmoor Second Half', destination: 5, region: Region.MAGMOOR },
  { id: 4, name: 'Phendrana Shorelines', destination: 15, region: Region.PHENDRANA },
  { id: 5, name: 'Phendrana Transport Magmoor South', destination: 18, region: Region.PHENDRANA },
  { id: 12, name: 'Mines Upper', destination: 11, region: Region.MINES },
  { id: 13, name: 'Mines Central', destination: 17, region: Region.MINES }
];

export function setEntrances(world: PrimeWorld): void {
  // Set up vanilla entrances and exits
  world.initializeEntrances();

  if (world.getSettings().elevatorShuffle) {
    shuffleElevatorsTwoWay(world.getRng());
  }
}

function shuffleElevatorsTwoWay(rng: MersenneTwister): Elevator[] {
  const allElevators = copyElevatorList(elevatorTableBase).map(elevator => {
    elevator.shuffled = false;
    return elevator;
  });
  let availableElevators = copyElevatorList(allElevators);
  const elevatorsByRegion = getElevatorsByRegion();

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
    sourceElevator.shuffled = true;
    targetElevator.shuffled = true;

    // Remove elevators from the available list and from the worlds object
    availableElevators = availableElevators.filter(elevator => !elevator.shuffled);
    elevatorsByRegion[sourceElevator.region].filter(elevator => !elevator.shuffled);
    elevatorsByRegion[targetElevator.region].filter(elevator => !elevator.shuffled);
  }

  return allElevators;
}

function shuffleElevatorTable(rng: MersenneTwister): Elevator[] {
  // Add shuffled property for the loop later
  const elevatorTable = JSON.parse(JSON.stringify(elevatorTableBase)).map(elevator => {
    elevator.shuffled = false;
    return elevator;
  }) as Elevator[];
  const destinations = elevatorTable.map(elevator => elevator.destination);

  for (let elevator of elevatorTable) {
    if (!elevator.shuffled) {
      let destination: number;

      // Don't let the elevator destination be equal to its id
      do {
        destination = destinations[getRandomInt(0, destinations.length - 1, rng)];
      } while (destination === elevator.id);

      // Set the destinations bidirectionally for both this elevator, and its destination)
      elevator.destination = destination;
      const otherElevator = elevatorTable.find(elevator => elevator.id === destination);
      otherElevator.destination = elevator.id;

      // Mark elevators as shuffled
      elevator.shuffled = true;
      otherElevator.shuffled = true;

      // Remove destinations from destinations pool
      destinations.splice(destinations.indexOf(elevator.destination), 1);
      destinations.splice(destinations.indexOf(elevator.id), 1);
    }
  }

  return elevatorTable;
}

function getElevatorsByRegion(): ElevatorRegions {
  const regions: ElevatorRegions = {
    [Region.TALLON]: [],
    [Region.CHOZO]: [],
    [Region.MAGMOOR]: [],
    [Region.PHENDRANA]: [],
    [Region.MINES]: []
  };

  for (const elevator of elevatorTableBase) {
    regions[elevator.region].push(elevator);
  }

  return regions;
}

function copyElevatorList(list: Elevator[]): Elevator[] {
  return JSON.parse(JSON.stringify(list)) as Elevator[];
}

function shuffleRandomElevators(world: PrimeWorld): void {
  const shuffledElevatorTable = shuffleElevatorTable(world.getRng());
}

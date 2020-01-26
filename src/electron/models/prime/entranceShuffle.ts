import { PrimeWorld } from './world';
import { getRandomInt } from '../../utilities';
import { MersenneTwister } from '../../mersenneTwister';

interface Elevator {
  id: number;
  name: string;
  destination: number;
  shuffled?: boolean;
}

const elevatorShuffleTable: Elevator[] = [
  { id: 0, name: 'Chozo West', destination: 6 },
  { id: 1, name: 'Chozo Sun Tower', destination: 14 },
  { id: 2, name: 'Chozo Reflecting Pool', destination: 8 },
  { id: 3, name: 'Chozo Reflecting Pool', destination: 10 },
  { id: 4, name: 'Phendrana Shorelines', destination: 15 },
  { id: 5, name: 'Phendrana Transport Magmoor South', destination: 18 },
  { id: 6, name: 'Tallon North', destination: 0 },
  { id: 8, name: 'Tallon Overgrown Cavern', destination: 2 },
  { id: 9, name: 'Tallon Root Cave', destination: 16 },
  { id: 10, name: 'Tallon South Upper', destination: 3 },
  { id: 11, name: 'Tallon South Lower', destination: 12 },
  { id: 12, name: 'Mines Upper', destination: 11 },
  { id: 13, name: 'Mines Central', destination: 17 },
  { id: 14, name: 'Magmoor Lava Lake', destination: 1 },
  { id: 15, name: 'Magmoor First Half', destination: 4 },
  { id: 16, name: 'Magmoor Transport Tallon West', destination: 9 },
  { id: 17, name: 'Magmoor Second Half', destination: 13 },
  { id: 18, name: 'Magmoor Second Half', destination: 5 }
];

export function setEntrances(world: PrimeWorld): void {
  // Set up vanilla entrances and exits
  world.initializeEntrances();

  if (world.getSettings().elevatorShuffle) {
    shuffleRandomElevators(world);
  }
}

function shuffleElevatorTable(rng: MersenneTwister): Elevator[] {
  // Add shuffled property for the loop later
  const elevatorTable = JSON.parse(JSON.stringify(elevatorShuffleTable)).map(elevator => {
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

function shuffleRandomElevators(world: PrimeWorld): void {
  const shuffledElevatorTable = shuffleElevatorTable(world.getRng());
}

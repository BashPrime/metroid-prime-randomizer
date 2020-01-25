import { PrimeWorld } from './world';
import { getRandomInt } from '../../utilities';

interface Elevator {
  id: number;
  name: string;
  destination: number;
  shuffled?: boolean;
}

const elevatorShuffleTable: Elevator[] = [
  { id: 0, name: 'Chozo Ruins West (aka Transport to Tallon Overworld North)', destination: 6 },
  { id: 1, name: 'Chozo Ruins North (aka Transport to Magmoor Caverns North)', destination: 14 },
  { id: 2, name: 'Chozo Ruins East (aka Transport to Tallon Overworld East)', destination: 8 },
  { id: 3, name: 'Chozo Ruins South (aka Transport to Tallon Overworld South)', destination: 10 },
  { id: 4, name: 'Phendrana Drifts North (aka Transport to Magmoor Caverns West)', destination: 15 },
  { id: 5, name: 'Phendrana Drifts South (aka Transport to Magmoor Caverns South)', destination: 18 },
  { id: 6, name: 'Tallon Overworld North (aka Transport to Chozo Ruins West)', destination: 0 },
  { id: 8, name: 'Tallon Overworld East (aka Transport to Chozo Ruins East)', destination: 2 },
  { id: 9, name: 'Tallon Overworld West (aka Transport to Magmoor Caverns East)', destination: 16 },
  { id: 10, name: 'Tallon Overworld South (aka Transport to Chozo Ruins South)', destination: 3 },
  { id: 11, name: 'Tallon Overworld South (aka Transport to Phazon Mines East)', destination: 12 },
  { id: 12, name: 'Phazon Mines East (aka Transport to Tallon Overworld South)', destination: 11 },
  { id: 13, name: 'Phazon Mines West (aka Transport to Magmoor Caverns South)', destination: 17 },
  { id: 14, name: 'Magmoor Caverns North (aka Transport to Chozo Ruins North)', destination: 1 },
  { id: 15, name: 'Magmoor Caverns West (aka Transport to Phendrana Drifts North)', destination: 4 },
  { id: 16, name: 'Magmoor Caverns East (aka Transport to Tallon Overworld West)', destination: 9 },
  { id: 17, name: 'Magmoor Caverns South (aka Transport to Phazon Mines West)', destination: 13 },
  { id: 18, name: 'Magmoor Caverns South (aka Transport to Phendrana Drifts South)', destination: 5 }
];

export function setEntrances(world: PrimeWorld): void {
  // Set up vanilla entrances and exits
  world.initializeEntrances();

  if (world.getSettings().elevatorShuffle) {
    shuffleRandomElevators(world);
  }
}

function shuffleElevatorTable(): Elevator[] {
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
        destination = destinations[getRandomInt(0, destinations.length - 1)];
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
  const shuffledElevatorTable = shuffleElevatorTable();
}

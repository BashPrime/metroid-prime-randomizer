import { ItemCollection } from './itemCollection';

interface ElevatorArgs {
  name: string;
  destination?: Elevator;
};

export class Elevator {
  private name: string;
  private destination: Elevator;

  constructor(args: ElevatorArgs) {
    Object.assign(this, args);
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getDestination(): Elevator {
    return this.destination;
  }

  setDestination(destination: Elevator) {
    this.destination = destination;
  }

  canAccess: (items: ItemCollection) => boolean;
}

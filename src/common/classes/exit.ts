import { Region } from './region';
import { ItemCollection } from './itemCollection';

export interface ExitObject {
  [key: string]: (items?: ItemCollection) => boolean;
};

export class Exit {
  private name: string;
  private destination: Region;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getDestination(): Region {
    return this.destination;
  }

  setDestination(destination: Region) {
    this.destination = destination;
  }

  canExit: (items: ItemCollection) => boolean;
}

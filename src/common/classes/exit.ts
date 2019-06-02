import { Region } from './region';
import { ItemCollection } from './itemCollection';

export interface ExitObject {
  [key: string]: (items: ItemCollection) => boolean;
};

export class Exit {
  private destination: Region;

  constructor(destination: Region) {
    this.destination = destination;
  }

  getDestination(): Region {
    return this.destination;
  }

  setDestination(destination: Region) {
    this.destination = destination;
  }

  canExit: (items: ItemCollection) => boolean;
}

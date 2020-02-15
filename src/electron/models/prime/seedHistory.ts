import * as uuid from 'uuid';

import { GeneratedSeed } from '../../../common/models/generatedSeed';
import { PrimeWorld } from './world';
import * as Utilities from '../../utilities';

interface SeedObject {
  seed: GeneratedSeed,
  world?: PrimeWorld
}

interface HistoryObject {
  [id: string]: SeedObject;
}

export class SeedHistory {
  private seedHistory: HistoryObject = {};

  getSeedHistory(): HistoryObject {
    return this.seedHistory;
  }

  setSeedHistory(seedHistory: HistoryObject): void {
    this.seedHistory = seedHistory;
  }

  getSeedObject(id: string) {
    return this.seedHistory[id];
  }

  addSeedFromWorld(world: PrimeWorld): string {
    let newId: string;

    // Use a do-while to ensure the generated uuid is unique
    do {
      newId = uuid.v4();
    } while (this.seedHistory[newId]);

    this.seedHistory[newId] = {
      seed: {
        id: newId,
        seed: world.getSettings().seed,
        settingsString: world.getSettings().toSettingsString(),
        seedHash: world.getLayoutHash(),
        createdDate: new Date()
      },
      world: world
    };

    return newId;
  }

  deleteSeed(id: string): void {
    delete this.seedHistory[id];
  }

  /**
   * Returns the seed history with all world properties removed.
   */
  getPrunedSeedHistory(): HistoryObject {
    const prunedSeeds: HistoryObject = {};

    Object.entries(this.seedHistory).forEach(([id, seedObject]) => {
      prunedSeeds.id = Utilities.filterProperties(seedObject, ['world']) as SeedObject;
    });

    return prunedSeeds;
  }

  toJson(): string {
    return JSON.stringify(this.getPrunedSeedHistory(), null, '\t');
  }

  size(): number {
    return Object.keys(this.seedHistory).length;
  }

  static fromJson(json: string): SeedHistory {
    const history = new SeedHistory();
    history.setSeedHistory(JSON.parse(json) as HistoryObject);
    return history;
  }
}

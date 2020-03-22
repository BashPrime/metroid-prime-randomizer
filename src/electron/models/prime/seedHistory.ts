import * as uuid from 'uuid';

import { GeneratedSeed } from '../../../common/models/generatedSeed';
import { PrimeWorld } from './world';

interface SeedObject {
  seed: GeneratedSeed,
  world?: PrimeWorld
}

interface HistoryObject {
  [id: string]: SeedObject;
}

/**
 * Class to manage the seed history state for the application.
 */
export class SeedHistory {
  private seedHistory: HistoryObject = {};

  /**
   * Returns the internal seed history object.
   */
  getSeedHistory(): HistoryObject {
    return this.seedHistory;
  }

  /**
   * Sets the seed history object.
   * @param seedHistory The new seed history object to be set.
   */
  setSeedHistory(seedHistory: HistoryObject): void {
    this.seedHistory = seedHistory;
  }

  /**
   * Sets the seed history from a generated seed JSON string.
   * @param json The generated seed json to import (we are assuming it's coming from the app's seeds.json file)
   */
  setSeedHistoryFromJson(json: string): void {
    const seedHistory = JSON.parse(json, (key, value) => {
      if (key === 'createdDate') {
        return new Date(value);
      }

      return value;
    });

    this.seedHistory = seedHistory;
  }

  /**
   * Gets the seed object assigned the given ID.
   * @param id The id of the object to be retrieved
   */
  getSeedObject(id: string) {
    return this.seedHistory[id];
  }

  /**
 * Generates a seed object using a given PrimeWorld, and returns its ID.
 * @param world The world to be imported.
 */
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

  /**
   * Deletes the seed object assigned the given ID.
   * @param id The id of the seed object to be deleted.
   */
  deleteSeed(id: string): void {
    delete this.seedHistory[id];
  }

  /**
   * Returns the seed history with all world properties removed.
   */
  getPrunedSeedHistory(): HistoryObject {
    const prunedSeeds: HistoryObject = {};

    Object.entries(this.seedHistory).forEach(([id, seedObject]) => {
      prunedSeeds[id] = { seed: seedObject.seed };
    });

    return prunedSeeds;
  }

  /**
   * Serializes the seed history with pruned seed objects
   */
  toJson(): string {
    return JSON.stringify(this.getPrunedSeedHistory(), null, '\t');
  }

  /**
   * Returns an array of the generated seeds.
   */
  toGeneratedSeedArray(): GeneratedSeed[] {
    return this.size()
      ? Object.entries(this.seedHistory).map(([id, seedObject]) => {
        return seedObject.seed;
      })
      : [];
  }

  /**
   * Returns the number of seed objects in the history.
   */
  size(): number {
    return Object.keys(this.seedHistory).length;
  }

  static fromJson(json: string): SeedHistory {
    const history = new SeedHistory();
    history.setSeedHistory(JSON.parse(json) as HistoryObject);
    return history;
  }
}

import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { GeneratedSeed } from '../../common/models/generatedSeed';
import { PrimeGeneratedSeed } from '../models/prime/generatedSeed';

let seeds: SeedHistory;
const seedHistoryPath = path.join(app.getPath('userData'), 'seeds.json');

interface SeedHistory {
  [id: string]: PrimeGeneratedSeed
}

export function initialize() {
  // Request from renderer to get the seed history
  ipcMain.on('getSeedHistory', (event) => {
    if (!seeds) {
      readSeedHistoryFile(seedHistory => {
        Object.assign(seeds, seedHistory);
      });
    }

    event.sender.send('getSeedHistoryResponse', getClientSeedArray());
  });
}

export function writeSeedHistoryToFile(): void {
  if (Object.keys(seeds).length > 0) {
    const formattedSeeds = getClientSeedObject();
    fs.writeFile(seedHistoryPath, JSON.stringify(formattedSeeds, null, '\t'), 'utf8', null);
  }
}

function readSeedHistoryFile(callback): void {
  fs.readFile(seedHistoryPath, 'utf8', (err, seedHistoryJson) => {
    let seedHistoryData: SeedHistory = {};

    if (!err) {
      const rawData = JSON.parse(seedHistoryJson);
      for (const id of Object.keys(rawData)) {
        seedHistoryData[id] = PrimeGeneratedSeed.fromClientObject(rawData[id]);
      }
    }

    callback(seedHistoryData);
  });
}

function getClientSeedObject(): { [id: string]: GeneratedSeed } {
  const formattedSeeds = {};

  Object.entries(seeds).forEach(([id, seed]) => {
    formattedSeeds[id] = seed.toClientObject();
  });

  return formattedSeeds;
}

function getClientSeedArray(): GeneratedSeed[] {
  return Object.entries(seeds).map(([id, seed]) => seed.toClientObject());
}

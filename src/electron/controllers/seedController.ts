import { app, ipcMain } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

import { GeneratedSeed } from '../../common/models/generatedSeed';

const seedHistoryPath = path.join(app.getPath('userData'), 'seeds.json');
let seedHistory: GeneratedSeed[];

export function initialize() {
  // Request from renderer to get the seed history
  ipcMain.on('getSeedHistory', (event) => {
    if (!seedHistory) {
      seedHistory = getSeedHistoryFromFile();
    }

    event.sender.send('getSeedHistoryResponse', seedHistory);
  });

  ipcMain.on('addSeedToHistory', (event, seed) => {
    seedHistory.push(seed);
    event.sender.send('addSeedToHistoryResponse');
  });
}

function getSeedHistoryFromFile(): GeneratedSeed[] {
  if (!existsSync(seedHistoryPath)) {
    return [];
  }

  return JSON.parse(readFileSync(seedHistoryPath, 'utf8'));
}

export function writeSeedHistoryToFile() {
  if (seedHistory) {
    writeFileSync(seedHistoryPath, JSON.stringify(seedHistory), 'utf8');
  }
}

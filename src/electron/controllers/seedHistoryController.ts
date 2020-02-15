import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { SeedHistory } from '../models/prime/seedHistory';

export const seedHistory: SeedHistory = new SeedHistory();
const seedHistoryPath: string = path.join(app.getPath('userData'), 'seeds.json');
let historyFileHasBeenRead: boolean = false;

export function initialize() {
  // Request from renderer to get the seed history
  ipcMain.on('getSeedHistory', (event) => {
    if (!historyFileHasBeenRead) {
      readFromSeedHistoryFile(historyJson => {
        if (historyJson) {
          seedHistory.setSeedHistory(JSON.parse(historyJson));
        }
        historyFileHasBeenRead = true;
      });
    }

    event.sender.send('getSeedHistoryResponse', seedHistory.getPrunedSeedHistory());
  });
}

export function writeSeedHistoryToFile(): void {
  if (seedHistory.size() > 0) {
    fs.writeFile(seedHistoryPath, seedHistory.toJson(), 'utf8', null);
  }
}

function readFromSeedHistoryFile(callback: (json: string) => void): void {
  fs.readFile(seedHistoryPath, 'utf8', (err, seedHistoryJson) => {
    callback(seedHistoryJson);
  });
}

import { app, ipcMain } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

import { SeedHistory } from '../models/prime/seedHistory';

export const seedHistory: SeedHistory = new SeedHistory();
const seedHistoryPath: string = path.join(app.getPath('userData'), 'seeds.json');
const historyFileRead$ = new BehaviorSubject<boolean>(false);

export function initialize() {
  // Get the seed history from seeds.json first
  // readFromSeedHistoryFile();

  // Request from renderer to get the seed history
  ipcMain.on('getSeedHistory', (event) => {
    historyFileRead$.asObservable().pipe(take(1)).subscribe(fileRead => {
      if (fileRead) {
        event.sender.send('getSeedHistoryResponse', seedHistory.toGeneratedSeedArray());
      }
    });
  });
}

export function writeSeedHistoryToFile(): void {
  if (seedHistory.size() > 0) {
    fs.writeFile(seedHistoryPath, seedHistory.toJson(), 'utf8', err => {
      if (err) throw err;
    });
  }
}

function readFromSeedHistoryFile(): void {
  fs.readFile(seedHistoryPath, 'utf8', (err, seedHistoryJson) => {
    if (seedHistoryJson) {
      seedHistory.setSeedHistoryFromJson(seedHistoryJson);
    }

    historyFileRead$.next(true);
  });
}

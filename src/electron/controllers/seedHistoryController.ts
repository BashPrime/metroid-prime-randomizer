import { app, ipcMain } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

import { SeedHistory } from '../models/prime/seedHistory';
import { GeneratedSeed } from '../../common/models/generatedSeed';
import { PrimeWorld } from '../models/prime/world';
import { Spoiler } from '../models/prime/spoiler';

export const seedHistory: SeedHistory = new SeedHistory();
const seedHistoryDir: string = path.join(app.getPath('userData'), 'seed-history');
const historyFileRead$ = new BehaviorSubject<boolean>(false);

export function initialize() {
  // Create seed history folder if it does not exist
  fs.mkdirSync(seedHistoryDir, { recursive: true });

  // Request from renderer to get the seed history
  ipcMain.on('getSeedHistory', (event) => {
    historyFileRead$.asObservable().pipe(take(1)).subscribe(fileRead => {
      if (fileRead) {
        event.sender.send('getSeedHistoryResponse', seedHistory.toGeneratedSeedArray());
      }
    });
  });
}

export function writeSeedToHistory(seed: GeneratedSeed, world: PrimeWorld) {
  const seedJson = Spoiler.generateFromWorld(world).toJSON(!world.getSettings().spoiler);
  const fileName = getSeedHistoryDateString(seed.createdDate) + ' ' + seed.seedHash.toString().replace(/,+/g, ' ');
  const filePath = path.join(seedHistoryDir, fileName + '.json');

  fs.writeFile(filePath, seedJson, 'utf8', err => {
    if (err) throw err;
  });
}

function getSeedHistoryDateString(date: Date): string {
  const splitDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
  .toISOString()
  .split('T');

  return splitDateString[0] + '-' + splitDateString[1].replace(/:/g, '-').replace(/\.\d{3}Z/g, '');
}

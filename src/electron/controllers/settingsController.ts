import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RandomizerForm } from '../../common/models/randomizerForm';

let settings: RandomizerForm;
const settingsFileRead$ = new BehaviorSubject<boolean>(false);
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

export function initialize() {
  readFromSettingsFile();

  // Request from renderer to get settings file from main process
  ipcMain.on('getSettings', (event) => {
    settingsFileRead$.asObservable().pipe(take(1)).subscribe(fileRead => {
      if (fileRead) {
        event.sender.send('getSettingsResponse', settings);
      }
    });
  });

  ipcMain.on('applySettings', (event, newSettings) => {
    settings = newSettings;
  });
}

export function writeSettingsToFile() {
  if (settings) {
    fs.writeFile(settingsPath, JSON.stringify(settings, null, '\t'), 'utf8', err => {
      if (err) throw err;
    });
  }
}

function readFromSettingsFile(): void {
  fs.readFile(settingsPath, 'utf8', (err, settingsJson) => {
    if (settingsJson) {
      settings = JSON.parse(settingsJson);
    }

    settingsFileRead$.next(true);
  });
}

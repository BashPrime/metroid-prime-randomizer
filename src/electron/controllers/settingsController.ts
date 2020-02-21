import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RandomizerForm } from '../../common/models/randomizerForm';
import { PatchForm } from '../../common/models/patchForm';

let settings: RandomizerForm;
let patchSettings: PatchForm;

const settingsFileRead$ = new BehaviorSubject<boolean>(false);
const patchSettingsFileRead$ = new BehaviorSubject<boolean>(false);

const settingsPath = path.join(app.getPath('userData'), 'settings.json');
const patchSettingsPath = path.join(app.getPath('userData'), 'patch-settings.json');

export function initialize() {
  readFile(settingsPath, newSettings => {
    settings = newSettings;
    settingsFileRead$.next(true);
  });

  readFile(patchSettingsPath, newPatchSettings => {
    patchSettings = newPatchSettings;
    patchSettingsFileRead$.next(true);
  });

  // Request from renderer to get settings file from main process
  ipcMain.on('getSettings', (event) => {
    settingsFileRead$.asObservable().pipe(take(1)).subscribe(fileRead => {
      if (fileRead) {
        event.sender.send('getSettingsResponse', settings);
      }
    });
  });

  ipcMain.on('getPatchSettings', (event) => {
    patchSettingsFileRead$.asObservable().pipe(take(1)).subscribe(fileRead => {
      if (fileRead) {
        event.sender.send('getPatchSettingsResponse', patchSettings);
      }
    });
  });

  ipcMain.on('applySettings', (event, newSettings: RandomizerForm) => {
    settings = newSettings;
  });

  ipcMain.on('applyPatchSettings', (event, newPatchSettings: PatchForm) => {
    patchSettings = newPatchSettings;
  });
}

export function writeSettingsFiles() {
  // Write general settings if they exist
  if (settings) {
    fs.writeFile(settingsPath, JSON.stringify(settings, null, '\t'), 'utf8', err => {
      if (err) throw err;
    });
  }

  // Write patch settings if they exist
  if (patchSettings) {
    fs.writeFile(patchSettingsPath, JSON.stringify(patchSettings, null, '\t'), 'utf8', err => {
      if (err) throw err;
    });
  }
}

function readFile(path: string, callback: (settings: any) => void) {
  fs.readFile(path, 'utf8', (err, json) => {
    if (!err && json) {
      callback(JSON.parse(json));
    } else {
      callback(null);
    }
  });
}

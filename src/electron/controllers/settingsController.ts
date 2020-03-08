import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RandomizerForm } from '../../common/models/randomizerForm';
import { PatchForm } from '../../common/models/patchForm';

const settings$ = new BehaviorSubject<RandomizerForm>(undefined);
const patchSettings$ = new BehaviorSubject<PatchForm>(undefined);

const settingsPath = path.join(app.getPath('userData'), 'settings.json');
const patchSettingsPath = path.join(app.getPath('userData'), 'patch-settings.json');

export function initialize() {
  readFile(settingsPath, newSettings => {
    settings$.next(newSettings);
  });

  readFile(patchSettingsPath, newPatchSettings => {
    patchSettings$.next(newPatchSettings);
  });

  // Request from renderer to get settings file from main process
  ipcMain.on('getSettings', (event) => {
    settings$.asObservable().pipe(take(1)).subscribe(value => {
      if (value) {
        event.sender.send('getSettingsResponse', value);
      }
    });
  });

  ipcMain.on('getPatchSettings', (event) => {
    patchSettings$.asObservable().pipe(take(1)).subscribe(value => {
      if (value) {
        event.sender.send('getPatchSettingsResponse', value);
      }
    });
  });

  ipcMain.on('applySettings', (event, newSettings: RandomizerForm) => {
    settings$.next(newSettings);
  });

  ipcMain.on('applyPatchSettings', (event, newPatchSettings: PatchForm) => {
    patchSettings$.next(newPatchSettings);
  });
}

export function writeSettingsFiles() {
  // Write general settings if they exist
  if (settings$.getValue()) {
    fs.writeFile(settingsPath, JSON.stringify(settings$.getValue(), null, '\t'), 'utf8', err => {
      if (err) throw err;
    });
  }

  // Write patch settings if they exist
  if (patchSettings$.getValue()) {
    fs.writeFile(patchSettingsPath, JSON.stringify(patchSettings$.getValue(), null, '\t'), 'utf8', err => {
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

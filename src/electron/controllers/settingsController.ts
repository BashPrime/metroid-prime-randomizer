import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

const settingsPath = path.join(app.getPath('userData'), 'settings.json');
let settings: any;

export function initialize() {
  // Request from renderer to get settings file from main process
  ipcMain.on('getSettings', (event) => {
    readFromSettingsFile(settingsJson => {
      const fetchedSettings = {};
      if (settingsJson) {
        Object.assign(fetchedSettings, JSON.parse(settingsJson));
      }

      event.sender.send('getSettingsResponse', fetchedSettings);
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

function readFromSettingsFile(callback: (json: string) => void): void {
  fs.readFile(settingsPath, 'utf8', (err, seedHistoryJson) => {
    callback(seedHistoryJson);
  });
}

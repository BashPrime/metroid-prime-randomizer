import { app, ipcMain } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const filePath = path.join(app.getPath('userData'), 'settings.json');
let settings: any;

export function initialize() {
  console.log('Initializing save settings controller...');

  // Request from renderer to get settings file from main process
  ipcMain.on('electron/get-settings', (event) => {
    if (existsSync(filePath)) {
      const fetchedSettings = JSON.parse(readFileSync(filePath, 'utf8'));
      event.sender.send('renderer/fetched-settings', fetchedSettings);
    }
  });

  ipcMain.on('electron/apply-settings', (event, newSettings) => {
    settings = newSettings;
  });
}

export function writeSettingsFile() {
  if (settings) {
    writeFileSync(filePath, JSON.stringify(settings), 'utf8');
  }
}

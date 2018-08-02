import { app, ipcMain } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';


export class Settings {
  private settings: object;
  private filePath: string;

  constructor() {
    this.filePath = path.join(app.getPath('userData'), 'settings.json');

    // Request from renderer to get settings file from main process
    ipcMain.on('settings-get', (event, arg) => {
      if (existsSync(this.filePath)) {
        const newSettings = JSON.parse(readFileSync(this.filePath, 'utf8'));
        event.sender.send('new-settings', newSettings);
      }
    });

    ipcMain.on('settings-post', (event, settings) => {
      this.settings = settings;
    });
  }

  writeSettingsFile() {
    if (this.settings) {
      writeFileSync(this.filePath, JSON.stringify(this.settings), 'utf8');
    }
  }
}

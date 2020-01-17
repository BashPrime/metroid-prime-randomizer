import { ipcMain } from 'electron';

import * as presetsDefaultJson from '../data/presetsDefault.json';

export function initialize() {
  ipcMain.on('getDefaultPresets', (event) => {
    event.sender.send('getDefaultPresetsResponse', JSON.stringify(presetsDefaultJson), Object.keys(presetsDefaultJson));
  });
}

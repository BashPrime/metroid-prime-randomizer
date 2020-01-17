import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import * as presetsDefaultJson from '../data/presetsDefault.json';

const userPresetsPath = path.join(app.getPath('userData'), 'presets.json');

export function initialize() {
  ipcMain.on('getDefaultPresets', (event) => {
    const adjustedDefaults = JSON.parse(JSON.stringify(presetsDefaultJson));

    // Apply protected property to all default presets.
    for (let key of Object.keys(adjustedDefaults)) {
      adjustedDefaults[key].protected = true;
    }

    const response: PresetsResponse = {
      err: null,
      presets: adjustedDefaults,
      keys: Object.keys(adjustedDefaults)
    };

    event.sender.send('getDefaultPresetsResponse', response);
  });

  ipcMain.on('getUserPresets', (event) => {
    const userPresetsResponse = 'getUserPresetsResponse';

    fs.access(userPresetsPath, fs.constants.R_OK, (err) => {
      if (err) {
        event.sender.send(userPresetsResponse, {
          err: err,
          presets: {},
          keys: null
        } as PresetsResponse);
      } else {
        readUserPresetsFile(response => {
          event.sender.send(userPresetsResponse, response);
        });
      }
    });
  });
}

/**
 *
 * @param callback Callback function containing the repsonse data.
 */
function readUserPresetsFile(callback) {
  fs.readFile(userPresetsPath, 'utf8', (err, presets) => {
    console.log(presets);
    const response: PresetsResponse = {
      err: null,
      presets: {},
      keys: null
    };

    if (err) {
      response.err = err;
    } else {
      response.presets = JSON.parse(presets);
      response.keys = Object.keys(response.presets);
    }

    callback(response);
  });
}

interface PresetsResponse {
  err: NodeJS.ErrnoException;
  presets: any;
  keys: string[];
}

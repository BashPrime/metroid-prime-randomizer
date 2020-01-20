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

  ipcMain.on('updateUserPreset', (event, preset, key) => {
    // Read presets from file
    fs.readFile(userPresetsPath, 'utf8', (err, filePresets) => {
      // If file doesn't exist, create a new object and populate it
      const presets = !(err && err.code === 'ENOENT') ? JSON.parse(filePresets) : {};

      // Set preset object, regardless of whether it's new or not
      presets[key] = preset;

      // Write to file and return response
      writeUserPresetsFile(presets, response => {
        event.sender.send('updateUserPresetResponse', response);
      });
    });
  });

  ipcMain.on('removeUserPreset', (event, key) => {
    // Read presets from file
    fs.readFile(userPresetsPath, 'utf8', (err, filePresets) => {
      if (err) {
        event.sender.send('removeUserPresetResponse', {
          err: err,
          presets: null
        });
      } else {
        const presets = JSON.parse(filePresets);
        delete presets[key];

        writeUserPresetsFile(presets, response => {
          event.sender.send('removeUserPresetResponse', response);
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
    const response: PresetsResponse = {
      err: null,
      presets: null,
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

function writeUserPresetsFile(presets, callback) {
  fs.writeFile(userPresetsPath, JSON.stringify(presets, null, '\t'), 'utf8', (err) => {
    callback({
      err: err,
      presets: !err ? presets : null
    });
  });
}

interface PresetsResponse {
  err: NodeJS.ErrnoException;
  presets: any;
  keys: string[];
}

import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import * as presetsDefaultJson from '../data/presetsDefault.json';
import { PresetObject } from '../../common/models/presetObject';
import { RandomizerForm } from '../../common/models/randomizerForm';
import { Tricks } from '../models/prime/tricks';
import { ExcludeLocations } from '../models/prime/excludeLocations';

/** Stores all default and user-saved presets for quick reference. */
export const allPresets = {};
const userPresetsPath = path.join(app.getPath('userData'), 'presets.json');

export function initialize() {
  ipcMain.on('getDefaultPresets', (event) => {
    const adjustedDefaults = JSON.parse(JSON.stringify(presetsDefaultJson));

    // Apply protected property to all default presets.
    for (let key of Object.keys(adjustedDefaults)) {
      adjustedDefaults[key].protected = true;
    }

    // Add to allPresets object
    Object.assign(allPresets, adjustedDefaults);

    const response: PresetsResponse = {
      err: null,
      presets: adjustedDefaults,
      keys: Object.keys(adjustedDefaults)
    };

    event.sender.send('getDefaultPresetsResponse', response);
  });

  ipcMain.on('getUserPresets', (event, previousAction: string) => {
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
          // Add to allPresets object
          Object.assign(allPresets, response.presets);
          event.sender.send(userPresetsResponse, response, previousAction);
        });
      }
    });
  });

  ipcMain.on('updateUserPreset', (event, preset: RandomizerForm, key: string) => {
    // If preset has protected field, delete it
    if (preset.hasOwnProperty('protected')) {
      delete (preset as any).protected;
    }

    // Read presets from file
    fs.readFile(userPresetsPath, 'utf8', (err, filePresets) => {
      // If file doesn't exist, create a new object and populate it
      const presets = !(err && err.code === 'ENOENT') ? JSON.parse(filePresets) : {};

      // Set preset object, regardless of whether it's new or not
      presets[key] = preset;
      allPresets[key] = preset;

      // Write to file and return response
      writeUserPresetsFile(presets, response => {
        event.sender.send('updateUserPresetResponse', response);
      });
    });
  });

  ipcMain.on('removeUserPreset', (event, key: string) => {
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
        delete allPresets[key];

        writeUserPresetsFile(presets, response => {
          event.sender.send('removeUserPresetResponse', response);
        });
      }
    });
  });

  ipcMain.on('importPreset', (event, presetFilePath: string) => {
    fs.readFile(presetFilePath, 'utf8', (err, presetJson) => {
      if (err) {
        event.sender.send('importPresetError', err.code);
      } else {
        try {
          // Preset should only contain one entry
          const [key, preset] = Object.entries(JSON.parse(presetJson) as PresetObject)[0];
          event.sender.send('importPresetResponse', key, preset);
        } catch (err) {
          const error: Error = err;
          event.sender.send('importPresetError', error.message);
        }
      }
    });
  });

  ipcMain.on('exportPreset', (event, key: string, filePath: string) => {
    let presetToExport: PresetObject;

    if (allPresets[key]){
      presetToExport = { [key]: allPresets[key] };

      fs.writeFile(filePath, JSON.stringify(presetToExport, null, '\t'), 'utf8', (err) => {
        event.sender.send('exportPresetResponse', err ? err.code : null);
      });
    } else {
      event.sender.send('exportPresetResponse', 'The preset could not be found.');
    }
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
      response.presets = filterExcludeLocationsAndTricks(JSON.parse(presets) as PresetObject);
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

function filterExcludeLocationsAndTricks(presets: PresetObject): PresetObject {
  const excludeLocationKeys = new ExcludeLocations().getSettingsKeys();
  const trickKeys = new Tricks().getSettingsKeys();

  for (let [key, preset] of Object.entries(presets)) {
    preset.excludeLocations = preset.excludeLocations.filter(location => excludeLocationKeys.includes(location));
    preset.tricks = preset.tricks.filter(trick => trickKeys.includes(trick));
  }

  return presets;
}

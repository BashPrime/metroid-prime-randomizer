import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

import { getOutputFolder, getRandomizerFileNameNoExtension, getWorldFromSeedHistory } from './patcherController';
import { Spoiler } from '../models/prime/spoiler';
import { GeneratedSeed } from '../../common/models/generatedSeed';
import { PatchForm } from '../../common/models/patchForm';

export function initialize() {
  // Request from renderer to get settings file from main process
  ipcMain.on('saveSpoiler', (event, seed: GeneratedSeed, form: PatchForm) => {
    saveSpoiler(seed, form, err => {
      event.sender.send('saveSpoilerResponse', err);
    });
  });
}

function saveSpoiler(seed: GeneratedSeed, form: PatchForm, callback: (err: NodeJS.ErrnoException) => void) {
  const world = getWorldFromSeedHistory(seed.id);
  if (world.getSettings().spoiler) {
    // World was set with spoiler = true
    const spoiler = Spoiler.generateFromWorld(world);
    const outputFile = path.join(getOutputFolder(form), getRandomizerFileNameNoExtension(world) + ' - Spoiler.json');

    fs.writeFile(outputFile, JSON.stringify(spoiler, null, '\t'), 'utf8', err => {
      callback(err);
    });
  } else {
    // Don't generate spoiler if the spoiler flag is false. Just callback immediately
    callback(null);
  }
}

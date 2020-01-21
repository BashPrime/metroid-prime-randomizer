import { ipcMain, dialog, shell } from 'electron';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { exists } from 'fs';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings } from '../models/prime/randomizerSettings';
import * as Utilities from '../utilities';

let _seedQueue: any[] = [];
const seedQueue$ = new BehaviorSubject<any[]>([]);
const isProcessing$ = new BehaviorSubject<boolean>(false);

export function initialize() {
  ipcMain.on('getDefaultSettings', (event) => {
    event.sender.send('getDefaultSettingsResponse', new PrimeRandomizerSettings());
  });

  ipcMain.on('openOutputFolder', (event, outputFolder) => {
    let folder = outputFolder;
    if (!folder) {
      folder = Utilities.getRandomizerDocumentsPath();
    }

    openOutputFolder(folder);
  });
}

function openOutputFolder(path: string) {
  exists(path, (exists) => {
    if (exists) {
      shell.openItem(path);
    } else {
      dialog.showErrorBox('Error', 'The output folder is invalid or does not exist.');
    }
  });
}

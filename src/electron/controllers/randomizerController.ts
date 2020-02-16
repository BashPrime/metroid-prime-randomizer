import { ipcMain, dialog, shell } from 'electron';
import { exists } from 'fs';
import * as Utilities from '../utilities';

export function initialize() {
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

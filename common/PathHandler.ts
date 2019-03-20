import { shell, ipcMain } from 'electron';
import { existsSync } from 'fs';
import * as path from 'path';

export class PathHandler {
  constructor() {
    // Open folder if the client requests it
    ipcMain.on('open-file-path', (event, path) => {
      this.openPath(path);
    });
  }

  private openPath(path: string) {
    if (existsSync(path)) {
      shell.openItem(path);
    }
  }
}

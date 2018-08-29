import { Injectable } from '@angular/core';

import { remote, ipcMain, ipcRenderer, shell } from 'electron';
const { dialog } = remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  dialog = dialog;
  ipcRenderer = ipcRenderer;
  shell = shell;
  constructor() {}

  openExternalLink(url: string) {
    this.shell.openExternal(url);
  }
}

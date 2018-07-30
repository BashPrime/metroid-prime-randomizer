import { Injectable } from '@angular/core';

import { remote, ipcMain, ipcRenderer } from 'electron';
const { dialog } = remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  dialog = dialog;
  ipcRenderer = ipcRenderer;
  constructor() {}
}

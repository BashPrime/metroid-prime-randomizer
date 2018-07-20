import { Injectable } from '@angular/core';

import { remote } from 'electron';
const { dialog } = remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  dialog = dialog;
  constructor() {}
}

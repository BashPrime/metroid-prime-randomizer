import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private electronService: ElectronService) { }

  generateSeed() {
    this.electronService.ipcRenderer.send('generateSeed');
  }
}

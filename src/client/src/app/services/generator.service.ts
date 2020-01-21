import { Injectable, NgZone } from '@angular/core';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event) => {
      this.ngZone.run(() => {
        console.log('Seed generated');
      });
    });
  }

  generateGame(form: RandomizerForm, spoiler: boolean): void {
    this.electronService.ipcRenderer.send('generateSeed', form, spoiler);
  }
}

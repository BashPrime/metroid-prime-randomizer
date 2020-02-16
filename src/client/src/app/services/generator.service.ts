import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private generatedSeed$ = new BehaviorSubject<GeneratedSeed>(undefined);
  _generatedSeed = this.generatedSeed$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event, generatedSeed) => {
      this.ngZone.run(() => {
        this.generatedSeed$.next(generatedSeed);
      });
    });

    this.electronService.ipcRenderer.on('generateSeedError', (event, err) => {
      this.ngZone.run(() => {
        console.log('ERROR: ' + err);
      });
    });
  }

  generateGame(form: RandomizerForm, spoiler: boolean): void {
    this.electronService.ipcRenderer.send('generateSeed', form, spoiler);
  }

  importSeed(seed: string, settingsString: string) {
    this.electronService.ipcRenderer.send('importSeed', seed, settingsString);
  }
}

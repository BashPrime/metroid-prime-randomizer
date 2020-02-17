import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private generatedSeed$ = new BehaviorSubject<GeneratedSeed>(undefined);
  _generatedSeed = this.generatedSeed$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService, private toastr: ToastrService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event, generatedSeed) => {
      this.ngZone.run(() => {
        this.generatedSeed$.next(generatedSeed);
        this.toastr.success('Seed successfully generated.');
      });
    });

    this.electronService.ipcRenderer.on('generateSeedError', (event, err) => {
      this.ngZone.run(() => {
        console.log('ERROR: ' + err);
        this.toastr.error('The seed generation process ran into an error.');
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

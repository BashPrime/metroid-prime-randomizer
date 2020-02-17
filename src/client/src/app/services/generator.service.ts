import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private generatedSeed$ = new BehaviorSubject<GeneratedSeed>(undefined);
  _generatedSeed = this.generatedSeed$.asObservable();
  private seedIsCurrentlyGenerating$ = new BehaviorSubject<boolean>(false);
  _seedIsCurrentlyGenerating = this.seedIsCurrentlyGenerating$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService, private toastr: ToastrService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event, generatedSeed) => {
      this.ngZone.run(() => {
        this.seedIsCurrentlyGenerating$.next(false);
        this.generatedSeed$.next(generatedSeed);
        this.toastr.success('Seed successfully generated.');
      });
    });

    this.electronService.ipcRenderer.on('generateSeedError', (event, err) => {
      this.ngZone.run(() => {
        this.seedIsCurrentlyGenerating$.next(false);
        this.toastr.error('The seed generation process ran into an error.');
      });
    });
  }

  generateGame(form: RandomizerForm, spoiler: boolean): void {
    // Don't run if a seed is currently being generated
    if (!this.seedIsCurrentlyGenerating$.value) {
      this.seedIsCurrentlyGenerating$.next(true);
      this.electronService.ipcRenderer.send('generateSeed', form, spoiler);
    }
  }

  importPermalink(permalink: string) {
    if (!this.seedIsCurrentlyGenerating$.value) {
      let decodedItems: {
        seed: string;
        settingsString: string;
      };

      try {
        decodedItems = Utilities.parsePermalink(permalink);
      } catch (err) {
        this.toastr.error(err);
      }

      if (decodedItems) {
        this.seedIsCurrentlyGenerating$.next(true);
        this.electronService.ipcRenderer.send('importSeed', decodedItems.seed, decodedItems.settingsString);
      }
    }
  }
}

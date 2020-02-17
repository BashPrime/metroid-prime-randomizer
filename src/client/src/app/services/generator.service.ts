import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';

interface GenerationState {
  total: number;
  seeds: GeneratedSeed[];
  form?: RandomizerForm;
  spoiler?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private generatedSeeds$ = new BehaviorSubject<GeneratedSeed[]>(undefined);
  private currentGeneration$ = new BehaviorSubject<GenerationState>(undefined);
  _generatedSeeds = this.generatedSeeds$.asObservable();
  _currentGeneration = this.currentGeneration$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService, private toastr: ToastrService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event, generatedSeed: GeneratedSeed) => {
      this.ngZone.run(() => {
        const currentGeneration = this.currentGeneration$.value;
        currentGeneration.seeds.push(generatedSeed);

        if (currentGeneration.seeds.length < currentGeneration.total) {
          // We're not done generating seeds, generate another
          this.currentGeneration$.next(currentGeneration);
          this.electronService.ipcRenderer.send('generateSeed', currentGeneration.form, currentGeneration.spoiler);
        } else {
          // We're done!
          const seedOrSeeds = currentGeneration.total > 1 ? 'seeds' : 'seed';
          this.generatedSeeds$.next(currentGeneration.seeds);
          this.currentGeneration$.next(undefined);
          this.toastr.success(currentGeneration.total + ' ' + seedOrSeeds + ' successfully generated.');
        }
      });
    });

    this.electronService.ipcRenderer.on('generateSeedError', (event, err) => {
      this.ngZone.run(() => {
        this.currentGeneration$.next(undefined);
        this.toastr.error('The seed generation process ran into an error.');
      });
    });
  }

  generateGame(form: RandomizerForm, spoiler: boolean): void {
    // Don't run if a seed is currently being generated
    if (!this.currentGeneration$.value) {
      const generationCount = form.generationCount ? form.generationCount : 1;

      this.currentGeneration$.next({
        total: form.generationCount ? form.generationCount : 1,
        seeds: [],
        form: form,
        spoiler: spoiler
      });

      this.electronService.ipcRenderer.send('generateSeed', form, spoiler);
    }
  }

  importPermalink(permalink: string) {
    if (!this.currentGeneration$.value) {
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
        this.currentGeneration$.next({
          total: 1,
          seeds: []
        });

        this.electronService.ipcRenderer.send('importSeed', decodedItems.seed, decodedItems.settingsString);
      }
    }
  }
}

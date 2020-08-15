import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, generate } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';
import { ProgressService } from './progress.service';
import { PrimeRandomizerSettings } from '../../../../electron/models/prime/randomizerSettings';

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
  private spoiler$ = new BehaviorSubject<boolean>(false);
  private lastSettingsUsed$ = new BehaviorSubject<RandomizerForm>(undefined);
  _generatedSeeds = this.generatedSeeds$.asObservable();
  _currentGeneration = this.currentGeneration$.asObservable();
  _spoiler = this.spoiler$.asObservable();
  _lastSettingsUsed = this.lastSettingsUsed$.asObservable();

  constructor(
    private ngZone: NgZone,
    private electronService: ElectronService,
    private progressService: ProgressService,
    private toastrService: ToastrService) {
    this.electronService.ipcRenderer.on('generateSeedResponse', (event, generatedSeed: GeneratedSeed) => {
      this.ngZone.run(() => {
        const currentGeneration = this.currentGeneration$.value;
        currentGeneration.seeds.push(generatedSeed);

        if (currentGeneration.seeds.length < currentGeneration.total) {
          // We're not done generating seeds. Update the generation state and generate another seed

          // Update progress modal
          const currentProgressBars = this.progressService.progressBars$.getValue();
          Object.assign(currentProgressBars[0], {
            value: currentGeneration.seeds.length,
            label: (currentGeneration.seeds.length + 1) + ' / ' + currentGeneration.total + ':'
          });
          this.progressService.setProgressBars(currentProgressBars);

          this.currentGeneration$.next(currentGeneration);
          this.electronService.ipcRenderer.send('generateSeed', currentGeneration.form, currentGeneration.spoiler);
        } else {
          // We're done!
          const seedOrSeeds = currentGeneration.total > 1 ? 'seeds' : 'seed';
          this.lastSettingsUsed$.next(PrimeRandomizerSettings.fromSettingsString(generatedSeed.settingsString).toRandomizerForm());
          this.progressService.setOpen(false);
          this.generatedSeeds$.next(currentGeneration.seeds);
          this.currentGeneration$.next(undefined);
          this.toastrService.success('Generated ' + currentGeneration.total + ' ' + seedOrSeeds + '.');
        }
      });
    });

    this.electronService.ipcRenderer.on('generateSeedError', (event, err) => {
      this.ngZone.run(() => {
        this.currentGeneration$.next(undefined);
        this.progressService.setOpen(false);
        this.toastrService.error(err, null, {
          disableTimeOut: true
        });
      });
    });

    this.electronService.ipcRenderer.on('importSeedResponse', (event, generatedSeed: GeneratedSeed, spoiler: boolean) => {
      this.ngZone.run(() => {
        this.lastSettingsUsed$.next(PrimeRandomizerSettings.fromSettingsString(generatedSeed.settingsString).toRandomizerForm());
        this.progressService.setOpen(false);
        this.spoiler$.next(spoiler);
        this.generatedSeeds$.next([generatedSeed]);
        this.toastrService.success('Imported the permalink successfully.');
      });
    });
  }

  generateGame(form: RandomizerForm, spoiler: boolean): void {
    // Set spoiler flag
    this.spoiler$.next(spoiler);

    // Don't run if a seed is currently being generated
    if (!this.currentGeneration$.value) {
      const generationCount = form.generationCount ? form.generationCount : 1;

      this.currentGeneration$.next({
        total: generationCount,
        seeds: [],
        form: form,
        spoiler: spoiler
      });

      this.progressService.setTitle('Generating Seed');
      this.progressService.setMessage('Generating world...');
      this.progressService.setProgressBars([
        {
          total: generationCount,
          value: null,
          label: '1 / ' + generationCount + ':'
        }
      ]);

      this.progressService.setOpen(true);
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
        this.toastrService.error(err.message, null, {
          disableTimeOut: true
        });
      }

      if (decodedItems) {
        this.progressService.setTitle('Importing Permalink');
        this.progressService.setMessage('Generating world...');
        this.progressService.setProgressBars([
          {
            total: 1,
            value: null,
            label: '1 / 1:'
          }
        ]);

        this.progressService.setOpen(true);
        this.electronService.ipcRenderer.send('importSeed', decodedItems.seed, decodedItems.settingsString);
      }
    }
  }
}

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProgressService } from './progress.service';
import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import { PatchForm } from '../../../../common/models/patchForm';
import { PatcherMessage } from '../../../../common/models/patcherMessage';

interface PatchState {
  seeds: GeneratedSeed[];
  patchedSeeds: GeneratedSeed[];
  currentSeed: GeneratedSeed;
  form: PatchForm;
}

@Injectable({
  providedIn: 'root'
})
export class PatcherService {
  private currentPatch$: BehaviorSubject<PatchState> = new BehaviorSubject<PatchState>(undefined);
  _currentPatch = this.currentPatch$.asObservable();

  constructor(
    private ngZone: NgZone, private electronService: ElectronService,
    private progressService: ProgressService, private toastrService: ToastrService
  ) {
    this.electronService.ipcRenderer.on('patchMessage', (event, message: PatcherMessage) => {
      this.ngZone.run(() => {
        this.handlePatchMessage(message);
      });
    });

    this.electronService.ipcRenderer.on('saveSpoilerResponse', (event, err: NodeJS.ErrnoException) => {
      this.ngZone.run(() => {
        this.handleSpoilerResponse(err);
      });
    });
  }

  patchIsos(seeds: GeneratedSeed[], form: PatchForm): void {
    if (!this.currentPatch$.getValue()) {
      // Set up patch state and begin the patch process
      this.currentPatch$.next({
        seeds: seeds,
        patchedSeeds: [],
        currentSeed: seeds[0],
        form: form
      });

      // Set progress bar modal
      this.progressService.setTitle('Saving Seed');
      this.progressService.setMessage('Starting patcher.');
      this.progressService.setProgressBars([
        {
          total: 100,
          value: 0,
          label: '1 / ' + seeds.length + ':',
          class: 'is-info'
        },
        {
          total: seeds.length * 100,
          value: 0,
          label: 'Total:',
          class: 'is-link'
        }
      ]);

      // Begin patching with first seed in the array
      this.progressService.setOpen(true);
      this.electronService.ipcRenderer.send('patchIso', seeds[0], form);
    }
  }

  saveSpoilers(seeds: GeneratedSeed[], form: PatchForm) {
    // Only save if current patch state isn't already defined
    if (!this.currentPatch$.getValue()) {
      this.currentPatch$.next({
        seeds: seeds,
        patchedSeeds: [],
        currentSeed: seeds[0],
        form: form
      });

      // Set progress bar modal
      this.progressService.setTitle('Saving Spoiler');
      this.progressService.setMessage('Saving...');
      this.progressService.setProgressBars([
        {
          total: seeds.length,
          value: 0,
          label: '1 / ' + seeds.length + ':',
        }
      ]);

      // Begin saving with first seed in the array
      this.progressService.setOpen(true);
      this.electronService.ipcRenderer.send('saveSpoiler', seeds[0], form);
    }
  }

  private handlePatchMessage(message: PatcherMessage): void {
    // Update progress bar info
    const patchState = this.currentPatch$.getValue();
    const currentProgressBars = this.progressService.progressBars$.getValue();

    if (message.percent) {
      Object.assign(currentProgressBars[0], {
        value: message.percent
      });
      Object.assign(currentProgressBars[1], {
        value: (patchState.patchedSeeds.length * 100) + message.percent,
      });
    }

    switch (message.type) {
      case 'success': {
        this.handleStateChange();
        break;
      }
      case 'error': {
        this.toastrService.error(message.msg, null, {
          disableTimeOut: true
        });
        this.currentPatch$.next(undefined);
        this.progressService.setOpen(false);
        break;
      }
      default: {
        this.progressService.setMessage(message.msg);
      }
    }

    if (message.type !== 'error') {
      this.progressService.setProgressBars(currentProgressBars);
    }
  }

  private handleStateChange(): void {
    const patchState = this.currentPatch$.getValue();
    patchState.patchedSeeds.push(patchState.currentSeed);

    if (patchState.patchedSeeds.length < patchState.seeds.length) {
      // We're not done patching seeds. Update the patch state and continue patching

      // Update progress bar label
      const currentProgressBars = this.progressService.progressBars$.getValue();
      Object.assign(currentProgressBars[0], {
        label: (patchState.patchedSeeds.length + 1) + ' / ' + patchState.seeds.length + ':',
        value: 0
      });
      this.progressService.setProgressBars(currentProgressBars);

      patchState.currentSeed = patchState.seeds[patchState.patchedSeeds.length];
      this.electronService.ipcRenderer.send('patchIso', patchState.currentSeed, patchState.form);
    } else {
      // We're done!
      const msg = patchState.patchedSeeds.length + ' '
        + (patchState.patchedSeeds.length > 1
          ? 'seeds have been saved and are'
          : 'seed has been saved and is')
        + ' ready to play! Check your output folder.';

      this.progressService.setOpen(false);
      this.currentPatch$.next(undefined);
      this.toastrService.success(msg);
    }
  }

  private handleSpoilerResponse(err: NodeJS.ErrnoException) {
    if (err) {
      this.toastrService.error('Encountered an error saving spoiler(s): ' + err.code, null, {
        disableTimeOut: true
      });
      this.currentPatch$.next(undefined);
      this.progressService.setOpen(false);
    } else {
      const patchState = this.currentPatch$.getValue();
      patchState.patchedSeeds.push(patchState.currentSeed);

      if (patchState.patchedSeeds.length < patchState.seeds.length) {
        // We're not done saving spoilers. Update the patch state and continue saving spoiler logs

        // Update progress bar label
        const currentProgressBars = this.progressService.progressBars$.getValue();
        Object.assign(currentProgressBars[0], {
          label: (patchState.patchedSeeds.length + 1) + ' / ' + patchState.seeds.length + ':',
          value: patchState.seeds.length
        });
        this.progressService.setProgressBars(currentProgressBars);

        patchState.currentSeed = patchState.seeds[patchState.patchedSeeds.length];
        this.electronService.ipcRenderer.send('saveSpoiler', patchState.currentSeed, patchState.form);
      } else {
        // We're done!
        const msg = 'Saved ' + patchState.patchedSeeds.length + ' spoiler '
          + (patchState.patchedSeeds.length > 1
            ? 'logs'
            : 'log')
          + '.';

        this.progressService.setOpen(false);
        this.currentPatch$.next(undefined);
        this.toastrService.success(msg);
      }
    }
  }
}

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
  }

  patchIsos(seeds: GeneratedSeed[], form: PatchForm): void {
    if (!this.currentPatch$.value) {
      // Set up patch state and begin the patch process
      this.currentPatch$.next({
        seeds: seeds,
        patchedSeeds: [],
        currentSeed: seeds[0],
        form: form
      });

      // Set progress bar modal
      this.progressService.setTitle('Patching ' + seeds.length + ' Seeds');
      this.progressService.setProgressBars([
        {
          total: 100,
          current: 0,
          text: null
        },
        {
          total: seeds.length * 100,
          current: 0,
          text: 'Total'
        }
      ]);

      // Begin patching with first seed in the array
      this.progressService.setOpen(true);
      this.electronService.ipcRenderer.send('patchIso', seeds[0], form);
    }
  }

  private handlePatchMessage(message: PatcherMessage): void {
    // Update progress bar info
    const patchState = this.currentPatch$.value;
    const currentProgressBars = this.progressService.progressBars$.getValue();

    if (message.percent) {
      Object.assign(currentProgressBars[0], {
        current: message.percent
      });
      Object.assign(currentProgressBars[1], {
        current: (patchState.patchedSeeds.length * 100) + message.percent,
      });
    }

    switch (message.type) {
      case 'success': {
        this.handlePatchState();
        break;
      }
      case 'error': {
        this.toastrService.error(message.msg);
        this.currentPatch$.next(undefined);
        this.progressService.setOpen(false);
        break;
      }
      default: {
        Object.assign(currentProgressBars[0], {
          text: message.msg
        });
      }
    }

    if (message.type !== 'error') {
      this.progressService.setProgressBars(currentProgressBars);
    }
  }

  private handlePatchState(): void {
    const patchState = this.currentPatch$.value;
    patchState.patchedSeeds.push(patchState.currentSeed);

    if (patchState.patchedSeeds.length < patchState.seeds.length) {
      // We're not done patching seeds. Update the patch state and continue patching
      patchState.currentSeed = patchState.seeds[patchState.patchedSeeds.length];
      this.electronService.ipcRenderer.send('patchIso', patchState.currentSeed, patchState.form);
    } else {
      // We're done!
      this.progressService.setOpen(false);
      this.currentPatch$.next(undefined);
      this.toastrService.success('Successfully patched ' + patchState.seeds + ' seeds.');
    }
  }
}

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProgressService } from './progress.service';
import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import { PatchForm } from '../../../../common/models/patchForm';

interface PatchMessage {
  type: string;
  percent: number;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatcherService {
  private currentPatch$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _currentPatch = this.currentPatch$.asObservable();

  constructor(
    private ngZone: NgZone, private electronService: ElectronService,
    private progressService: ProgressService, private toastrService: ToastrService) {
    this.electronService.ipcRenderer.on('patchMessage', (event, message: PatchMessage) => {
      this.ngZone.run(() => {
        this.handlePatchMessage(message);
      });
    });
  }

  patchIso(seed: GeneratedSeed, form: PatchForm): void {
    if (!this.currentPatch$.value) {
      this.currentPatch$.next(true);
      this.electronService.ipcRenderer.send('patchIso', seed, form);
    }
  }

  private handlePatchMessage(message: PatchMessage) {
    console.log(message);

    switch (message.type) {
      case 'success': {
        this.toastrService.success('Successfully patched the seed.');
        this.currentPatch$.next(false);
        break;
      }
      case 'error': {
        this.toastrService.error(message.msg);
        this.currentPatch$.next(false);
      }
    }
  }
}

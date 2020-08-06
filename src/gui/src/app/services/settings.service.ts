import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { PatchForm } from '../../../../common/models/patchForm';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings$ = new BehaviorSubject<RandomizerForm>(undefined);
  private patchSettings$ = new BehaviorSubject<PatchForm>(undefined);
  _settings = this.settings$.asObservable();
  _patchSettings = this.patchSettings$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getSettingsResponse', (event, settings: RandomizerForm) => {
      this.ngZone.run(() => {
        this.settings$.next(settings);
      });
    });

    this.electronService.ipcRenderer.on('getPatchSettingsResponse', (event, settings: PatchForm) => {
      this.ngZone.run(() => {
        this.patchSettings$.next(settings);
      });
    });
  }

  getSettings(): void {
    this.electronService.ipcRenderer.send('getSettings');
  }

  applySettings(settings: RandomizerForm): void {
    this.electronService.ipcRenderer.send('applySettings', settings);
  }

  getPatchSettings(): void {
    this.electronService.ipcRenderer.send('getPatchSettings');
  }

  applyPatchSettings(settings: PatchForm) {
    this.electronService.ipcRenderer.send('applyPatchSettings', settings);
  }
}

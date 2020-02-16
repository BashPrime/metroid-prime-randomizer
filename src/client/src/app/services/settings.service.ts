import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './electron.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings$ = new BehaviorSubject<RandomizerForm>(undefined);
  _settings = this.settings$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getSettingsResponse', (event, settings) => {
      this.ngZone.run(() => {
        this.settings$.next(settings);
      });
    });
  }

  getSettings(): void {
    this.electronService.ipcRenderer.send('getSettings');
  }

  applySettings(settings: RandomizerForm): void {
    this.electronService.ipcRenderer.send('applySettings', settings);
  }
}

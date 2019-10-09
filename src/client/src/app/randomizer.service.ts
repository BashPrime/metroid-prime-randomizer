import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  randomizerSettings$ = new BehaviorSubject<any>(undefined);

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getDefaultSettingsResponse', (event, defaultSettings) => {
      this.ngZone.run(() => {
        this.randomizerSettings$.next(defaultSettings);
      });
    });
  }

  getDefaultSettings() {
    this.electronService.ipcRenderer.send('getDefaultSettings');
  }
}

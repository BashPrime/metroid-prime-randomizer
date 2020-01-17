import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { ElectronService } from './electron.service';
import { PresetObject } from '../../../../common/models/presetObject';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  selectedTabId$ = new Subject<number>();
  defaultPresets$ = new Subject<PresetObject>();

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getDefaultPresetsResponse', (event, defaultPresets: PresetObject, keys: string[]) => {
      this.ngZone.run(() => {
        const orderedPresets = {};

        for (let key of keys) {
          orderedPresets[key] = defaultPresets[key];
        }

        this.defaultPresets$.next(orderedPresets);
      });
    });
  }

  selectTab(tabId: number) {
    this.selectedTabId$.next(tabId);
  }

  getDefaultPresets() {
    this.electronService.ipcRenderer.send('getDefaultPresets');
  }
}

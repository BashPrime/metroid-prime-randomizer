import { Injectable, NgZone } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


import { ElectronService } from './electron.service';
import { PresetObject } from '../../../../common/models/presetObject';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {
  defaultPresets$ = new BehaviorSubject<PresetObject>(undefined);
  userPresets$ = new BehaviorSubject<PresetObject>(undefined);

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.getAllPresets();

    this.electronService.ipcRenderer.on('getDefaultPresetsResponse', (event, response: PresetsResponse) => {
      this.ngZone.run(() => {
        this.handlePresetsResponse(response, this.defaultPresets$);
      });
    });

    this.electronService.ipcRenderer.on('getUserPresetsResponse', (event, response: PresetsResponse) => {
      this.ngZone.run(() => {
        this.handlePresetsResponse(response, this.userPresets$);
      });
    });

    this.electronService.ipcRenderer.on('updateUserPresetResponse', (event, response) => {
      this.ngZone.run(() => {
        this.getUserPresets();
      });
    });
  }

  getDefaultPresets() {
    this.electronService.ipcRenderer.send('getDefaultPresets');
  }

  getUserPresets() {
    this.electronService.ipcRenderer.send('getUserPresets');
  }

  getAllPresets() {
    this.getDefaultPresets();
    this.getUserPresets();
  }

  private handlePresetsResponse(response: PresetsResponse, subject: Subject<PresetObject>): void {
    // If presets and keys are defined, return the original order the presets were in, otherwise don't do anything
    if (!response.presets) {
      subject.next({});
    } else {
      const finalPresets = response.presets && response.keys ? this.orderPresets(response.presets, response.keys) : response.presets;
      subject.next(finalPresets);
    }
  }

  private orderPresets(presets: PresetObject, keys: string[]): PresetObject {
    const orderedPresets: PresetObject = {};

    for (let key of keys) {
      orderedPresets[key] = presets[key];
    }

    return orderedPresets;
  }
}

interface PresetsResponse {
  err: NodeJS.ErrnoException;
  presets: any;
  keys: string[];
}

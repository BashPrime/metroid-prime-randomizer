import { Injectable, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './services/electron.service';
import { RandomizerForm } from '../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {  
  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    // this.electronService.ipcRenderer.on('getDefaultSettingsResponse', (event, defaultSettings) => {
    //   this.ngZone.run(() => {
    //     this.settings$.next(defaultSettings);
    //   });
    // });
  }

  getDefaultSettings() {
    this.electronService.ipcRenderer.send('getDefaultSettings');
  }

  createForm(): FormGroup {
    const fb = new FormBuilder();
    
    return fb.group({
      seed: [''],
      romSettings: fb.group({
        baseIso: [''],
        outputFolder: [''],
        trilogyIso: ['']
      })
    });
  }
}

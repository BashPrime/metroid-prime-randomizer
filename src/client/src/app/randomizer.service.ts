import { Injectable, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './services/electron.service';
import { RandomizerForm } from '../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  settings$ = new BehaviorSubject<any>(undefined);
  form$ = new BehaviorSubject<RandomizerForm>(undefined);
  private _settings: any = undefined;
  private _form: RandomizerForm = {
    seed: undefined,
    romSettings: undefined,
    rules: undefined,
    logic: undefined
  };
  
  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getDefaultSettingsResponse', (event, defaultSettings) => {
      this.ngZone.run(() => {
        this.settings$.next(defaultSettings);
      });
    });
  }

  getDefaultSettings() {
    this.electronService.ipcRenderer.send('getDefaultSettings');
  }

  replaceForm(key: string, formValue: any) {
    this._form[key] = formValue;
    this.form$.next(this._form);
  }

  updateForm(key: string, formValue: any) {
    this._form[key].patchValue(formValue);
    this.form$.next(this._form);    
  }
}

import { Injectable, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './services/electron.service';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  settings$ = new BehaviorSubject<any>(undefined);
  forms$ = {
    randomizer: new BehaviorSubject<FormGroup>(undefined),
    romSettings: new BehaviorSubject<FormGroup>(undefined),
    rules: new BehaviorSubject<FormGroup>(undefined),
    logic: new BehaviorSubject<FormGroup>(undefined)
  };

  private _forms: FormObject = {
    randomizer: undefined,
    romSettings: undefined,
    rules: undefined,
    logic: undefined
  };
  private _settings: any = undefined;
  
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

  replaceForm(key: string, form: FormGroup) {
    this._forms[key] = form;
    this.forms$[key].next(this._forms[key]);
  }

  updateForm(key: string, value: any) {
    this._forms[key].patchValue(value);
    this.forms$[key].next(this._forms[key]);
  }
}

interface FormObject {
  randomizer: FormGroup,
  romSettings: FormGroup,
  rules: FormGroup,
  logic: FormGroup
}

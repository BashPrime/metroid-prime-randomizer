import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { RandomizerMode } from '../../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../../common/randomizer/enums/RandomizerArtifacts';
import { Utilities } from '../../../common/Utilities';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit, OnDestroy {
  tabs = [
    'ROM Settings',
    'Main Rules',
  ];
  selectedTab = 0;
  patching = false;
  patchUpdate: string;
  randomizerForm: FormGroup;
  settings = {};
  permalink = '';
  valueSub: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private randomizerService: RandomizerService,
    public electronService: ElectronService
  ) {
    this.settings = this.randomizerService.getSettings();
  }

  ngOnInit() {
    this.createForm();
    this.importSettingsFromFile();

    this.valueSub = this.randomizerForm.valueChanges.subscribe(() => {
      this.permalink = this.getPermalink();

      // Send settings to main process for writing later
      this.electronService.ipcRenderer.send('settings-post', this.randomizerForm.value);
    });

    // New settings from main process, apply to the form
    this.electronService.ipcRenderer.on('new-settings', (event, settings) => {
      this.randomizerForm.patchValue(settings);
      this.changeDetectorRef.detectChanges();
    });

    // Handle successful file patch
    this.electronService.ipcRenderer.on('patch-success', (event, arg) => {
      this.patchUpdate = null;
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'info',
        title: 'Success',
        message: arg
      });
    });

    // Error occurred during patching.
    this.electronService.ipcRenderer.on('patch-error', (event, arg) => {
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: arg
      });
    });

    // Patch update, send to view
    this.electronService.ipcRenderer.on('patch-progress', (event, arg) => {
      if (this.patching) {
        this.patchUpdate = arg.percent + ': ' + arg.msg;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
  }

  createForm() {
    const fb = new FormBuilder();
    this.randomizerForm = fb.group({
      seed: [''],
      rom: fb.group({
        baseIso: ['', Validators.required],
        outputFolder: [''],
        spoiler: [true],
        createIso: [true],
        skipFrigate: [true],
        skipHudPopups: [true]
      }),
      settings: this.setDefaultSettings()
    });
  }

  runRandomizer() {
    this.randomizerService.updateSubmittedFlag(true);

    if (this.randomizerForm.valid) {
      if (!this.randomizerForm.get('seed').value) {
        this.getNewSeed();
      }
      const game = JSON.parse(JSON.stringify(this.randomizerForm.value));
      game['version'] = environment.version;
      game['permalink'] = this.getPermalink();
      this.patching = true;
      this.electronService.ipcRenderer.send('randomizer', game);
    }
  }

  setDefaultSettings() {
    const fb = new FormBuilder();

    return fb.group({
      logic: [RandomizerLogic.NO_GLITCHES],
      mode: [RandomizerMode.STANDARD],
      artifacts: [RandomizerArtifacts.VANILLA],
    });
  }

  resetSettings() {
    this.randomizerForm.patchValue({
      seed: '',
      settings: {
        logic: RandomizerLogic.NO_GLITCHES,
        mode: RandomizerMode.STANDARD,
        artifacts: RandomizerArtifacts.VANILLA,
      }
    });
  }

  getPermalink(): string {
    const seed = this.randomizerForm.get('seed').value;
    const settingsHex = this.getHexStringFromSettings();
    if (seed && settingsHex)
      return btoa(seed + ',' + settingsHex);
    return '';
  }

  importPermalink(): void {
    let settingsToImport;
    try {
      settingsToImport = atob(this.permalink).split(',');
      if (settingsToImport.length === 2) {
        const newSeed = settingsToImport[0];
        let newSettings = this.getSettingsFromHexString(settingsToImport[1]);
        if (!newSettings) {
          newSettings = this.getSettingsFromHexString('000');
        }
        this.randomizerForm.patchValue({
          seed: newSeed,
          settings: newSettings
        });
      } else {
        this.electronService.dialog.showMessageBox({
          type: 'error',
          title: 'Error',
          message: 'This permalink is invalid.'
        });
      }
    } catch {
      console.error(new TypeError('Base64 invalid').toString());
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: 'This permalink is invalid.'
      });
    }
  }

  getHexStringFromSettings(): string {
    let hexString = '';
    const settings = this.randomizerForm.get('settings').value;
    const keys = Object.keys(settings);

    for (const key of keys) {
      this.settings[key].find((setting: any, index: number) => {
        if (setting.value === settings[key]) {
          hexString += index.toString(16);
        }
      });
    }

    return hexString;
  }

  getSettingsFromHexString(hexString: string): object {
    const settings = {};
    const keys = Object.keys(this.settings);
    try {
      let index = 0;
      for (const key of keys) {
        const hexWidth = (this.settings[key].length - 1).toString(16).length;
        const settingVal = hexString.substr(index, hexWidth);
        settings[key] = this.settings[key][settingVal].value;
        index += hexWidth;
      }
      return settings;
    } catch {
      console.log(new RangeError('More settings than hex string values').toString());
      return null;
    }
  }

  getNewSeed() {
    this.randomizerForm.patchValue({seed: Utilities.getRandomInt(1, 999999999)});
  }

  importSettingsFromFile() {
    this.electronService.ipcRenderer.send('settings-get');
  }
}

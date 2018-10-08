import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { RandomizerMode } from '../../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../../common/randomizer/enums/RandomizerArtifacts';
import { Config } from '../../../common/randomizer/Config';
import { OptionType } from '../../../common/randomizer/Option';
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
    'Item Logic'
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
        createIso: [true]
      }),
      settings: this.getDefaultSettings()
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

  getDefaultSettings() {
    const fb = new FormBuilder();

    return fb.group({
      spoiler: [false],
      skipFrigate: [true],
      skipHudPopups: [true],
      shuffleArtifacts: [true],
      shuffleMissileLauncher: [true],
      shuffleMorph: [true],
      shuffleBombs: [true],
      shuffleCharge: [true],
      shuffleSupers: [true],
      shuffleBeams: [true],
      shufflePBs: [true],
      noSupers: [false],
      noBombsInBurnDome: [false],
      noVanillaBeams: [false],
      noEarlyPhazonSuit: [false],
      noPhendranaBombsSupers: [false],
      requireVisors: [false],
      noCrashedFrigate: [false],
      rootCaveSW: [false],
      ibbf: [false],
      trainingChamberOOB: [false],
      waveSun: [false],
      workstationToPlasmaProcessing: [false],
      gthWallcrawl: [false],
      earlyNewborn: [false],
      oobNoBombs: [false],
      floatyJump: [false],
      dashing: [false],
      standableTerrain: [false],
      lJumping: [false],
      rJumping: [false],
      earlyWild: [false],
      infiniteSpeedEarlySun: [false],
      infiniteSpeedHote: [false],
      barsSkip: [false],
      spinnersNoBoost: [false],
      spiderlessShafts: [false],
      phazonMiningTunnelNoPhazonSuit: [false],
      halfPipeBombJumps: [false],
      dbj: [false],
      hbj: [false],
      ubj: [false],
      vmr: [false],
      vmrTanks: [5],
      earlyMagmoorNoSuit: [false],
      earlyMagmoorNoSuitTanks: [5]
    });
  }

  resetSettings() {
    this.randomizerForm.patchValue({
      seed: '',
      settings: this.getDefaultSettings().value
    });
  }

  getPermalink(): string {
    const config = new Config();
    const seed = this.randomizerForm.get('seed').value;
    const settingsString = config.settingsToBase32Text(this.getSettingsFromForm());
    const fullString = seed + ',' + settingsString;
    if (seed && fullString)
      return btoa(fullString);
    return '';
  }

  importPermalink(): void {
    let settingsToImport;
    try {
      const config = new Config();
      settingsToImport = atob(this.permalink).split(',');
      if (settingsToImport.length === 2) {
        const newSeed = settingsToImport[0];
        let newSettings = config.base32TextToSettings(settingsToImport[1]);
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

  getNewSeed() {
    this.randomizerForm.patchValue({ seed: Utilities.getRandomInt(1, 999999999) });
  }

  importSettingsFromFile() {
    this.electronService.ipcRenderer.send('settings-get');
  }

  getSettingsFromForm() {
    const settings = {};
    const formValue = this.randomizerForm.value;

    for (let key of Object.keys(formValue)) {
      if (typeof (formValue[key]) !== 'object') {
        settings[key] = formValue[key];
      } else {
        Object.assign(settings, formValue[key]);
      }
    }

    return settings;
  }
}

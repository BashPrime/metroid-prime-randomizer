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
  randomizerForm: FormGroup;
  settings = {};
  permalink = '';
  private settingsString = '';
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
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'info',
        title: 'Success',
        message: arg,
        buttons: ['OK']
      });
    });

    // Error occurred during patching.
    this.electronService.ipcRenderer.on('patch-error', (event, arg) => {
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: arg,
        buttons: ['OK']
      });
    });
  }

  ngOnDestroy() {
    this.valueSub.unsubscribe();
  }

  createForm() {
    const fb = new FormBuilder();
    this.randomizerForm = fb.group({
      seed: [''],
      baseIso: ['', Validators.required],
      outputFolder: [''],
      generateRom: [true],
      fileType: ['ciso'],
      spoiler: [true],
      skipFrigate: [true],
      skipHudPopups: [true],
      obfuscateItems: [false],
      shuffleArtifacts: [true],
      shuffleMissileLauncher: [true],
      shuffleMorph: [true],
      shuffleBombs: [true],
      shuffleCharge: [true],
      shuffleSpaceJump: [true],
      noSupers: [false],
      noBombsPointOfNoReturnTunnels: [false],
      noVanillaBeams: [false],
      noSpiderBallInQuarantineCave: [false],
      noGravitySuitInGravityChamber: [false],
      noEarlyPhazonSuit: [false],
      noReversePhendranaBombs: [true],
      requireVisors: [true],
      noCrashedFrigate: [false],
      rootCaveSW: [false],
      ibbf: [false],
      trainingChamberOOB: [false],
      waveSun: [false],
      workstationToPlasmaProcessing: [false],
      earlyNewborn: [false],
      oobNoBombs: [false],
      floatyJump: [false],
      damageBoostPoisonOrLava: [false],
      dashing: [false],
      standableTerrain: [false],
      lJumping: [false],
      rJumping: [false],
      ghettoJumping: [false],
      earlyWild: [false],
      infiniteSpeedEarlySun: [false],
      infiniteSpeedMagmaPool: [false],
      infiniteSpeedHote: [false],
      barsSkip: [false],
      spinnersNoBoost: [false],
      spiderlessShafts: [false],
      infiniteBoostEliteResearch: [false],
      phazonMiningTunnelNoPhazonSuit: [false],
      halfPipeBombJumps: [false],
      dbj: [false],
      hbjPastHote: [false],
      bypassBombsWithBoost: [false],
      vmr: [false],
      vmrTanks: [5, [Validators.min(3), Validators.max(14)]],
      earlyMagmoorNoSuit: [false],
      earlyMagmoorNoSuitTanks: [7, [Validators.min(7), Validators.max(14)]]
    });
  }

  resetSettings() {
    this.randomizerForm.patchValue({
      seed: '',
      fileType: 'ciso',
      spoiler: true,
      skipFrigate: true,
      skipHudPopups: true,
      obfuscateItems: false,
      shuffleArtifacts: true,
      shuffleMissileLauncher: true,
      shuffleMorph: true,
      shuffleBombs: true,
      shuffleCharge: true,
      shuffleSpaceJump: true,
      noSupers: false,
      noBombsPointOfNoReturnTunnels: false,
      noVanillaBeams: false,
      noSpiderBallInQuarantineCave: false,
      noGravitySuitInGravityChamber: false,
      noEarlyPhazonSuit: false,
      noReversePhendranaBombs: true,
      requireVisors: true,
      noCrashedFrigate: false,
      rootCaveSW: false,
      ibbf: false,
      trainingChamberOOB: false,
      waveSun: false,
      workstationToPlasmaProcessing: false,
      earlyNewborn: false,
      oobNoBombs: false,
      floatyJump: false,
      damageBoostPoisonOrLava: false,
      dashing: false,
      standableTerrain: false,
      lJumping: false,
      rJumping: false,
      ghettoJumping: false,
      earlyWild: false,
      infiniteSpeedEarlySun: false,
      infiniteSpeedMagmaPool: false,
      infiniteSpeedHote: false,
      barsSkip: false,
      spinnersNoBoost: false,
      spiderlessShafts: false,
      infiniteBoostEliteResearch: false,
      phazonMiningTunnelNoPhazonSuit: false,
      halfPipeBombJumps: false,
      dbj: false,
      hbjPastHote: false,
      bypassBombsWithBoost: false,
      vmr: false,
      vmrTanks: 5,
      earlyMagmoorNoSuit: false,
      earlyMagmoorNoSuitTanks: 7
    });
  }


  runRandomizer() {
    this.randomizerService.updateSubmittedFlag(true);

    if (this.randomizerForm.valid) {
      const config = new Config();
      if (!this.randomizerForm.get('seed').value) {
        this.getNewSeed();
      }
      const game = JSON.parse(JSON.stringify(this.randomizerForm.value));
      game['version'] = environment.version;
      game['permalink'] = this.getPermalink();
      game['settingsString'] = config.settingsToBase32Text(this.randomizerForm.value);
      this.patching = true;
      this.electronService.ipcRenderer.send('randomizer', game);
    }
  }

  getPermalink(): string {
    const config = new Config();
    const seed = this.randomizerForm.get('seed').value;
    const settingsString = config.settingsToBase32Text(this.randomizerForm.value);
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
        let newSettings = config.base32TextToSettings(settingsToImport[1]);
        newSettings['seed'] = settingsToImport[0];
        this.randomizerForm.patchValue(newSettings);
      } else {
        this.electronService.dialog.showMessageBox({
          type: 'error',
          title: 'Error',
          message: 'This permalink is invalid.',
          buttons: ['OK']
        });
      }
    } catch {
      console.error(new TypeError('Base64 invalid').toString());
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: 'This permalink is invalid.',
        buttons: ['OK']
      });
    }
  }

  getNewSeed() {
    this.randomizerForm.patchValue({ seed: Utilities.getRandomInt(1, 999999999) });
  }

  importSettingsFromFile() {
    this.electronService.ipcRenderer.send('settings-get');
  }
}

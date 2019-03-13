import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as compareVersions from 'compare-versions';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { Goal } from '../../../common/randomizer/enums/goal';
import { Config } from '../../../common/randomizer/Config';
import { Utilities } from '../../../common/Utilities';
import { environment } from '../../environments/environment';
import { HeatDamagePrevention } from '../../../common/randomizer/enums/heatDamagePrevention';
import { SuitDamageReduction } from '../../../common/randomizer/enums/suitDamageReduction';
import { UpdateService } from '../services/update.service';

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
  permalink = '';
  submitted = false;
  valueSub: any;
  maxSafeInteger = Number.MAX_SAFE_INTEGER;
  newVersion: string;
  closedUpdate: boolean = false;
  private updateChecked = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private randomizerService: RandomizerService,
    private electronService: ElectronService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    this.createForm();
    this.importSettingsFromFile();
    this.checkForNewVersion();

    this.randomizerService.getSubmittedFlag().subscribe(submitted => {
      this.submitted = submitted;
    });

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
    this.electronService.ipcRenderer.on('patch-success', (event, msg, path) => {
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox(null, {
        type: 'info',
        title: 'Success',
        message: msg,
        defaultId: 1,
        buttons: ['Open Folder', 'OK']
      }, (response) => {
        // Open folder is checked, open folder
        if (response === 0) {
          this.electronService.ipcRenderer.send('open-file-path', path);
        }
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
      seed: [null, [Validators.min(1), Validators.max(this.maxSafeInteger)]],
      baseIso: ['', Validators.required],
      outputFolder: [''],
      generateRom: [true],
      fileType: ['ciso'],
      spoiler: [true],
      skipFrigate: [true],
      skipHudPopups: [true],
      hideItemModels: [false],
      goal: [Goal.ARTIFACT_COLLECTION],
      goalArtifacts: [12, [Validators.min(1), Validators.max(12)]],
      heatDamagePrevention: [HeatDamagePrevention.ANY_SUIT],
      suitDamageReduction: [SuitDamageReduction.DEFAULT],
      shuffleArtifacts: [true],
      shuffleMissileLauncher: [true],
      shuffleMorph: [true],
      shuffleBombs: [true],
      shuffleCharge: [true],
      shuffleSpaceJump: [true],
      noSupers: [false],
      noBombsPointOfNoReturnTunnels: [false],
      noVanillaBeams: [false],
      noGravitySuitInGravityChamber: [false],
      noEarlyPhazonSuit: [false],
      noReversePhendranaBombs: [true],
      requireThermal: [true],
      requireXRay: [true],
      noCrashedFrigate: [false],
      noBoostBallLowerMinesGlitched: [false],
      dontRequireFlaahgra: [false],
      dontRequireThardus: [false],
      dontRequireOmegaPirate: [false],
      rootCaveSW: [false],
      ibbf: [false],
      trainingChamberOOB: [false],
      waveSun: [false],
      workstationToPlasmaProcessing: [false],
      earlyNewborn: [false],
      oobNoBombs: [false],
      floatyJump: [false],
      damageBoostLiquids: [false],
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
      seed: null,
      fileType: 'ciso',
      spoiler: true,
      skipFrigate: true,
      skipHudPopups: true,
      hideItemModels: false,
      goal: Goal.ARTIFACT_COLLECTION,
      goalArtifacts: 12,
      heatDamagePrevention: HeatDamagePrevention.ANY_SUIT,
      suitDamageReduction: SuitDamageReduction.DEFAULT,
      shuffleArtifacts: true,
      shuffleMissileLauncher: true,
      shuffleMorph: true,
      shuffleBombs: true,
      shuffleCharge: true,
      shuffleSpaceJump: true,
      noSupers: false,
      noBombsPointOfNoReturnTunnels: false,
      noVanillaBeams: false,
      noGravitySuitInGravityChamber: false,
      noEarlyPhazonSuit: false,
      noReversePhendranaBombs: true,
      requireThermal: true,
      requireXRay: true,
      noCrashedFrigate: false,
      noBoostBallLowerMinesGlitched: false,
      dontRequireFlaahgra: false,
      dontRequireThardus: false,
      dontRequireOmegaPirate: false,
      rootCaveSW: false,
      ibbf: false,
      trainingChamberOOB: false,
      waveSun: false,
      workstationToPlasmaProcessing: false,
      earlyNewborn: false,
      oobNoBombs: false,
      floatyJump: false,
      damageBoostLiquids: false,
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
    let settingsString;
    try {
      settingsString = config.settingsToBase32Text(this.randomizerForm.value);
    } catch (err) {
      return '';
    }
    const fullString = seed + ',' + environment.version + ',' + settingsString;
    if (seed && fullString)
      return btoa(fullString);
    return '';
  }

  importPermalink(): void {
    let settingsToImport;
    try {
      const config = new Config();
      settingsToImport = atob(this.permalink).split(',');
      if (settingsToImport.length === 3) {
        // Verify the versions match
        const version = settingsToImport[1];
        if (compareVersions(environment.version, version) === 0) {
          let newSettings = config.base32TextToSettings(settingsToImport[2]);
          newSettings['seed'] = settingsToImport[0];
          this.randomizerForm.patchValue(newSettings);
        } else {
          // Display version mismatch error dialog
          this.electronService.dialog.showMessageBox({
            type: 'error',
            title: 'Error',
            message: 'This permalink is for version ' + version + ' of the randomizer, but you are using version ' + environment.version + '.',
            buttons: ['OK']
          });
        }
      } else {
        this.electronService.dialog.showMessageBox({
          type: 'error',
          title: 'Error',
          message: 'This permalink is invalid.',
          buttons: ['OK']
        });
      }
    } catch {
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: 'This permalink is invalid.',
        buttons: ['OK']
      });
    }
  }

  getNewSeed() {
    this.randomizerForm.patchValue({ seed: Utilities.getRandomInt(1, Number.MAX_SAFE_INTEGER) });
  }

  importSettingsFromFile() {
    this.electronService.ipcRenderer.send('settings-get');
  }

  private checkForNewVersion() {
    // Run update check if we haven't checked already and the user has not opted to skip checking
    if (!this.updateChecked) {
      this.updateService.getRandomizerVersion().subscribe((data: any) => {
        this.updateChecked = true;

        // Check if version is less than what's on Github master
        if (compareVersions(environment.version, data.version) < 0) {
          this.newVersion = data.version;
        }
      });
    }
  }

  getVersion() {
    return environment.version;
  }

  openExternalUrl(url: string) {
    this.electronService.openExternalLink(url);
  }
}

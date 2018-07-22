import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { Randomizer } from '../../common/randomizer/Randomizer';
import { RandomizerMode } from '../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../common/randomizer/enums/RandomizerArtifacts';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  tabs = [
    'ROM Settings',
    'Main Rules',
    // 'Detailed Logic',
    // 'Other'
  ];
  selectedTab = 0;
  patching = false;
  patchUpdate: string;
  errorOccurred: boolean;
  randomizerForm: FormGroup;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private randomizerService: RandomizerService,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.createForm();

    this.electronService.ipcRenderer.on('patch-complete', (event, arg) => {
      this.patchUpdate = null;
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      if (!this.errorOccurred) {
        this.electronService.dialog.showMessageBox({
          type: 'info',
          message: 'Game has been successfully patched.'
        });
      }
    });

    this.electronService.ipcRenderer.on('patching-error', (event, arg) => {
      this.patching = false;
      this.errorOccurred = true;
      console.log(JSON.stringify(arg));
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: arg
      });
    });

    this.electronService.ipcRenderer.on('patch-update', (event, arg) => {
      if (this.patching) {
        this.patchUpdate = arg;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  createForm() {
    const fb = new FormBuilder();
    this.randomizerForm = fb.group({
      version: environment.version,
      seed: [''],
      rom: fb.group({
        baseIso: ['', Validators.required],
        outputFolder: ['']
      }),
      settings: this.setDefaultSettings()
    });
  }

  runRandomizer() {
    this.randomizerService.updateSubmittedFlag(true);
    const game = this.randomizerForm.value;

    if (this.randomizerForm.valid) {
      this.errorOccurred = false;
      this.patching = true;
      const randomizer = new Randomizer(
        game.settings.mode,
        game.settings.logic,
        game.settings.artifacts,
        game.settings.difficulty
      );

      if (game.seed) {
        game.seed = game.seed < 1 ? 1 : game.seed > 999999999 ? 999999999 : game.seed;
        randomizer.randomize(game.seed);
      } else {
        randomizer.randomize();
        game.seed = randomizer.getSeed();
      }

      game.layoutDescriptor = randomizer.getWorld().generateLayout();

      this.electronService.ipcRenderer.send('randomizer', game);
    }
  }

  setDefaultSettings() {
    const fb = new FormBuilder();

    return fb.group({
      logic: [RandomizerLogic.NO_GLITCHES],
      mode: [RandomizerMode.STANDARD],
      artifacts: [RandomizerArtifacts.VANILLA],
      difficulty: ['normal'],
    });
  }

  resetSettings() {
    this.randomizerForm.patchValue({
      seed: '',
      settings: {
        logic: RandomizerLogic.NO_GLITCHES,
        mode: RandomizerMode.STANDARD,
        artifacts: RandomizerArtifacts.VANILLA,
        difficulty: 'normal',
      }
    });
  }

}

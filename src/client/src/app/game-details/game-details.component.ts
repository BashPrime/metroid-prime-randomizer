import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

import * as Utilities from '../utilities';
import { GeneratorService } from '../services/generator.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import { ElectronService } from '../services/electron.service';
import { PatcherService } from '../services/patcher.service';
import { PatchForm } from '../../../../common/models/patchForm';
import { SettingsService } from '../services/settings.service';
import { SettingsSection } from '../settings/settings-section';
import { RandomizerService } from '../services/randomizer.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent extends SettingsSection implements OnInit {
  private seeds: GeneratedSeed[];
  private form: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  // Constants
  readonly SETTINGS = this.randomizerService.SETTINGS;
  readonly DETAILS = this.randomizerService.DETAILS;

  constructor(
    private electronService: ElectronService,
    private randomizerService: RandomizerService,
    private settingsService: SettingsService,
    private generatorService: GeneratorService,
    private patcherService: PatcherService,
    private clipboardService: ClipboardService,
    private toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.settingsService.getPatchSettings();

    // Get generated seed from service
    this.generatorService._generatedSeeds
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(seeds => this.seeds = seeds);

    // Get saved settings if they exist
    this.settingsService._patchSettings
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(settings => {
        if (settings) {
          this.form.patchValue(settings);
        }
      });

    this.onValueChanges();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initForm(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      baseIso: ['', [Validators.required]],
      outputFolder: ['', Validators.required],
      trilogyIso: [''],
      outputType: ['iso']
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getSeeds(): GeneratedSeed[] {
    return this.seeds;
  }

  getPermalink(seed: GeneratedSeed): string {
    return Utilities.generatePermalink(seed.seed, seed.settingsString);
  }

  hasMultipleSeeds(): boolean {
    return this.seeds && this.seeds.length > 1;
  }

  copyPermalink(permalink: string): void {
    this.clipboardService.copy(permalink);
    this.toastrService.info('Permalink copied.');
  }

  selectBaseIso(): void {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GameCube ISO Files', extensions: ['iso', 'gcm'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.baseIso.setValue(result.filePaths[0]);
      }
    });
  }

  selectTrilogyIso(): void {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'Wii ISO Files', extensions: ['iso', 'wbfs'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.trilogyIso.setValue(result.filePaths[0]);
      }
    });
  }

  selectOutputFolder(): void {
    this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.outputFolder.setValue(result.filePaths[0]);
      }
    });
  }

  saveIso(seed: GeneratedSeed, form: PatchForm): void {
    if (this.form.valid) {
      this.patcherService.patchIso(seed, form);
    }
  }

  saveSpoiler(seed: GeneratedSeed): void {

  }

  onValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.settingsService.applyPatchSettings(value);
      })
  }
}

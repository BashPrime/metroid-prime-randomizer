import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
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
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { DiagnosticsService } from '../services/diagnostics.service';
import { PrimeIsoDiagnosticsModalComponent } from '../prime-iso-diagnostics-modal/prime-iso-diagnostics-modal.component';
import { SavePresetModalComponent } from '../save-preset-modal/save-preset-modal.component';
import { filterProperties } from '../utilities';
import { PresetsService } from '../services/presets.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent extends SettingsSection implements OnInit {
  @ViewChild(PrimeIsoDiagnosticsModalComponent, {static: false}) private diagnosticsModal: PrimeIsoDiagnosticsModalComponent;
  @ViewChild(SavePresetModalComponent, { static: false }) private savePresetModal: SavePresetModalComponent;
  private modalOpen: boolean = false;
  private seeds: GeneratedSeed[];
  private lastSettingsUsed: RandomizerForm;
  private formGroup: FormGroup;
  private submitted: boolean = false;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(
    protected randomizerService: RandomizerService,
    private electronService: ElectronService,
    private settingsService: SettingsService,
    private generatorService: GeneratorService,
    private patcherService: PatcherService,
    private clipboardService: ClipboardService,
    private toastrService: ToastrService,
    private diagnosticsService: DiagnosticsService,
    private presetsService: PresetsService
  ) {
    super(randomizerService);
  }

  ngOnInit() {
    this.initForm();
    this.settingsService.getPatchSettings();

    // Get generated seed from service
    this.generatorService._generatedSeeds
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(seeds => this.seeds = seeds);

    // Get last settings used
    this.generatorService._lastSettingsUsed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(settings => this.lastSettingsUsed = settings);

    // Get saved settings if they exist
    this.settingsService._patchSettings
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(settings => {
        if (settings) {
          this.formGroup.patchValue(settings);
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
    this.formGroup = fb.group({
      baseIso: ['', [Validators.required]],
      outputFolder: [''],
      trilogyIso: [''],
      outputType: ['iso']
    })
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getSeeds(): GeneratedSeed[] {
    return this.seeds;
  }

  getLastSettingsUsed(): RandomizerForm {
    return this.lastSettingsUsed;
  }

  getPermalink(seed: GeneratedSeed): string {
    return Utilities.generatePermalink(seed.seed, seed.settingsString);
  }

  getSeedHash(seed: GeneratedSeed): string {
    return seed.seedHash.join(' ');
  }

  hasMultipleSeeds(): boolean {
    return this.seeds && this.seeds.length > 1;
  }

  isSpoilerEnabled(): Observable<boolean> {
    return this.generatorService._spoiler;
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  getModalOpen(): boolean {
    return this.modalOpen;
  }

  setModalOpen(open: boolean) {
    this.modalOpen = open;
  }

  copy(str: string): void {
    this.clipboardService.copy(str);
    this.toastrService.success('Copied to clipboard.');
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
        this.formGroup.controls.baseIso.setValue(result.filePaths[0]);
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
        this.formGroup.controls.trilogyIso.setValue(result.filePaths[0]);
      }
    });
  }

  selectOutputFolder(): void {
    this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled) {
        this.formGroup.controls.outputFolder.setValue(result.filePaths[0]);
      }
    });
  }

  openOutputFolder(): void {
    this.electronService.ipcRenderer.send('openOutputFolder', this.formGroup.controls.outputFolder.value);
  }

  saveIsos(form: PatchForm): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.patcherService.patchIsos(this.seeds, form);
    }
  }

  saveSpoilers(form: PatchForm): void {
    this.patcherService.saveSpoilers(this.seeds, form);
  }

  onValueChanges(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.settingsService.applyPatchSettings(value);
      })
  }

  verifyBaseIso(): void {
    const baseIso = this.formGroup.controls.baseIso.value;

    // Run the verification if a base ISO is provided
    if (baseIso) {
      this.diagnosticsModal.openModal();
      this.diagnosticsService.verifyIso(baseIso);
    } else {
      this.toastrService.warning('You need to provide a base ISO to verify it!');
    }
  }

  openSavePresetModal(): void {
    this.savePresetModal.openModal();
  }

  addOrUpdatePreset(name: string): void {
    const preset = filterProperties(this.lastSettingsUsed, ['preset', 'generationCount']);
    this.presetsService.addOrUpdatePreset(name, preset as RandomizerForm);
  }
}

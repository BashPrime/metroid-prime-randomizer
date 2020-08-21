import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { filterProperties } from '../utilities';
import { SavePresetModalComponent } from '../save-preset-modal/save-preset-modal.component';
import { RemovePresetModalComponent } from '../remove-preset-modal/remove-preset-modal.component';
import { RandomizerService } from '../services/randomizer.service';
import { PresetsService } from '../services/presets.service';
import { PresetObject } from '../../../../common/models/presetObject';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratorService } from '../services/generator.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  @ViewChild(SavePresetModalComponent, { static: false }) private savePresetModal: SavePresetModalComponent;
  @ViewChild(RemovePresetModalComponent, { static: false }) private removePresetModal: RemovePresetModalComponent;
  private loaded: boolean = false;
  private presets: PresetObject = {};
  private userPresets: PresetObject;
  private form: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject();
  private lastUpdatedPreset: string;

  // Constants
  private readonly CUSTOM_PRESET = 'Custom';

  constructor(
    private generatorService: GeneratorService,
    private randomizerService: RandomizerService,
    private presetsService: PresetsService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
    this.presetsService.getAllPresets();
    this.settingsService.getSettings();
    this.onValueChanges();

    // Subscribe when all of these observables emit
    combineLatest(this.presetsService._defaultPresets, this.presetsService._userPresets, this.settingsService._settings)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([defaultPresets, userPresets, settings]) => {
        if (defaultPresets && userPresets) {
          this.userPresets = userPresets;
          this.buildPresets([defaultPresets, userPresets]);

          // Were defined settings retrieved from settings.json?
          // Only apply form changes if first time loading
          if (settings) {
            const preset = (settings as any).preset;

            // If the preset isn't custom, applyFormChanges() will take care of the other settings
            if (preset) {
              this.setPreset(preset);
            }

            // If the preset is custom, we need to apply the settings too
            if (preset === this.CUSTOM_PRESET) {
              this.applyFormChanges(settings);
            }
          }

          this.loaded = true;
        }
      });

    this.presetsService._previousAction
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(previousAction => {
      switch (previousAction) {
        case 'update':
          if (this.lastUpdatedPreset) {
            this.setPreset(this.lastUpdatedPreset);
            this.lastUpdatedPreset = null;
          }
          break;
        case 'remove':
          this.setPreset(this.randomizerService.DEFAULT_PRESET);
          break;
      }
    });

    this.presetsService._lastUpdatedPreset
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(preset => {
      this.lastUpdatedPreset = preset;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getFormGroup(): FormGroup {
    return this.form;
  }

  getPresets() {
    return this.presets;
  }

  getUserPresets() {
    return this.userPresets;
  }

  getPresetValue() {
    return this.form.get('preset').value;
  }

  getPresetsDropdown(): string[] {
    return ['Custom', ...Object.keys(this.presets)];
  }

  setCustomPreset(): void {
    this.form.patchValue({ preset: this.CUSTOM_PRESET });
  }

  setPreset(key: string): void {
    this.form.patchValue({ preset: key });
  }

  isCustomPreset(): boolean {
    return this.getPresetValue() === this.CUSTOM_PRESET;
  }

  isProtectedPreset(): boolean {
    const preset = this.presets[this.getPresetValue()];

    if (!preset) {
      return false;
    }

    return !this.isCustomPreset() && preset.hasOwnProperty('protected');
  }

  isUserPreset(): boolean {
    return !(this.isProtectedPreset() || this.isCustomPreset());
  }

  // Watch for changes on the form, specific controls
  onValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(formValue => {
        if (this.loaded) {
          this.settingsService.applySettings(formValue);
        }
      });

    this.form.get('preset').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (!this.isCustomPreset()) {
          this.applyFormChanges(this.presets[value], ['preset', 'generationCount']);
        }
      });
  }

  applyFormChanges(newValue: RandomizerForm, excludeControls: string[] = []): void {
    const fb = new FormBuilder();

    // If preset is older/missing fields, get defaults and apply on top of those
    const newSettings = this.randomizerService.getRandomizerFormGracefully(newValue);

    for (let control in filterProperties(newSettings, excludeControls)) {
      // Make sure form has the control! (primarly for protected field)
      if (this.form.get(control)) {
        // Special handling for array controls
        if (Array.isArray(newSettings[control])) {
          // If array values are objects, make them form groups
          if (newSettings[control].length && typeof newSettings[control][0] === 'object') {
            const formArray = fb.array([]);

            for (let item of newSettings[control]) {
              formArray.push(fb.group(item));
            }

            this.form.setControl(control, formArray);
          } else {
            // Primitives
            this.form.setControl(control, fb.array(newSettings[control] || []));
          }
        } else {
          this.form.get(control).patchValue(newSettings[control]);
        }
      }
    }
  }

  openSavePresetModal(): void {
    this.savePresetModal.openModal();
  }

  openRemovePresetModal(preset: string): void {
    this.removePresetModal.setPresetAndOpen(preset);
  }

  addOrUpdatePreset(name: string): void {
    const preset = filterProperties(this.form.value, ['preset', 'generationCount']);
    this.presetsService.addOrUpdatePreset(name, preset as RandomizerForm);
  }

  removePreset(name: string): void {
    this.presetsService.removePreset(name);
  }

  generateSeed(spoiler: boolean) {
    if (this.form.valid) {
      this.generatorService.generateGame(this.form.value, spoiler);
    }
  }

  importPreset(): void {
    this.presetsService.importPreset();
  }

  exportPreset(): void {
    if (this.isUserPreset()) {
      this.presetsService.exportPreset(this.getPresetValue());
    }
  }

  private buildPresets(presets: PresetObject[]): void {
    this.presets = {};

    // Iterate through the presets array
    for (let preset of presets) {
      // Add the keys from each preset to the final preset object
      for (let key of Object.keys(preset)) {
        this.presets[key] = preset[key];
      }
    }
  }
}

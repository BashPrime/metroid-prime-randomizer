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
          if (settings) {
            this.applyFormChanges(settings);
          }

          this.loaded = true;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getForm(): FormGroup {
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
      .subscribe(value => {
        this.settingsService.applySettings(value);
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

    for (let control in filterProperties(newValue, excludeControls)) {
      // Make sure form has the control! (primarly for protected field)
      if (this.form.get(control)) {
        // Special handling for array controls
        if (Array.isArray(newValue[control])) {
          this.form.setControl(control, fb.array(newValue[control] || []));
        } else {
          this.form.get(control).patchValue(newValue[control]);
        }
      }
    }
  }

  openSavePresetModal(presets: PresetObject): void {
    this.savePresetModal.setPresetsObjectAndOpen(presets);
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
    this.form.patchValue({ preset: this.randomizerService.DEFAULT_PRESET });
  }

  generateSeed(spoiler: boolean) {
    this.generatorService.generateGame(this.form.value, spoiler);
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

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ApplicationService } from '../services/application.service';
import { PresetObject } from '../../../../common/models/presetObject';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  readonly OBJECT_KEYS = Object.keys;
  private defaultPresets: PresetObject;
  private presets: PresetObject;
  private form: FormGroup;
  private readonly CUSTOM_PRESET = 'Custom';

  constructor(private randomizerService: RandomizerService, private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.getDefaultPresets();
    this.form = this.randomizerService.createForm();
    this.onValueChanges();

    this.appService.defaultPresets$.subscribe(presets => {
      this.defaultPresets = presets;
      this.buildPresets();
    });
  }

  private buildPresets(): void {
    this.presets = Object.assign({}, this.defaultPresets) as PresetObject;
  }

  getForm(): FormGroup {
    return this.form;
  }

  getPresets() {
    return this.presets;
  }

  getPresetsDropdown(): string[] {
    const presets = ['Custom'];
    for (let presetKey of Object.keys(this.presets)) {
      presets.push(presetKey);
    }

    return presets;
  }

  setCustomPreset(): void {
    this.form.patchValue({ preset: this.CUSTOM_PRESET });
  }

  isCustomPreset(): boolean {
    return this.form.get('preset').value === this.CUSTOM_PRESET;
  }

  // Watch for changes on specific controls
  onValueChanges() {
    this.form.get('preset').valueChanges.subscribe(value => {
      if (!this.isCustomPreset()) {
        const preset = this.presets[value];
        this.form.patchValue(preset);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as presetsDefaultJson from '../../assets/data/presetsDefault.json';
import { RandomizerService } from '../services/randomizer.service.js';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  readonly OBJECT_KEYS = Object.keys;
  private defaultPresets = (presetsDefaultJson as any).default as PresetObject;
  private presets: PresetObject;
  private form: FormGroup;
  private readonly CUSTOM_PRESET = 'Custom';

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    this.buildPresets();
    this.form = this.randomizerService.createForm();
    this.onValueChanges();
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

interface PresetObject {
  [key: string]: RandomizerForm;
}

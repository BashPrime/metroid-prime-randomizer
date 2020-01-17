import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { RandomizerService } from '../services/randomizer.service';
import { ApplicationService } from '../services/application.service';
import { PresetObject } from '../../../../common/models/presetObject';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  private presets: PresetObject = {};
  private form: FormGroup;

  // Constants
  private readonly CUSTOM_PRESET = 'Custom';

  constructor(private randomizerService: RandomizerService, private appService: ApplicationService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
    this.appService.getAllPresets();
    this.onValueChanges();

    combineLatest(this.appService.defaultPresets$, this.appService.userPresets$)
      .subscribe(([defaultPresets, userPresets]) => {
        if (defaultPresets && userPresets) {
          this.buildPresets([defaultPresets, userPresets]);
        }
      });
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

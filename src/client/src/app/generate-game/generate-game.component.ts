import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as presetsDefaultJson from '../../assets/data/presetsDefault.json';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  private defaultPresets = (presetsDefaultJson as any).default;
  private presets: string[];
  private form: FormGroup;
  private readonly CUSTOM_PRESET = 'Custom';

  constructor() { }

  ngOnInit() {
    this.buildPresets();

    const fb = new FormBuilder();
    this.form = fb.group({
      preset: [Object.keys(this.defaultPresets)[0]]
    });
  }

  private buildPresets(): void {
    this.presets = [this.CUSTOM_PRESET];
    for (let key of Object.keys(this.defaultPresets)) {
      this.presets.push(key);
    }
  }

  getForm(): FormGroup {
    return this.form;
  }

  getPresets(): string[] {
    return this.presets;
  }

  getDefaultPresets(): object {
    return this.defaultPresets;
  }

  setCustom(): void {
    this.form.patchValue({ preset: this.CUSTOM_PRESET });
  }

  isCustom(): boolean {
    return this.form.get('preset').value === this.CUSTOM_PRESET;
  }
}

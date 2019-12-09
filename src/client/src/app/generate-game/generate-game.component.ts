import { Component, OnInit } from '@angular/core';

import * as presetsDefaultJson from '../../assets/data/presetsDefault.json';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  objectKeys = Object.keys;
  private defaultPresets: object = presetsDefaultJson;
  private presets: object = {};
  private selectedPreset: string = 'Custom';

  constructor() { }

  ngOnInit() {
  }

  getDefaultPresets(): object {
    return this.defaultPresets;
  }

  getSelectedPreset(): string {
    return this.selectedPreset;
  }

  setSelectedPreset(preset: string) {
    this.selectedPreset = preset;
  }
}

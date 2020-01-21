import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrimeRandomizerSettings, details, settings } from '../../../../electron/models/prime/randomizerSettings';

import { version } from '../../../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  readonly DEFAULT_SETTINGS = new PrimeRandomizerSettings();
  readonly DETAILS = details;
  readonly SETTINGS = settings;
  readonly DEFAULT_PRESET = 'Default / Beginner';
  readonly APP_VERSION = version;

  constructor() { }

  /**
   * Constructs a FormGroup object representing the randomizer settings.
   * This object is meant to be as faithful in structure to the PrimeRandomizerSettings interface as possible.
   */
  createForm(): FormGroup {
    const fb = new FormBuilder();

    return fb.group({
      preset: [this.DEFAULT_PRESET],
      generationCount: [1, [Validators.min(1), Validators.max(99), Validators.required]],
      romSettings: fb.group({
        skipFrigate: [this.DEFAULT_SETTINGS.skipFrigate],
        skipHudPopups: [this.DEFAULT_SETTINGS.skipHudPopups],
        hideItemModels: [this.DEFAULT_SETTINGS.hideItemModels]
      }),
      rules: fb.group({
        goal: [this.DEFAULT_SETTINGS.goal],
        goalArtifacts: [this.DEFAULT_SETTINGS.goalArtifacts],
        artifactLocationHints: [this.DEFAULT_SETTINGS.artifactLocationHints],
        heatProtection: [this.DEFAULT_SETTINGS.heatProtection],
        suitDamageReduction: [this.DEFAULT_SETTINGS.suitDamageReduction]
      }),
      excludeLocations: fb.array([]),
      tricks: fb.array([])
    });
  }
}

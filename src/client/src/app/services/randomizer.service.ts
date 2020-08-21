import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrimeRandomizerSettings, settings } from '../../../../electron/models/prime/randomizerSettings';

import { version } from '../../../../../package.json';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  readonly DEFAULT_SETTINGS = new PrimeRandomizerSettings();
  readonly SETTINGS = settings;
  readonly DEFAULT_PRESET = 'Default';
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
        hideItemModels: [this.DEFAULT_SETTINGS.hideItemModels],
        enableMainPlazaLedgeDoor: [this.DEFAULT_SETTINGS.enableMainPlazaLedgeDoor],
        skipImpactCrater: [this.DEFAULT_SETTINGS.skipImpactCrater]
      }),
      rules: fb.group({
        goal: [this.DEFAULT_SETTINGS.goal],
        goalArtifacts: [this.DEFAULT_SETTINGS.goalArtifacts],
        artifactLocationHints: [this.DEFAULT_SETTINGS.artifactLocationHints],
        elevatorShuffle: [this.DEFAULT_SETTINGS.elevatorShuffle],
        heatProtection: [this.DEFAULT_SETTINGS.heatProtection],
        suitDamageReduction: [this.DEFAULT_SETTINGS.suitDamageReduction],
        startingArea: [this.DEFAULT_SETTINGS.startingArea],
        randomStartingItems: fb.group({
          minimum: [this.DEFAULT_SETTINGS.randomStartingItems.minimum, [Validators.required, Validators.min(0), Validators.max(25)]],
          maximum: [this.DEFAULT_SETTINGS.randomStartingItems.maximum, [Validators.required, Validators.min(0), Validators.max(25)]]
        }),
        pointOfNoReturnItems: [this.DEFAULT_SETTINGS.pointOfNoReturnItems],
        junkItems: [this.DEFAULT_SETTINGS.junkItems],
        shuffleMode: [this.DEFAULT_SETTINGS.shuffleMode]
      }),
      itemOverrides: fb.array([]),
      excludeLocations: fb.array([]),
      tricks: fb.array([])
    });
  }

  getRandomizerFormGracefully(form: RandomizerForm): RandomizerForm {
    const newSettings = this.DEFAULT_SETTINGS.toRandomizerForm();

    Object.assign(newSettings.romSettings, form.romSettings);
    Object.assign(newSettings.rules, form.rules);
    Object.assign(newSettings.itemOverrides, form.itemOverrides);
    Object.assign(newSettings.excludeLocations, form.excludeLocations);
    Object.assign(newSettings.tricks, form.tricks);

    return newSettings;
  }
}

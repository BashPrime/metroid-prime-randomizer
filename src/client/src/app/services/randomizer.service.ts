import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrimeRandomizerSettings, details } from '../../../../electron/models/prime/randomizerSettings';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  readonly DEFAULT_SETTINGS = new PrimeRandomizerSettings({});
  readonly DETAILS = details;

  constructor() {}

  /**
   * Constructs a FormGroup object representing the randomizer settings.
   * This object is meant to be as faithful in structure to the PrimeRandomizerSettings interface as possible.
   */
  createForm(): FormGroup {
    const fb = new FormBuilder();

    return fb.group({
      seed: [''],
      baseIso: [''],
      outputFolder: [''],
      trilogyIso: [''],
      outputType: ['iso'],
      generationCount: [1, [Validators.min(1), Validators.max(99)]],
      spoiler: [this.DEFAULT_SETTINGS.spoiler],
      skipFrigate: [this.DEFAULT_SETTINGS.skipFrigate],
      skipHudPopups: [this.DEFAULT_SETTINGS.skipHudPopups],
      hideItemModels: [this.DEFAULT_SETTINGS.hideItemModels],
      goal: [this.DEFAULT_SETTINGS.goal],
      goalArtifacts: [this.DEFAULT_SETTINGS.goalArtifacts],
      artifactLocationHints: [this.DEFAULT_SETTINGS.artifactLocationHints],
      heatProtection: [this.DEFAULT_SETTINGS.heatProtection],
      suitDamageReduction: [this.DEFAULT_SETTINGS.suitDamageReduction]
    });
  }
}

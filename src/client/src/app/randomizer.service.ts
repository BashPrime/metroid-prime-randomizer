import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrimeRandomizerSettings } from '../../../electron/models/prime/randomizerSettings';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  constructor() {
    // this.electronService.ipcRenderer.on('getDefaultSettingsResponse', (event, defaultSettings) => {
    //   this.ngZone.run(() => {
    //     this.settings$.next(defaultSettings);
    //   });
    // });
  }

  /**
   * Constructs a FormGroup object representing the randomizer settings.
   * This object is meant to be as faithful in structure to the PrimeRandomizerSettings interface as possible.
   */
  createForm(): FormGroup {
    const fb = new FormBuilder();
    const defaults = new PrimeRandomizerSettings({});

    return fb.group({
      seed: [''],
      baseIso: [''],
      outputFolder: [''],
      trilogyIso: [''],
      outputType: ['iso'],
      generationCount: [1, [Validators.min(1), Validators.max(99)]],
      spoiler: [defaults.spoiler],
      skipFrigate: [defaults.skipFrigate],
      skipHudPopups: [defaults.skipHudPopups],
      hideItemModels: [defaults.hideItemModels],
      goal: [defaults.goal],
      goalArtifacts: [defaults.goalArtifacts],
      artifactLocationHints: [defaults.artifactLocationHints],
      heatDamagePrevention: [defaults.heatDamagePrevention],
      suitDamageReduction: [defaults.suitDamageReduction]
    });
  }
}

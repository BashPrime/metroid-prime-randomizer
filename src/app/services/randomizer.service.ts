import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { RandomizerMode } from '../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../common/randomizer/enums/RandomizerArtifacts';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  private settings;
  private submitted$ = new BehaviorSubject(false);

  constructor() {
    this.resetSettings();
  }

  getSettings() {
    return this.settings;
  }

  resetSettings() {
    this.settings = JSON.parse(JSON.stringify({
      version: environment.version,
      logic: RandomizerLogic.NO_GLITCHES,
      mode: RandomizerMode.STANDARD,
      artifacts: RandomizerArtifacts.VANILLA,
      difficulty: 'normal'
    }));
  }

  getSubmittedFlag() {
    return this.submitted$;
  }

  updateSubmittedFlag(submitted: boolean) {
    this.submitted$.next(submitted);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RandomizerMode } from '../../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../../common/randomizer/enums/RandomizerArtifacts';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  private submitted$ = new BehaviorSubject(false);
  private settings = {
    logic: [
      { name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES },
      { name: 'Normal', value: RandomizerLogic.NORMAL },
      { name: 'Hard', value: RandomizerLogic.HARD }
    ],
    mode: [
      { name: 'Standard', value: RandomizerMode.STANDARD },
      { name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS }
    ],
    artifacts: [
      { name: 'Vanilla (Not Randomized)', value: RandomizerArtifacts.VANILLA },
      { name: 'Randomized', value: RandomizerArtifacts.RANDOMIZED }
    ]
  };
  private tooltips = {
    hideItemIcons: 'Replaces all item models with a "glitched suit model.',
    skipFrigate: 'Start the game on Tallon Overworld instead of the frigate.',
    skipHudPopups: 'The game won\'t pause or display a popup when obtaining items.',
    spoiler: 'Creates a spoiler .txt file.'
  };

  constructor() {}

  getSettings() {
    return this.settings;
  }

  getSubmittedFlag() {
    return this.submitted$;
  }

  getTooltips() {
    return this.tooltips;
  }

  updateSubmittedFlag(submitted: boolean) {
    this.submitted$.next(submitted);
  }
}

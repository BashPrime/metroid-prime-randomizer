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
    artifactCount: 'Sets the number of Chozo Artifacts for Artifact Collection seeds.',
    baseIso: 'NTSC-U 1.00 or 1.02 Metroid Prime ISO file. The PAL, NTSC-J, and Wii versions are not currently supported.',
    fileType: '.ciso and .iso files are supported by Nintendont and Dolphin. Currently, only Dolphin supports .gcz files.',
    goal: 'Changing this affects the requirements to access the Ridley fight and the Impact Crater.\n\n' +
      '\'Always Open\': Collecting the Artifact Temple item immediately begins the Ridley fight.\n' +
      '\'Artifact Collection:\' Collect 1-12 Chozo Artifacts placed in the game world.\n' +
      '\'All Bosses:\': Defeat Flaahgra, Thardus, and Omega Pirate, and collect their Chozo Artifacts.',
    heatDamagePrevention: '\'Any Suit\': Collecting any of the three suits will prevent heat damage.\n' +
      '\'Varia Suit Only\': Only the Varia Suit will prevent heat damage.',
    hideItemModels: 'Replaces all item models with a "glitched texture" suit model.',
    shuffleArtifacts: 'Enabling this shuffles the Chozo Artifacts around the game world, after items are placed. ' +
      'This only applies for Artifact Collection seeds.',
    shuffleBombs: 'Enabling this shuffle the Morph Ball Bombs into the item pool.',
    shuffleCharge: 'Enabling this shuffles the Charge Beam into the item pool.',
    shuffleMissileLauncher: 'Enabling this shuffles the Missile Launcher into the item pool.',
    shuffleMorph: 'Enabling this shuffles the Morph Ball into the item pool.',
    shuffleSpaceJump: 'Enabling this shuffles the Space Jump boots into the item pool.',
    skipFrigate: 'Start the game on Tallon Overworld instead of the frigate.',
    skipHudPopups: 'The game won\'t pause or display a popup when obtaining items.',
    spoiler: 'Creates a spoiler .txt file.',
    suitDamageReduction: '\'Default\': Damage reduction is based only on the most powerful suit you have obtained. ' +
      'Varia = 10%, Gravity = 20%, Phazon = 50%.\n' +
      '\'Cumulative\': Damage reduction is based on the number of suits you have obtained. ' +
      '1 Suit = 10%, 2 Suits = 20%, 3 Suits = 50%.'
  };

  constructor() { }

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

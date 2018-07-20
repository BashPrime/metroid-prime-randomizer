import { Component, OnInit } from '@angular/core';

import { RandomizerService } from '../services/randomizer.service';

import { RandomizerMode } from '../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../common/randomizer/enums/RandomizerArtifacts';

@Component({
  selector: 'app-main-rules',
  templateUrl: './main-rules.component.html',
  styleUrls: ['./main-rules.component.scss']
})
export class MainRulesComponent implements OnInit {
  model = {};
  dropdowns: any = {
    logic: [
      { name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES },
      { name: 'Normal', value: RandomizerLogic.NORMAL },
      { name: 'Hard', value: RandomizerLogic.HARD }
    ],
    mode: [
      { name: 'Standard', value: RandomizerMode.STANDARD },
      { name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS }
    ],
    difficulty: [
      { name: 'Normal', value: 'normal' }
    ],
    artifacts: [
      { name: 'Vanilla (Not Randomized)', value: RandomizerArtifacts.VANILLA },
      { name: 'Randomized', value: RandomizerArtifacts.RANDOMIZED }
    ]
  };
  defaultLogic = RandomizerLogic.NO_GLITCHES;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    this.model = this.randomizerService.getSettings();
  }

}

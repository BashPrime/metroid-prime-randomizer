import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Utilities } from '../../../common/Utilities';
import { Goal } from '../../../common/randomizer/enums/goal';
import { Config } from '../../../common/randomizer/Config';
import { HeatDamagePrevention } from '../../../common/randomizer/enums/heatDamagePrevention';

@Component({
  selector: 'app-main-rules',
  templateUrl: './main-rules.component.html',
  styleUrls: ['./main-rules.component.scss']
})
export class MainRulesComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  goals: any[];
  heatDamagePrevention: any[];
  artifactCount = Utilities.numberRange(0, 12);
  goalArtifacts = Goal.ARTIFACTS;
  defaultHeatDamageOption = HeatDamagePrevention.ANY_SUIT;

  constructor() {
    const config = new Config();
    this.goals = config.getDropdownsForField('goal');
    this.heatDamagePrevention = config.getDropdownsForField('heatDamagePrevention');
  }

  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Utilities } from '../../../common/Utilities';
import { Goal } from '../../../common/randomizer/enums/goal';
import { Config } from '../../../common/randomizer/Config';

@Component({
  selector: 'app-main-rules',
  templateUrl: './main-rules.component.html',
  styleUrls: ['./main-rules.component.scss']
})
export class MainRulesComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  goals: any[];
  artifactCount = Utilities.numberRange(0, 12);
  goalArtifacts = Goal.ARTIFACTS;

  constructor() {
    const config = new Config();
    this.goals = config.getDropdownsForField('goal');
  }

  ngOnInit() {}

}

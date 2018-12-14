import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Utilities } from '../../../common/Utilities';

@Component({
  selector: 'app-main-rules',
  templateUrl: './main-rules.component.html',
  styleUrls: ['./main-rules.component.scss']
})
export class MainRulesComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  goals = [
    { name: 'Artifact Collection', value: 'artifacts' },
    { name: 'All Bosses', value: 'all-bosses' }
  ];
  artifactCount = Utilities.numberRange(0, 12);

  constructor() {}

  ngOnInit() {}

}

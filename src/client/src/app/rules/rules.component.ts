import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getChoices } from '../../../../electron/models/prime/randomizerSettings';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  @Input('form') private form: FormGroup;
  goals = getChoices('goal');

  constructor() { }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.form;
  }

}

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
  private readonly choices = {
    goal: getChoices('goal'),
    goalArtifacts: getChoices('goalArtifacts'),
    heatProtection: getChoices('heatProtection'),
    suitDamageReduction: getChoices('suitDamageReduction')
  };
  private readonly artifactCollection = 'artifact-collection';

  constructor() { }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.form;
  }

  getDropdownChoices(name: string) {
    return this.choices[name];
  }

  isArtifactCollectionSelected(): boolean {
    return this.form.get('goal').value === this.artifactCollection;
  }
}

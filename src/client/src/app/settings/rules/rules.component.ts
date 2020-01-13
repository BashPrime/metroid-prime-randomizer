import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  @Input() disabled: boolean;
  readonly SETTINGS = this.randomizerService.SETTINGS;
  private form: FormGroup;
  private readonly DEFAULT_SETTINGS = this.randomizerService.DEFAULT_SETTINGS;
  private readonly ARTIFACT_COLLECTION = 'artifact-collection';


  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      goal: [this.DEFAULT_SETTINGS.goal],
      goalArtifacts: [this.DEFAULT_SETTINGS.goalArtifacts],
      artifactLocationHints: [this.DEFAULT_SETTINGS.artifactLocationHints],
      heatProtection: [this.DEFAULT_SETTINGS.heatProtection],
      suitDamageReduction: [this.DEFAULT_SETTINGS.suitDamageReduction]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getChoices(settingName: string) {
    return this.SETTINGS.find(setting => setting.name === settingName).choices;
  }

  isArtifactCollectionSelected(): boolean {
    return this.form.get('goal').value === this.ARTIFACT_COLLECTION;
  }
}

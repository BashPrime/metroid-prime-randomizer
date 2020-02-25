import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends SettingsSection implements OnInit {
  @Input() private form: FormGroup;

  // Constants
  private readonly ARTIFACT_COLLECTION = 'artifact-collection';

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.form;
  }

  isArtifactCollectionSelected(): boolean {
    return this.form.get('goal').value === this.ARTIFACT_COLLECTION;
  }
}

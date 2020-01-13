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
  @Input() disabled: boolean;
  @Input() private form: FormGroup;
  readonly OBJECT_KEYS = Object.keys;
  readonly SETTINGS = this.randomizerService.SETTINGS;
  private readonly ARTIFACT_COLLECTION = 'artifact-collection';

  constructor(private randomizerService: RandomizerService) {
    super();
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

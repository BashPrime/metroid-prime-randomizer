import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends SettingsSection implements OnInit {
  private formGroup: FormGroup;

  // Constants
  private readonly ARTIFACT_COLLECTION = 'artifact-collection';

  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.formGroup = this.controlContainer.control.get('rules') as FormGroup;
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getRandomStartingItemsFormGroup(): FormGroup {
    return this.formGroup.controls.randomStartingItems as FormGroup;
  }

  isArtifactCollectionSelected(): boolean {
    return this.formGroup.get('goal').value === this.ARTIFACT_COLLECTION;
  }
}

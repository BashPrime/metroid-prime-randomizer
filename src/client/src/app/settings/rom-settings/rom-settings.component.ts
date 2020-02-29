import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent extends SettingsSection implements OnInit {
  private formGroup: FormGroup;
  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.formGroup = this.controlContainer.control.get('romSettings') as FormGroup;
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }
}

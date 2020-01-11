import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { settings } from '../../../../../electron/models/prime/randomizerSettings';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  readonly settings = this.randomizerService.settings;
  readonly optionTypes = {
    number: 0,
    string: 1,
    boolean: 2,
    select: 3
  };
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
  }

  getForm(): FormGroup {
    return this.form;
  }
}

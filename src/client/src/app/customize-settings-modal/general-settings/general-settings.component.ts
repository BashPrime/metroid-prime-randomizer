import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { getSetting } from '../../../../../electron/models/prime/randomizerSettings';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  getSetting = getSetting;
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
  }

  getForm(): FormGroup {
    return this.form;
  }
}

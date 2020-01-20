import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.scss']
})
export class ListSettingsComponent extends SettingsSection implements OnInit {
  @Input() useColumns: boolean;
  @Input() form: FormGroup;
  readonly OBJECT_KEYS = Object.keys;
  readonly SETTINGS = this.randomizerService.SETTINGS;
  readonly DETAILS = this.randomizerService.DETAILS;

  constructor(private randomizerService: RandomizerService) {
    super();
  }

  ngOnInit() {
  }

  getChoiceName(name: string) {
    const settingValue = this.form.get(name).value;

    // Using == because the value can be a number.
    return this.getChoices(name).find(choice => choice.value == settingValue).name;
  }
}

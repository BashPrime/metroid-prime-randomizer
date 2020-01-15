import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-read-only-settings',
  templateUrl: './read-only-settings.component.html',
  styleUrls: ['./read-only-settings.component.scss']
})
export class ReadOnlySettingsComponent extends SettingsSection implements OnInit {
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

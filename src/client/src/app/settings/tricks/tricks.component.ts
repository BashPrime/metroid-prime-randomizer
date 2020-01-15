import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { RandomizerService } from '../../services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent extends SettingsSection implements OnInit {
  @Input() form: FormArray
  @Input() disabled: boolean;
  tricks: PickList = {
    available: [],
    selected: []
  };
  private fb = new FormBuilder();
  readonly SETTINGS = undefined;
  readonly DETAILS = this.randomizerService.DETAILS;

  constructor(private randomizerService: RandomizerService) {
    super();
  }

  ngOnInit() {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of Object.keys(settings.allowedTricks)) {
      const trickDetails = this.randomizerService.DETAILS[key];

      if (trickDetails) {
        const trick = {
          label: trickDetails.name,
          value: key,
          tooltip: trickDetails.description
        };

        // If form contains value on init, push to selected tricks. Else, push to available tricks.
        if (this.form.value.includes(trick.value)) {
          this.tricks.selected.push(trick);
        } else {
          this.tricks.available.push(trick);
        }
      }
    }
  }

  addItems(event: any): void {
    const items = (event.items as SelectItem[]).map(item => item.value);

    for (let item of items) {
      this.form.push(this.fb.control(item));
    }
  }

  removeItems(event: any): void {
    const items = (event.items as SelectItem[]).map(item => item.value);

    for (let item of items) {
      const formValue = this.form.value;
      this.form.removeAt(formValue.indexOf(item));
    }
  }
}

interface PickList {
  available: SelectItem[];
  selected: SelectItem[];
}

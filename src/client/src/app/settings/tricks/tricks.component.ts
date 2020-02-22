import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { RandomizerService } from '../../services/randomizer.service';
import { PicklistFormComponent } from 'src/app/components/common/picklist-form.component';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent extends PicklistFormComponent implements OnInit {
  @Input() protected form: FormArray;

  // Constants
  readonly GLOBAL_STYLE = { height: '100%' };
  readonly SETTINGS = undefined;
  readonly DETAILS = this.randomizerService.DETAILS;

  constructor(private randomizerService: RandomizerService) {
    super();
  }

  ngOnInit() {
    this.initialize();
  }

  protected initialize(): void {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of Object.keys(settings.tricks)) {
      const trickDetails = this.randomizerService.DETAILS[key];

      if (trickDetails) {
        const trick = {
          label: trickDetails.name,
          value: key,
          tooltip: trickDetails.description
        };

        // If form contains value on init, push to selected tricks. Else, push to available tricks.
        if (this.form.value.includes(trick.value)) {
          this.items.selected.push(trick);
        } else {
          this.items.available.push(trick);
        }
      }
    }
  }
}

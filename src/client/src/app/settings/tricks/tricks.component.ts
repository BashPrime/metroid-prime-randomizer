import { Component, OnInit } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

import { RandomizerService } from '../../services/randomizer.service';
import { PicklistFormComponent } from 'src/app/components/common/picklist-form.component';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent extends PicklistFormComponent implements OnInit {
  protected formArray: FormArray;

  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.formArray = this.controlContainer.control.get('tricks') as FormArray;
    this.initialize();
  }

  protected initialize(): void {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of Object.keys(settings.tricks)) {
      const trickDetails = this.DETAILS[key];

      const trick = {
        label: trickDetails ? trickDetails.name : key,
        value: key,
        tooltip: trickDetails ? trickDetails.description : null
      };

      // If form contains value on init, push to selected tricks. Else, push to available tricks.
      if (this.formArray.value.includes(trick.value)) {
        this.items.selected.push(trick);
      } else {
        this.items.available.push(trick);
      }
    }

    // Sort selected and unselected items
    this.items.selected.sort((a, b) => {
      if (a.label < b.label) return -1;
      else if (a.label > b.label) return 1;
      return 0;
    });

    this.items.available.sort((a, b) => {
      if (a.label < b.label) return -1;
      else if (a.label > b.label) return 1;
      return 0;
    });
  }
}

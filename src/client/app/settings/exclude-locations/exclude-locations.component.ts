import { Component, OnInit } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

import { PicklistFormComponent } from 'src/app/components/common/picklist-form.component';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-exclude-locations',
  templateUrl: './exclude-locations.component.html',
  styleUrls: ['./exclude-locations.component.scss']
})
export class ExcludeLocationsComponent extends PicklistFormComponent implements OnInit {
  protected formArray: FormArray;

  // Constants
  readonly GLOBAL_STYLE = { height: 'calc(100% - 0.75rem)' };

  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.formArray = this.controlContainer.control.get('excludeLocations') as FormArray;
    this.initialize();
  }

  protected initialize(): void {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of settings.excludeLocations.getSettingsKeys()) {
      const location = {
        label: key,
        value: key
      };

      // If form contains value on init, push to selected locations. Else, push to available locations.
      if (this.formArray.value.includes(location.value)) {
        this.items.selected.push(location);
      } else {
        this.items.available.push(location);
      }
    }
  }
}

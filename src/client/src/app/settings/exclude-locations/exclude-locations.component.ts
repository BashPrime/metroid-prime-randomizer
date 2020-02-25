import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { PicklistFormComponent } from 'src/app/components/common/picklist-form.component';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-exclude-locations',
  templateUrl: './exclude-locations.component.html',
  styleUrls: ['./exclude-locations.component.scss']
})
export class ExcludeLocationsComponent extends PicklistFormComponent implements OnInit {
  @Input() protected form: FormArray;

  // Constants
  readonly GLOBAL_STYLE = { height: '100%' };

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.initialize();
  }

  protected initialize(): void {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of Object.keys(settings.excludeLocations)) {
      const location = {
        label: key,
        value: key
      };

      // If form contains value on init, push to selected locations. Else, push to available locations.
      if (this.form.value.includes(location.value)) {
        this.items.selected.push(location);
      } else {
        this.items.available.push(location);
      }
    }
  }
}

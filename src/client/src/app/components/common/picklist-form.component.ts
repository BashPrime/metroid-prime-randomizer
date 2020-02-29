import { FormArray, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { SettingsSection } from 'src/app/settings/settings-section';
import { RandomizerService } from 'src/app/services/randomizer.service';

export abstract class PicklistFormComponent extends SettingsSection {
  items: PickList = {
    available: [],
    selected: []
  };
  protected abstract formArray: FormArray;
  private fb = new FormBuilder();

  // Constants
  readonly GLOBAL_STYLE = { height: '100%' };

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.initialize();
  }

  addItems(event: any): void {
    const items = (event.items as SelectItem[]).map(item => item.value);

    for (let item of items) {
      this.formArray.push(this.fb.control(item));
    }
  }

  removeItems(event: any): void {
    const items = (event.items as SelectItem[]).map(item => item.value);

    for (let item of items) {
      const formValue = this.formArray.value;
      this.formArray.removeAt(formValue.indexOf(item));
    }
  }

  protected abstract initialize(): void;
}

export interface PickList {
  available: SelectItem[];
  selected: SelectItem[];
}

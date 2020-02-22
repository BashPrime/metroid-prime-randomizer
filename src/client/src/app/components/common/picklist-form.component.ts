import { FormArray, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { SettingsSection } from 'src/app/settings/settings-section';

export abstract class PicklistFormComponent extends SettingsSection {
  protected abstract form: FormArray;
  items: PickList = {
    available: [],
    selected: []
  };
  private fb = new FormBuilder();

  // Constants
  readonly GLOBAL_STYLE = { height: '100%' };

  constructor() {
    super();
  }

  ngOnInit() {
    this.initialize();
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

  protected abstract initialize(): void;
}

export interface PickList {
  available: SelectItem[];
  selected: SelectItem[];
}

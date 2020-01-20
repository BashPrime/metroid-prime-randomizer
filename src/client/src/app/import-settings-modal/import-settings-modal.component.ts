import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../components/common/modal.component';

@Component({
  selector: 'app-import-settings-modal',
  templateUrl: './import-settings-modal.component.html',
  styleUrls: ['./import-settings-modal.component.scss']
})
export class ImportSettingsModalComponent extends ModalComponent implements OnInit {
  private form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      seed: ['', [Validators.required]],
      settingsString: ['', [Validators.required]]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }
}

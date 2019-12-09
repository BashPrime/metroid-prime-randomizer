import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-import-settings-modal',
  templateUrl: './import-settings-modal.component.html',
  styleUrls: ['./import-settings-modal.component.scss']
})
export class ImportSettingsModalComponent implements OnInit {
  private open: boolean = false;
  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      seed: [null, [Validators.required]],
      settingsString: ['', [Validators.required]]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customize-settings-modal',
  templateUrl: './customize-settings-modal.component.html',
  styleUrls: ['./customize-settings-modal.component.scss']
})
export class CustomizeSettingsModalComponent implements OnInit {
  private open: boolean = false;
  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      settings: [null]
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

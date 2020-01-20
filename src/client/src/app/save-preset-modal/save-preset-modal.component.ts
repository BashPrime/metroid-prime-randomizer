import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PresetModalComponent } from '../components/common/preset-modal.component';

@Component({
  selector: 'app-save-preset-modal',
  templateUrl: './save-preset-modal.component.html',
  styleUrls: ['./save-preset-modal.component.scss']
})
export class SavePresetModalComponent extends PresetModalComponent implements OnInit {
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

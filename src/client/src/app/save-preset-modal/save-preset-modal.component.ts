import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../components/common/modal.component';
import { PresetObject } from '../../../../common/models/presetObject';

@Component({
  selector: 'app-save-preset-modal',
  templateUrl: './save-preset-modal.component.html',
  styleUrls: ['./save-preset-modal.component.scss']
})
export class SavePresetModalComponent extends ModalComponent implements OnInit {
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  private presets: PresetObject = {};
  private form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeForm();
  }

  setPresetsObjectAndOpen(presets: PresetObject) {
    this.presets = presets;
    this.initializeForm();
    this.setOpen(true);
  }

  getForm(): FormGroup {
    return this.form;
  }

  getPresets(): PresetObject {
    return this.presets;
  }

  onSavePreset(formValue: SavePresetForm): void {
    if (this.form.valid) {
      this.onSave.emit(formValue.preset);
      this.setOpen(false);
    }
  }

  getPresetsAsDropdown(): string[] {
    return ['', ...Object.keys(this.presets)];
  }

  onPresetsDropdownChange(event) {
    this.form.patchValue({ preset: event.target.value });
    this.form.get('preset').markAsDirty();
  }

  get preset() {
    return this.form.get('preset');
  }

  private initializeForm(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      preset: ['', [Validators.required]]
    });
  }
}

interface SavePresetForm {
  preset: string;
}

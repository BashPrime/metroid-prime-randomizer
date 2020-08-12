import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ModalComponent } from '../components/common/modal.component';
import { PresetObject } from '../../../../common/models/presetObject';
import { PresetsService } from '../services/presets.service';

@Component({
  selector: 'app-save-preset-modal',
  templateUrl: './save-preset-modal.component.html',
  styleUrls: ['./save-preset-modal.component.scss']
})
export class SavePresetModalComponent extends ModalComponent implements OnInit {
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  private presets: PresetObject = {};
  private formGroup: FormGroup;
  private submitted: boolean = false;

  constructor(private presetsService: PresetsService) {
    super();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openModal() {
    this.presetsService._userPresets
      .pipe(take(1))
      .subscribe(presets => {
        this.presets = presets;
        this.submitted = false;
        this.initializeForm();
        this.setOpen(true);
      });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getPresets(): PresetObject {
    return this.presets;
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  onSavePreset(formValue: SavePresetForm): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.onSave.emit(formValue.preset);
      this.setOpen(false);
    }
  }

  getPresetsAsDropdown(): string[] {
    return ['', ...Object.keys(this.presets)];
  }

  onPresetsDropdownChange(event) {
    this.formGroup.patchValue({ preset: event.target.value });
    this.formGroup.get('preset').markAsDirty();
  }

  get preset() {
    return this.formGroup.get('preset');
  }

  private initializeForm(): void {
    const fb = new FormBuilder();
    this.formGroup = fb.group({
      preset: ['', [Validators.required]]
    });
  }
}

interface SavePresetForm {
  preset: string;
}

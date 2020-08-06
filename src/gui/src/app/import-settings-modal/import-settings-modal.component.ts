import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../components/common/modal.component';
import { GeneratorService } from '../services/generator.service';

interface ImportForm {
  permalink: string;
}

@Component({
  selector: 'app-import-settings-modal',
  templateUrl: './import-settings-modal.component.html',
  styleUrls: ['./import-settings-modal.component.scss']
})
export class ImportSettingsModalComponent extends ModalComponent implements OnInit {
  private formGroup: FormGroup;
  private submitted: boolean = false;

  constructor(private generatorService: GeneratorService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  openModal(): void {
    this.submitted = false;
    this.initForm();
    navigator.clipboard.readText().then(clipboardText => {
      this.formGroup.patchValue({ permalink: clipboardText });
    });
    this.setOpen(true);
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  onSubmit(formValue: ImportForm) {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.generatorService.importPermalink(formValue.permalink);
      this.setOpen(false);
    }
  }

  get permalink() {
    return this.formGroup.get('permalink');
  }

  private initForm(): void {
    const fb = new FormBuilder();
    this.formGroup = fb.group({
      permalink: ['', Validators.required]
    });
  }
}

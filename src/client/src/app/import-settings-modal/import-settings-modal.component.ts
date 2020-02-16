import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../components/common/modal.component';
import { GeneratorService } from '../services/generator.service';

interface ImportForm {
  seed: string;
  settingsString: string;
}

@Component({
  selector: 'app-import-settings-modal',
  templateUrl: './import-settings-modal.component.html',
  styleUrls: ['./import-settings-modal.component.scss']
})
export class ImportSettingsModalComponent extends ModalComponent implements OnInit {
  private form: FormGroup;

  constructor(private generatorService: GeneratorService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  openModal(): void {
    this.initForm();
    this.setOpen(true);
  }

  getForm(): FormGroup {
    return this.form;
  }

  onSubmit(formValue: ImportForm) {
    if (this.form.valid) {
      this.generatorService.importSeed(formValue.seed, formValue.settingsString);
      this.setOpen(false);
    }
  }

  private initForm(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      seed: ['', [Validators.required]],
      settingsString: ['', [Validators.required]]
    });
  }
}

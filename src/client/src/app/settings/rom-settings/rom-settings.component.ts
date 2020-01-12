import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  @Input() disabled: boolean;
  readonly settings = this.randomizerService.settings;
  readonly optionTypes = {
    number: 0,
    string: 1,
    boolean: 2,
    select: 3
  };
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
  }

  getForm(): FormGroup {
    return this.form;
  }
}

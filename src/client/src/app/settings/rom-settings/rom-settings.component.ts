import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  @Input() disabled: boolean;
  readonly settings = this.randomizerService.SETTINGS;
  readonly optionTypes = {
    number: 0,
    string: 1,
    boolean: 2,
    select: 3
  };
  private form: FormGroup;
  private readonly DEFAULT_SETTINGS = this.randomizerService.DEFAULT_SETTINGS;

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      skipFrigate: [this.DEFAULT_SETTINGS.skipFrigate],
      skipHudPopups: [this.DEFAULT_SETTINGS.skipHudPopups],
      hideItemModels: [this.DEFAULT_SETTINGS.hideItemModels]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }
}

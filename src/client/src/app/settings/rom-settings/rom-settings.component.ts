import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { SettingsSection } from '../settings-section';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent extends SettingsSection implements OnInit {
  @Input() private form: FormGroup;

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.form;
  }
}

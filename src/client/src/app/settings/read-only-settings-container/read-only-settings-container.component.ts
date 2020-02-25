import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SettingsSection } from '../settings-section';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-read-only-settings-container',
  templateUrl: './read-only-settings-container.component.html',
  styleUrls: ['./read-only-settings-container.component.scss']
})
export class ReadOnlySettingsContainerComponent extends SettingsSection implements OnInit {
  @Input() private form: FormGroup;

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
  }

  getForm() {
    return this.form;
  }
}

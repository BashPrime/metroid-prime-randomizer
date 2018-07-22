import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  @Input('group') private romSettingsForm: FormGroup;
  model = {};
  submitted = false;
  constructor(private randomizerService: RandomizerService, private electronService: ElectronService) { }

  ngOnInit() {
    this.model = this.randomizerService.getSettings();
    this.randomizerService.getSubmittedFlag().subscribe(submitted => {
      this.submitted = submitted;
    });
  }

  selectBaseIso() {
    const result = this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] }
      ],
      properties: ['openFile']
    });

    this.model['baseIso'] = result ? result[0] : undefined;
    if (result) {
      this.romSettingsForm.get('baseIso').setValue(result[0]);
    }
  }

  selectOutputFolder() {
    const result = this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (result) {
      this.romSettingsForm.get('outputFolder').setValue(result[0]);
    }
  }

}

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
  @Input('group') romSettingsForm: FormGroup;
  submitted = false;
  constructor(private randomizerService: RandomizerService, private electronService: ElectronService) { }

  ngOnInit() {
    this.randomizerService.getSubmittedFlag().subscribe(submitted => {
      this.submitted = submitted;
    });
  }

  selectBaseIso() {
    const result = this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

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

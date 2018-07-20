import { Component, OnInit } from '@angular/core';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  model = {};
  constructor(private randomizerService: RandomizerService, private electronService: ElectronService) { }

  ngOnInit() {
    this.model = this.randomizerService.getSettings();
  }

  selectCleanIso() {
    return this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] }
      ],
      properties: ['openFile']
    })[0];
  }

  selectFolder() {
    return this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    })[0];
  }

}

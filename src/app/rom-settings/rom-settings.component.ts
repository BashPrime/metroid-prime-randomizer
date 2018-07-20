import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  model = {};
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  selectIso() {
    return this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] }
      ],
      properties: ['openFile']
    });
  }

  selectFolder() {
    return this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    });
  }

}

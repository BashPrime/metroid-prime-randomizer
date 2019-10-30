import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  @Input('form') private form: FormGroup;

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  getForm(): FormGroup {
    return this.form;
  }

  selectBaseIso() {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.get('baseIso').setValue(result.filePaths[0]);
      }
    });
  }

  selectTrilogyIso() {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'Wii ISO Files', extensions: ['iso', 'wbfs'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.get('trilogyIso').setValue(result.filePaths[0]);
      }
    });
  }

  selectOutputFolder() {
    this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled) {
        this.form.get('outputFolder').setValue(result.filePaths[0]);
      }
    });
  }

}

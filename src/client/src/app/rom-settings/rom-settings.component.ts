import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ElectronService } from '../services/electron.service';

const NO_OUTPUT = 'none';

@Component({
  selector: 'app-rom-settings',
  templateUrl: './rom-settings.component.html',
  styleUrls: ['./rom-settings.component.scss']
})
export class RomSettingsComponent implements OnInit {
  @Input('form') private form: FormGroup;
  private fileControlsDisabled: boolean = false;
  fileControlsDisabled$ = new Subject<boolean>();
  fileTypes = [
    { name: 'ISO', value: 'iso' },
    { name: 'Compressed ISO', value: 'ciso' },
    { name: 'GCZ', value: 'gcz' },
    { name: 'No Output', value: 'none' }
  ];

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      const isNoOutput = this.form.get('outputType').value === NO_OUTPUT;

      if (this.fileControlsDisabled !== isNoOutput) {
        this.fileControlsDisabled = isNoOutput;
        this.fileControlsDisabled$.next(this.fileControlsDisabled);
      }
    });

    this.fileControlsDisabled$.subscribe(disabled => this.setFileControlsDisabled(disabled));
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

  private setFileControlsDisabled(disabled: boolean): void {
    const controls = [
      'baseIso',
      'trilogyIso'
    ];
    const options = { emitEvent: false };

    for(let control of controls) {
      if (disabled) {
        this.form.get(control).disable(options);
      } else {
        this.form.get(control).enable(options);
      }
    }
  }
}

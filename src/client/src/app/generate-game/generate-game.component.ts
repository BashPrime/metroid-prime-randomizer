import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { CustomizeSettingsModalComponent } from '../customize-settings-modal/customize-settings-modal.component';
import * as presetsDefaultJson from '../../assets/data/presetsDefault.json';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  readonly items: SelectItem[] = [
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test1' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test2' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test3' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test4' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test5' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test6' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test7' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test8' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test9' },
  ];
  objectKeys = Object.keys;
  @ViewChild(CustomizeSettingsModalComponent, {static: false}) private modal: CustomizeSettingsModalComponent;
  private defaultPresets = (presetsDefaultJson as any).default;
  private presets: object = {};
  private selectedPreset: string = 'Custom';
  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      settings: [null]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getDefaultPresets(): object {
    return this.defaultPresets;
  }

  getSelectedPreset(): string {
    return this.selectedPreset;
  }

  setSelectedPreset(preset: string) {
    this.selectedPreset = preset;
  }

  isSelected(key: string): boolean {
    return key === this.selectedPreset;
  }

  openModal(): void {
    this.modal.setOpen(true);
  }
}

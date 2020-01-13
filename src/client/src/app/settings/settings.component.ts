import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Tab } from '../../../../common/models/tab';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() disabled: boolean;
  readonly tabIds = {
    rom: 0,
    rules: 1,
    tricks: 2
  };
  readonly tabs: Tab[] = [
    { id: this.tabIds.rom, name: 'ROM Settings' },
    { id: this.tabIds.rules, name: 'Rules' },
    { id: this.tabIds.tricks, name: 'Tricks' }
  ];
  private selectedTabId = this.tabIds.rom;

  constructor() { }

  ngOnInit() {
  }

  setSelectedTabId(tabId: number) {
    this.selectedTabId = tabId;
  }

  isTabIdSelected(tabId: number): boolean {
    return tabId === this.selectedTabId;
  }
}

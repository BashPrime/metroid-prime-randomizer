import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

import { Tab } from '../../../../../common/models/tab';

@Component({
  selector: 'app-customize-settings-container',
  templateUrl: './customize-settings-container.component.html',
  styleUrls: ['./customize-settings-container.component.scss']
})
export class CustomizeSettingsContainerComponent implements OnInit {
  @Input() disabled: boolean;

  readonly tabIds = {
    rom: 0,
    rules: 1,
    itemOverrides: 2,
    excludeLocations: 3,
    tricks: 4
  };
  readonly tabs: Tab[] = [
    { id: this.tabIds.rom, name: 'ROM Settings' },
    { id: this.tabIds.rules, name: 'Rules' },
    { id: this.tabIds.itemOverrides, name: 'Item Overrides' },
    { id: this.tabIds.excludeLocations, name: 'Exclude Locations' },
    { id: this.tabIds.tricks, name: 'Tricks' }
  ];
  private selectedTabId = this.tabIds.rom;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
  }

  getFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  setSelectedTabId(tabId: number) {
    this.selectedTabId = tabId;
  }

  isTabIdSelected(tabId: number): boolean {
    return tabId === this.selectedTabId;
  }
}

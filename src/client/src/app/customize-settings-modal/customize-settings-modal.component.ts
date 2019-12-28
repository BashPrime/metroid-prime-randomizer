import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Tab } from '../../../../common/models/tab';

@Component({
  selector: 'app-customize-settings-modal',
  templateUrl: './customize-settings-modal.component.html',
  styleUrls: ['./customize-settings-modal.component.scss']
})
export class CustomizeSettingsModalComponent implements OnInit {
  readonly tabIds = {
    general: 0,
    tricks: 1
  };
  readonly tabs: Tab[] = [
    { id: this.tabIds.general, name: 'General' },
    { id: this.tabIds.tricks, name: 'Tricks' }
  ];
  private selectedTabId = this.tabIds.general;
  private open: boolean = false;
  private form: FormGroup;

  constructor() {}

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      settings: [null]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  setSelectedTabId(tabId: number) {
    this.selectedTabId = tabId;
  }

  isTabIdSelected(tabId: number): boolean {
    return tabId === this.selectedTabId;
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';

import { TabService } from '../services/tab.service';
import { ImportSettingsModalComponent } from '../import-settings-modal/import-settings-modal.component';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild(ImportSettingsModalComponent, {static: false}) private importPermalinkModal: ImportSettingsModalComponent;

  // Constants
  private readonly generateGameTab = 1;
  private readonly helpTab = 3;

  constructor(private tabService: TabService, private electronService: ElectronService) { }

  ngOnInit() {
  }

  goToGenerateGame(): void {
    this.tabService.selectTab(this.generateGameTab);
  }

  goToHelp(): void {
    this.tabService.selectTab(this.helpTab);
  }

  openImportPermalinkModal(): void {
    this.importPermalinkModal.openModal();
  }

  openSeedHistory(): void {
    this.electronService.ipcRenderer.send('openSeedHistoryFolder');
  }
}

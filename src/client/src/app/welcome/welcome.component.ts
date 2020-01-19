import { Component, OnInit, ViewChild } from '@angular/core';

import { ElectronService } from '../services/electron.service';
import { TabService } from '../services/tab.service';
import { ImportSettingsModalComponent } from '../import-settings-modal/import-settings-modal.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild(ImportSettingsModalComponent, {static: false}) private modal: ImportSettingsModalComponent;

  // Constants
  readonly faqLink = 'https://randomizer.metroidpime.run/randomizer/prime/article/faq';
  private readonly generateGameTab = 1;

  constructor(private tabService: TabService, private electronService: ElectronService) { }

  ngOnInit() {
  }

  openExternalUrl(url: string) {
    this.electronService.shell.openExternal(url);
  }

  goToGenerateGame() {
    this.tabService.selectTab(this.generateGameTab);
  }

  openModal() {
    this.modal.setOpen(true);
  }
}

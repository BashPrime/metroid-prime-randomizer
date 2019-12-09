import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../services/electron.service';
import { ApplicationService } from '../services/application.service';
import { ImportSettingsModalComponent } from '../import-settings-modal/import-settings-modal.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  readonly faqLink = 'https://randomizer.metroidpime.run/randomizer/prime/article/faq';
  @ViewChild(ImportSettingsModalComponent, {static: false}) private modal: ImportSettingsModalComponent;
  private readonly generateGameTab = 1;

  constructor(private applicationService: ApplicationService, private electronService: ElectronService) { }

  ngOnInit() {
  }

  openExternalUrl(url: string) {
    this.electronService.shell.openExternal(url);
  }

  goToGenerateGame() {
    this.applicationService.selectTab(this.generateGameTab);
  }

  openModal() {
    this.modal.setOpen(true);
  }
}

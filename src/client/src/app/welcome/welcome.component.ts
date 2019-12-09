import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../services/electron.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  readonly faqLink = 'https://randomizer.metroidpime.run/randomizer/prime/article/faq';
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
}

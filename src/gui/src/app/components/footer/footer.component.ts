import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub } from '@fortawesome/fontawesome-free-brands';
import { faGlobe, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  readonly icons = {
    discord: faDiscord,
    github: faGithub,
    reportIssue: faExclamationTriangle,
    website: faGlobe
  };

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  getAppVersion(): string {
    return this.utilsService.APP_VERSION;
  }

}

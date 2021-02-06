import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faDiscord, faGithub } from '@fortawesome/fontawesome-free-brands';
import { faGlobe, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { RandomizerService } from '../services/randomizer.service';
import { GeneratorService } from '../services/generator.service';
import { TabService } from '../services/tab.service';
import { Tab } from '../../../../common/models/tab';
import { UpdateService } from '../services/update.service';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  readonly icons = {
    discord: faDiscord,
    github: faGithub,
    reportIssue: faExclamationTriangle,
    website: faGlobe
  };
  readonly tabIds = {
    welcome: 0,
    generateGame: 1,
    gameDetails: 2,
    help: 3
  };
  private tabs: Tab[] = [
    { id: this.tabIds.welcome, name: 'Welcome' },
    { id: this.tabIds.generateGame, name: 'Generate Game' },
    { id: this.tabIds.gameDetails, name: 'Game Details', hidden: true },
    { id: this.tabIds.help, name: 'Help' }
  ];
  private selectedTabId: number = this.tabIds.welcome;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private randomizerService: RandomizerService,
    private tabService: TabService,
    private generatorService: GeneratorService,
    private electronService: ElectronService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    // Check for updates  
    this.updateService.checkForUpdates();

    // Subscribe to selected tab subject in application service
    this.tabService._selectedTabId
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(tabId => {
        this.selectedTabId = tabId;
      });

    // Enable game details tab when a seed gets generated
    this.generatorService._generatedSeeds
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(seeds => {
        if (seeds) {
          this.setTabHidden(this.tabIds.gameDetails, false);
          this.setSelectedTabId(this.tabIds.gameDetails);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTabs(): Tab[] {
    return this.tabs;
  }

  getVisibleTabs(): Tab[] {
    return this.tabs.filter(tab => !tab.hidden);
  }

  getSelectedTabId(): number {
    return this.selectedTabId;
  }

  getAppVersion(): string {
    return this.randomizerService.APP_VERSION;
  }

  setSelectedTabId(tabId: number) {
    this.selectedTabId = tabId;
  }

  isTabIdSelected(tabId: number): boolean {
    return tabId === this.selectedTabId;
  }

  setTabHidden(id: number, hidden: boolean): void {
    this.tabs.find(tab => tab.id === id).hidden = hidden;
  }

  openExternalUrl(url: string) {
    this.electronService.shell.openExternal(url);
  }
}

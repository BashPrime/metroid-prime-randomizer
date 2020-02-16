import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RandomizerService } from '../services/randomizer.service';
import { GeneratorService } from '../services/generator.service';
import { TabService } from '../services/tab.service';
import { Tab } from '../../../../common/models/tab';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  readonly tabIds = {
    welcome: 0,
    generateGame: 1
  };
  private tabs: Tab[] = [
    { id: this.tabIds.welcome, name: 'Welcome' },
    { id: this.tabIds.generateGame, name: 'Generate Game' }
  ];
  private selectedTabId: number = this.tabIds.welcome;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private randomizerService: RandomizerService, private tabService: TabService, private generatorService: GeneratorService) { }

  ngOnInit() {
    // Subscribe to selected tab subject in application service
    this.tabService._selectedTabId
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(tabId => {
      this.selectedTabId = tabId;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTabs(): Tab[] {
    return this.tabs;
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
}

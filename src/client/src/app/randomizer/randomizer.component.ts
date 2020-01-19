import { Component, OnInit } from '@angular/core';

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

  constructor(private tabService: TabService, private generatorService: GeneratorService) { }

  ngOnInit() {
    // Subscribe to selected tab subject in application service
    this.tabService.selectedTabId$.subscribe(tabId => {
      this.selectedTabId = tabId;
    });
  }

  getTabs(): Tab[] {
    return this.tabs;
  }

  getSelectedTabId(): number {
    return this.selectedTabId;
  }

  setSelectedTabId(tabId: number) {
    this.selectedTabId = tabId;
  }

  isTabIdSelected(tabId: number): boolean {
    return tabId === this.selectedTabId;
  }

  generateSeed(): void {
    this.generatorService.generateSeed();
  }
}

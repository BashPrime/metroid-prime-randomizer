import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../services/generator.service';
import { RandomizerService } from '../services/randomizer.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { ApplicationService } from '../services/application.service';
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

  constructor(private applicationService: ApplicationService, private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    // Subscribe to selected tab subject in application service
    this.applicationService.selectedTabId$.subscribe(tabId => {
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

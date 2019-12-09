import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratorService } from '../services/generator.service';
import { RandomizerService } from '../randomizer.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  readonly tabIds = {
    welcome: 0,
    generateGame: 1,
    history: 2
  };
  private tabs: Tab[] = [
    { id: this.tabIds.welcome, name: 'Welcome' },
    { id: this.tabIds.generateGame, name: 'Generate Game' },
    { id: this.tabIds.history, name: 'History' },
  ];
  private selectedTabId: number = this.tabIds.welcome;
  private form: FormGroup;

  constructor(private applicationService: ApplicationService, private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    // Get initial formgroup from randomizer service
    this.form = this.randomizerService.createForm();

    // Subscribe to selected tab subject in application service
    this.applicationService.selectedTabId$.subscribe(tabId => {
      this.selectedTabId = tabId;
    });
  }

  getForm(): FormGroup {
    return this.form;
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

interface Tab {
  id: number;
  name: string;
}

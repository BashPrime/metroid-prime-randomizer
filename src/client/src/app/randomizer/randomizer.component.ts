import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratorService } from '../services/generator.service';
import { RandomizerService } from '../randomizer.service';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  readonly tabIds = {
    generalSettings: 0,
    rules: 1,
    logic: 2,
    history: 3
  };
  private tabs: Tab[] = [
    { id: this.tabIds.generalSettings, name: 'General Settings' },
    { id: this.tabIds.rules, name: 'Rules' },
    { id: this.tabIds.logic, name: 'Logic' },
    { id: this.tabIds.history, name: 'History' }
  ];
  private selectedTabId: number = this.tabIds.generalSettings;
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    // Get initial formgroup from randomizer service
    this.form = this.randomizerService.createForm();
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

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
    romSettings: 0,
    rules: 1,
    logic: 2,
    history: 3
  };
  private tabs: Tab[] = [
    { id: this.tabIds.romSettings, name: 'ROM Settings' },
    { id: this.tabIds.rules, name: 'Rules' },
    { id: this.tabIds.logic, name: 'Logic' },
    { id: this.tabIds.history, name: 'History' }
  ];
  private selectedTabId: number = this.tabIds.romSettings;
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService, private generatorService: GeneratorService) { }

  ngOnInit() {
    this.randomizerService.form$.subscribe((form: RandomizerForm) => {
      if (form && form.seed) {
        this.form.patchValue({ seed: form.seed });
      }
    });

    this.createForm();
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

  generateSeed() {
    this.generatorService.generateSeed();
  }

  createForm() {
    const fb = new FormBuilder();

    this.form = fb.group({
      seed: ['']
    });

    this.randomizerService.replaceForm('randomizer', this.form);
  }
}

interface Tab {
  id: number;
  name: string;
}

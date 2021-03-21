import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { SettingsSection } from '../settings-section';
import { RandomizerService } from '../../services/randomizer.service';
import { RandomizerForm } from '../../../../../common/models/randomizerForm';
import { ItemOverrides } from '../../../../../electron/models/prime/itemOverrides';
import { ItemOverride } from '../../../../../common/models/itemOverride';
import { details, Difficulty } from '../../../../../common/data/settingsDetails';
import { TricksDetailModalComponent } from 'src/app/tricks-detail-modal/tricks-detail-modal.component';


@Component({
  selector: 'app-read-only-settings-container',
  templateUrl: './read-only-settings-container.component.html',
  styleUrls: ['./read-only-settings-container.component.scss']
})
export class ReadOnlySettingsContainerComponent extends SettingsSection implements OnInit {
  @Input() private randomizerForm: RandomizerForm;
  @ViewChild(TricksDetailModalComponent, { static: false }) private trickDetailModal: TricksDetailModalComponent;

  // Constants
  readonly STATES = ItemOverrides.STATES;
  readonly EXPANSIONS = ItemOverrides.EXPANSIONS;
  readonly DETAILS = details;
  private readonly DEFAULT_ITEMS = [
    'Combat Visor',
    'Scan Visor',
    'Power Beam'
  ];
  private trickLevels: string[];
  private startingItems: string[];
  private itemPool: string[];
  private miscSettings: string[];

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.randomizerForm) {
      this.setTrickLevels(this.buildTrickLevelsOutput(this.randomizerForm.tricks));
      this.setStartingItems(this.buildStartingItemsArray(this.randomizerForm.itemOverrides));
      this.setItemPool(this.buildItemPoolArray(this.randomizerForm.itemOverrides));
      this.setMiscSettings(this.buildMiscSettingsArray());
    }
  }

  getRandomizerForm(): RandomizerForm {
    return this.randomizerForm;
  }

  getTrickLevels(): string[] {
    return this.trickLevels;
  }

  setTrickLevels(trickOutput: string[]): void {
    this.trickLevels = trickOutput;
  }

  getStartingItems(): string[] {
    return this.startingItems;
  }

  setStartingItems(startingItems: string[]): void {
    this.startingItems = startingItems;
  }

  getItemPool(): string[] {
    return this.itemPool;
  }

  setItemPool(itemPool: string[]): void {
    this.itemPool = itemPool;
  }

  getMiscSettings(): string[] {
    return this.miscSettings;
  }

  setMiscSettings(miscSettings: string[]): void {
    this.miscSettings = miscSettings;
  }

  getValue(name: string, section: string) {
    const value = this.randomizerForm[section][name];
    return this.getChoiceName(name, value);
  }

  getTrickName(trick: string): string {
    return this.getDetails(trick) ? this.getDetails(trick).name : trick;
  }

  hasRandomStartingItems(): boolean {
    const randomStartingItems = this.randomizerForm.rules.randomStartingItems;
    return randomStartingItems.minimum > 0 || randomStartingItems.maximum > 0;
  }

  buildStartingItemsArray(itemOverrides: ItemOverride[]): string[] {
    const startingItems = itemOverrides.filter(override => override.state === this.STATES.startingItem);
    const shuffledDefaultItems = itemOverrides.filter(override => override.state === this.STATES.shuffled && this.DEFAULT_ITEMS.includes(override.name));
    if ((!startingItems || !startingItems.length) && (!shuffledDefaultItems || !shuffledDefaultItems.length)) {
      return null;
    }

    return [...shuffledDefaultItems.map(item => 'No ' + item.name), ...startingItems.map(item => item.name)];
  }

  buildItemPoolArray(itemOverrides: ItemOverride[]): string[] {
    const shuffledItems = itemOverrides.filter(override => override.state === this.STATES.shuffled);

    if (!shuffledItems || !shuffledItems.length) {
      return null;
    }

    return shuffledItems.filter(item => this.DEFAULT_ITEMS.includes(item.name)).map(item => item.name);
  }

  buildMiscSettingsArray(): string[] {
    const miscSettings: string[] = [];

    if (!this.randomizerForm.romSettings.skipHudPopups) {
      miscSettings.push('HUD Popups Enabled');
    }

    if (this.randomizerForm.romSettings.hideItemModels) {
      miscSettings.push('Item Models Hidden');
    }

    if (this.randomizerForm.romSettings.enableMainPlazaLedgeDoor) {
      miscSettings.push('Main Plaza Ledge Door Enabled');
    }

    if (this.randomizerForm.romSettings.skipImpactCrater) {
      miscSettings.push('Impact Crater Removed');
    }

    return miscSettings.length ? miscSettings : null;
  }

  buildTrickLevelsOutput(tricks: string[]): string[] {
    if (!tricks || !tricks.length) {
      return null;
    }

    const totalTricks = Object.keys(this.DETAILS).filter(key => this.DETAILS[key].difficulty).length;
    const difficulties = {
      [Difficulty.TRIVIAL]: 0,
      [Difficulty.EASY]: 0,
      [Difficulty.NORMAL]: 0,
      [Difficulty.HARD]: 0,
      [Difficulty.INSANE]: 0,
      [Difficulty.OOB]: 0
    };

    for (let trick of tricks) {
      const difficulty = this.DETAILS[trick].difficulty;
      difficulties[difficulty]++;
    }

    const filteredDifficulties = Object.keys(difficulties)
      .filter(difficulty => difficulties[difficulty] > 0)
      .reduce((obj, key) => {
        obj[key] = difficulties[key];
        return obj;
      }, {});
    const filteredDifficultyKeys = Object.keys(filteredDifficulties);
    const trickLevels: string[] = [];

    for (let key of filteredDifficultyKeys) {
      trickLevels.push(filteredDifficulties[key] + ' ' + key);
    }

    return trickLevels;
  }

  formatItemOverrideOutput(override: ItemOverride): string {
    const choice = this.getChoiceName('itemOverride', override.state);
    let output: string = choice;

    if (this.EXPANSIONS.includes(override.name) || override.state === this.STATES.shuffled) {
      output += ` (${override.count})`;
    }

    return output;
  }

  openTricksDetailModal(): void {
    this.trickDetailModal.setOpen(true);
  }
}

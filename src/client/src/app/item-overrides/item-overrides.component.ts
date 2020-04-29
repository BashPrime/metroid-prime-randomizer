import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ControlContainer } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { SettingsSection } from '../settings/settings-section';
import { PrimeItem } from '../../../../electron/enums/primeItem';
import { ItemOverrides } from '../../../../electron/models/prime/itemOverrides';
import { ItemOverride } from '../../../../common/models/itemOverride';

interface Item {
  name: string;
  maximum: number;
  isExpansion?: boolean;
  exclude?: string[];
  experimental?: boolean;
}

@Component({
  selector: 'app-item-overrides',
  templateUrl: './item-overrides.component.html',
  styleUrls: ['./item-overrides.component.scss']
})
export class ItemOverridesComponent extends SettingsSection implements OnInit {
  selectedAvailableItem: Item;
  private formArray: FormArray;
  private globalFormGroup: FormGroup;
  private fb: FormBuilder = new FormBuilder();
  private items: Item[] = [
    { name: PrimeItem.MISSILE_LAUNCHER, maximum: 1 },
    { name: PrimeItem.MORPH_BALL, maximum: 1 },
    { name: PrimeItem.MORPH_BALL_BOMB, maximum: 1 },
    { name: PrimeItem.CHARGE_BEAM, maximum: 1 },
    { name: PrimeItem.SPACE_JUMP_BOOTS, maximum: 1 },
    { name: PrimeItem.WAVE_BEAM, maximum: 1 },
    { name: PrimeItem.ICE_BEAM, maximum: 1 },
    { name: PrimeItem.PLASMA_BEAM, maximum: 1 },
    { name: PrimeItem.SUPER_MISSILE, maximum: 1 },
    { name: PrimeItem.BOOST_BALL, maximum: 1 },
    { name: PrimeItem.SPIDER_BALL, maximum: 1 },
    { name: PrimeItem.POWER_BOMB, maximum: 1 },
    { name: PrimeItem.VARIA_SUIT, maximum: 1 },
    { name: PrimeItem.GRAVITY_SUIT, maximum: 1 },
    { name: PrimeItem.PHAZON_SUIT, maximum: 1 },
    { name: PrimeItem.GRAPPLE_BEAM, maximum: 1 },
    { name: PrimeItem.SCAN_VISOR, maximum: 1, exclude: [ItemOverrides.STATES.vanilla] },
    { name: PrimeItem.THERMAL_VISOR, maximum: 1 },
    { name: PrimeItem.XRAY_VISOR, maximum: 1 },
    { name: PrimeItem.WAVEBUSTER, maximum: 1 },
    { name: PrimeItem.ICE_SPREADER, maximum: 1 },
    { name: PrimeItem.FLAMETHROWER, maximum: 1 },
    { name: PrimeItem.ENERGY_TANK, maximum: 14, isExpansion: true, exclude: [ItemOverrides.STATES.vanilla] },
    { name: PrimeItem.MISSILE_EXPANSION, maximum: 49, isExpansion: true, exclude: [ItemOverrides.STATES.vanilla] },
    { name: PrimeItem.POWER_BOMB_EXPANSION, maximum: 4, isExpansion: true, exclude: [ItemOverrides.STATES.vanilla] }
  ];

  // Constants
  readonly ITEM_POOL_MAX_SIZE = 100;

  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.formArray = this.controlContainer.control.get('itemOverrides') as FormArray;
    this.globalFormGroup = this.controlContainer.control as FormGroup;
    this.assignFirstAvailableItem();
  }

  getFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  getFormArray(): FormArray {
    return this.formArray;
  }

  addFormItem(): void {
    const availableItemNames = this.getAvailableItems().map(item => item.name);

    // Add the new entry if its name is available
    if (availableItemNames.includes(this.selectedAvailableItem.name)) {
      this.formArray.push(this.fb.group({
        name: this.selectedAvailableItem.name,
        state: this.getSetting('itemOverride').default as string,
        count: this.selectedAvailableItem.maximum
      }));

      this.assignFirstAvailableItem();
    }
  }

  removeFormItem(index: number): void {
    this.formArray.removeAt(index);
  }

  removeAllItems(): void {
    this.formArray.clear();
  }

  getItems(): Item[] {
    return this.items;
  }

  getItem(itemName: string) {
    return this.items.find(item => item.name === itemName);
  }

  getAvailableItems(): Item[] {
    // Return subset of items that aren't already selected.
    return this.items.filter(item => {
      return !this.formArray.value.map(formGroup => formGroup.name).includes(item.name);
    });
  }

  getConditionalChoices(itemName: string) {
    const item = this.getItem(itemName);
    const choices = this.getChoices('itemOverride');

    // Filter out excluded state choices if exclude property exists
    if (item.exclude) {
      return choices.filter(choice => !item.exclude.includes(choice.value as string));
    }

    return choices;
  }

  isCountEnabled(override: ItemOverride): boolean {
    const item = this.getItem(override.name);

    // If item is not an expansion, disable when not shuffled
    if (!item.isExpansion && !(override.state === ItemOverrides.STATES.shuffled)) {
      return false;
    }

    // Otherwise, all other combinations are acceptable
    return true;
  }

  getItemPoolSize(): number {
    const activeOverrides = this.formArray.value as ItemOverride[];
    let itemPoolSize = 0;

    // Everything is shuffled except for scan visor
    for (let item of this.items) {
      const override = activeOverrides.find(overrideItem => overrideItem.name === item.name);

      if (override && override.state === ItemOverrides.STATES.shuffled) {
        itemPoolSize += override.count;
      } else if (!override && item.name !== PrimeItem.SCAN_VISOR) {
        itemPoolSize += item.maximum;
      }
    }

    // Handle artifacts
    if (this.globalFormGroup.get('rules').get('goal').value === 'artifact-collection') {
      itemPoolSize += this.globalFormGroup.get('rules').get('goalArtifacts').value;
    }

    return itemPoolSize;
  }

  getItemPoolCapacity(): number {
    const activeOverrides = this.formArray.value as ItemOverride[];
    let placedItems = 0;

    // Placed items will increment for any vanilla items, and if All Bosses is the goal
    if (this.globalFormGroup.get('rules').get('goal').value === 'all-bosses') {
      placedItems += 3;
    }

    for (let item of this.items) {
      const override = activeOverrides.find(overrideItem => overrideItem.name === item.name);

      if (override && override.state === ItemOverrides.STATES.vanilla) {
        placedItems += 1;
      }
    }

    return this.ITEM_POOL_MAX_SIZE - placedItems;
  }

  get itemPoolTextStyling(): object {
    return {
      'has-text-danger': this.getItemPoolSize() > this.getItemPoolCapacity()
    };
  }

  private assignFirstAvailableItem(): void {
    const availableItems = this.getAvailableItems();

    if (availableItems.length) {
      this.selectedAvailableItem = availableItems[0];
    }
  }
}

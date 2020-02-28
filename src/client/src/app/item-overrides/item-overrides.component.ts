import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { SettingsSection } from '../settings/settings-section';
import { PrimeItem } from '../../../../electron/enums/primeItem';
import { ItemOverrides } from '../../../../electron/models/prime/itemOverrides';
import { ItemOverride } from '../../../../common/models/itemOverride';

interface Item {
  name: string;
  maximum: number;
  isExpansion?: boolean;
}

@Component({
  selector: 'app-item-overrides',
  templateUrl: './item-overrides.component.html',
  styleUrls: ['./item-overrides.component.scss']
})
export class ItemOverridesComponent extends SettingsSection implements OnInit {
  @Input() protected formArray: FormArray;
  selectedAvailableItem: Item;
  private form: FormGroup;
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
    { name: PrimeItem.SCAN_VISOR, maximum: 1 },
    { name: PrimeItem.THERMAL_VISOR, maximum: 1 },
    { name: PrimeItem.XRAY_VISOR, maximum: 1 },
    { name: PrimeItem.WAVEBUSTER, maximum: 1 },
    { name: PrimeItem.ICE_SPREADER, maximum: 1 },
    { name: PrimeItem.FLAMETHROWER, maximum: 1 },
    { name: PrimeItem.ENERGY_TANK, maximum: 14, isExpansion: true },
    { name: PrimeItem.MISSILE_EXPANSION, maximum: 49, isExpansion: true },
    { name: PrimeItem.POWER_BOMB_EXPANSION, maximum: 4 , isExpansion: true }
  ];

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      itemOverrides: this.formArray
    });
    this.assignFirstAvailableItem();
  }

  getForm(): FormGroup {
    return this.form;
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

    // If item is an expansion, vanilla choice isn't used
    if (item.isExpansion) {
      return choices.filter(choice => choice.value !== ItemOverrides.STATES.vanilla);
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

  private assignFirstAvailableItem(): void {
    const availableItems = this.getAvailableItems();

    if (availableItems.length) {
      this.selectedAvailableItem = availableItems[0];
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { SettingsSection } from '../settings/settings-section';
import { PrimeItem } from '../../../../electron/enums/primeItem';

interface Item {
  name: string;
  maximum: number;
}

@Component({
  selector: 'app-item-overrides',
  templateUrl: './item-overrides.component.html',
  styleUrls: ['./item-overrides.component.scss']
})
export class ItemOverridesComponent extends SettingsSection implements OnInit {
  @Input() protected form: FormArray;
  selectedAvailableItem: Item;
  private fb: FormBuilder = new FormBuilder();
  private items: Item[] = [
    { name: PrimeItem.MISSILE_LAUNCHER, maximum: 1 },
    { name: PrimeItem.WAVE_BEAM, maximum: 1 },
    { name: PrimeItem.ICE_BEAM, maximum: 1 },
    { name: PrimeItem.PLASMA_BEAM, maximum: 1 },
    { name: PrimeItem.CHARGE_BEAM, maximum: 1 },
    { name: PrimeItem.SPACE_JUMP_BOOTS, maximum: 1 },
    { name: PrimeItem.SUPER_MISSILE, maximum: 1 },
    { name: PrimeItem.WAVEBUSTER, maximum: 1 },
    { name: PrimeItem.ICE_SPREADER, maximum: 1 },
    { name: PrimeItem.FLAMETHROWER, maximum: 1 },
    { name: PrimeItem.GRAPPLE_BEAM, maximum: 1 },
    { name: PrimeItem.MORPH_BALL, maximum: 1 },
    { name: PrimeItem.BOOST_BALL, maximum: 1 },
    { name: PrimeItem.SPIDER_BALL, maximum: 1 },
    { name: PrimeItem.MORPH_BALL_BOMB, maximum: 1 },
    { name: PrimeItem.POWER_BOMB, maximum: 1 },
    { name: PrimeItem.VARIA_SUIT, maximum: 1 },
    { name: PrimeItem.GRAVITY_SUIT, maximum: 1 },
    { name: PrimeItem.PHAZON_SUIT, maximum: 1 },
    { name: PrimeItem.SCAN_VISOR, maximum: 1 },
    { name: PrimeItem.THERMAL_VISOR, maximum: 1 },
    { name: PrimeItem.XRAY_VISOR, maximum: 1 },
    { name: PrimeItem.ENERGY_TANK, maximum: 14 },
    { name: PrimeItem.MISSILE_EXPANSION, maximum: 49 },
    { name: PrimeItem.POWER_BOMB_EXPANSION, maximum: 4 }
  ];

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
    this.assignFirstAvailableItem();
  }

  getForm(): FormArray {
    return this.form;
  }

  addFormItem(): void {
    const availableItemNames = this.getAvailableItems().map(item => item.name);

    // Add the new entry if its name is available
    if (availableItemNames.includes(this.selectedAvailableItem.name)) {
      this.form.push(this.fb.group({
        name: this.selectedAvailableItem.name,
        state: this.getSetting('itemOverride').default as string,
        count: 0
      }));

      this.assignFirstAvailableItem();
    }
  }

  removeFormItem(index: number): void {
    this.form.removeAt(index);
  }

  getItems(): Item[] {
    return this.items;
  }

  getAvailableItems(): Item[] {
    // Return subset of items that aren't already selected.
    return this.items.filter(item => {
      return !this.form.value.map(formGroup => formGroup.name).includes(item.name);
    });
  }

  private assignFirstAvailableItem(): void {
    const availableItems = this.getAvailableItems();

    if (availableItems.length) {
      this.selectedAvailableItem = availableItems[0];
    }
  }
}

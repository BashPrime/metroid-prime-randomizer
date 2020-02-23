
import * as bigInt from 'big-integer';

import * as Utilities from '../../utilities';
import { ItemOverride } from '../../../common/models/randomizerForm';
import { PrimeItem } from '../../enums/primeItem';

export class ItemOverrides {
  [PrimeItem.MISSILE_LAUNCHER]: ItemOverride;
  [PrimeItem.WAVE_BEAM]: ItemOverride;
  [PrimeItem.ICE_BEAM]: ItemOverride;
  [PrimeItem.PLASMA_BEAM]: ItemOverride;
  [PrimeItem.CHARGE_BEAM]: ItemOverride;
  [PrimeItem.SPACE_JUMP_BOOTS]: ItemOverride;
  [PrimeItem.SUPER_MISSILE]: ItemOverride;
  [PrimeItem.WAVEBUSTER]: ItemOverride;
  [PrimeItem.ICE_SPREADER]: ItemOverride;
  [PrimeItem.FLAMETHROWER]: ItemOverride;
  [PrimeItem.GRAPPLE_BEAM]: ItemOverride;
  [PrimeItem.MORPH_BALL]: ItemOverride;
  [PrimeItem.BOOST_BALL]: ItemOverride;
  [PrimeItem.SPIDER_BALL]: ItemOverride;
  [PrimeItem.MORPH_BALL_BOMB]: ItemOverride;
  [PrimeItem.POWER_BOMB]: ItemOverride;
  [PrimeItem.VARIA_SUIT]: ItemOverride;
  [PrimeItem.GRAVITY_SUIT]: ItemOverride;
  [PrimeItem.PHAZON_SUIT]: ItemOverride;
  [PrimeItem.SCAN_VISOR]: ItemOverride;
  [PrimeItem.THERMAL_VISOR]: ItemOverride;
  [PrimeItem.XRAY_VISOR]: ItemOverride;

  // Constants
  static readonly SHUFFLE_MIN: number = 1;
  static readonly SHUFFLE_MAX: number = 10;
  static readonly STATES = {
    vanilla: 'vanilla',
    startingItem: 'starting-item',
    shuffled: 'shuffled'
  }

  constructor(overrides?: ItemOverride[]) {
    if (overrides) {
      this.setUpOverrides(overrides);
    }
  }

  getOverridesKeys(): string[] {
    return [
      PrimeItem.MISSILE_LAUNCHER,
      PrimeItem.WAVE_BEAM,
      PrimeItem.ICE_BEAM,
      PrimeItem.PLASMA_BEAM,
      PrimeItem.CHARGE_BEAM,
      PrimeItem.SPACE_JUMP_BOOTS,
      PrimeItem.SUPER_MISSILE,
      PrimeItem.WAVEBUSTER,
      PrimeItem.ICE_SPREADER,
      PrimeItem.FLAMETHROWER,
      PrimeItem.GRAPPLE_BEAM,
      PrimeItem.MORPH_BALL,
      PrimeItem.BOOST_BALL,
      PrimeItem.SPIDER_BALL,
      PrimeItem.MORPH_BALL_BOMB,
      PrimeItem.POWER_BOMB,
      PrimeItem.VARIA_SUIT,
      PrimeItem.GRAVITY_SUIT,
      PrimeItem.PHAZON_SUIT,
      PrimeItem.SCAN_VISOR,
      PrimeItem.THERMAL_VISOR,
      PrimeItem.XRAY_VISOR
    ];
  }

  toSettingsString(): string {
    let bits = '';
    const bitWidths = ItemOverrides.getBitwidths();

    for (let key of this.getOverridesKeys()) {
      const override = this[key] as ItemOverride;

      const values = {
        active: 0,
        state: 0,
        shuffle: 0
      };

      if (override) {
        values.active = 1;
        values.state = ItemOverrides.getChoices().map(choice => choice.value).indexOf(override.state);
        values.shuffle = override.shuffle;
      }

      bits += Utilities.toPaddedBitString(values.active, bitWidths.active)
        + Utilities.toPaddedBitString(values.state, bitWidths.state)
        + Utilities.toPaddedBitString(values.shuffle, bitWidths.shuffle);
    }

    return bigInt(bits, 2).toString(36).toUpperCase();
  }

  toArray(): ItemOverride[] {
    const array = [];

    for (const key of this.getOverridesKeys()) {
      if (this[key]) {
        array.push(this[key] as ItemOverride);
      }
    }

    return array;
  }

  prettify(): object {
    const prettified = {};

    for (let key of this.getOverridesKeys()) {
      // Add to prettified object if the override is defined
      if (this[key]) {
        prettified[key] = {
          ['State']: ItemOverrides.getChoices().find(choice => choice.value === this[key].state).name
        };

        // Only include shuffle value if the item state is to shuffle
        if (this[key].state === ItemOverrides.STATES.shuffled) {
          prettified[key]['Shuffle'] = this[key].shuffle;
        }
      }
    }

    return prettified;
  }

  private setUpOverrides(overrides: ItemOverride[]): void {
    for (let override of overrides) {
      this[override.itemName] = override;
    }
  }

  static fromSettingsString(settingsString: string) {
    const overridesToSet: ItemOverride[] = [];
    const defaultOverrides = new ItemOverrides();
    const keys = defaultOverrides.getOverridesKeys();
    const bitWidths = ItemOverrides.getBitwidths();

    const bitString = Utilities.getPaddedBitStringFromSettingsString(settingsString, keys.length * this.getTotalBitwidth());
    let index = 0;

    for (let key of keys) {
      const bits = {
        active: 0,
        state: 0,
        shuffle: 0
      };

      bits.active = parseInt(bitString.substr(index, bitWidths.active), 2);
      index += bitWidths.active;
      bits.state = parseInt(bitString.substr(index, bitWidths.state), 2);
      index += bitWidths.state;
      bits.shuffle += parseInt(bitString.substr(index, bitWidths.shuffle), 2);
      index += bitWidths.shuffle;

      // If active bit is set, get at least the state of the override and push it to the array
      if (bits.active === 1) {
        overridesToSet.push({
          itemName: key,
          state: ItemOverrides.getChoices()[bits.state].value as string,
          shuffle: bits.shuffle
        });
      }
    }

    return new ItemOverrides(overridesToSet);
  }

  static getChoices() {
    return [
      {
        name: 'Vanilla',
        value: ItemOverrides.STATES.vanilla
      },
      {
        name: 'Starting Item',
        value: ItemOverrides.STATES.startingItem
      },
      {
        name: 'Shuffled',
        value: ItemOverrides.STATES.shuffled
      }
    ];
  }

  static getBitwidths() {
    return {
      active: 1,
      state: Math.ceil(Utilities.getBaseLog(ItemOverrides.getChoices().length, 2)),
      shuffle: Math.ceil(Utilities.getBaseLog(ItemOverrides.SHUFFLE_MAX, 2))
    };
  }

  static getTotalBitwidth(): number {
    const bitWidths = ItemOverrides.getBitwidths();
    let total: number = 0;

    for (let key of Object.keys(bitWidths)) {
      total += bitWidths[key];
    }

    return total;
  }
}

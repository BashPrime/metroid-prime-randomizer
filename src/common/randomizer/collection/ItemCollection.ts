import {Collection} from './Collection';
import {Item} from '../Item';
import {PrimeItem} from '../enums/PrimeItem';

export class ItemCollection extends Collection {
  protected items: Array<Item>;
  protected itemCount: Map<string, number>;

  constructor(items: Array<Item> = []) {
    super(items);
    this.itemCount = new Map<string, number>();
    if (this.items.length > 0) {
      for (const item of this.items) {
        this.incrementItemCount(item);
      }
    }
  }

  public get(index: number): Item {
    return super.get(index);
  }

  public add(item: Item): void {
    super.add(item);
    this.incrementItemCount(item);
  }

  public remove(index: number): void {
    if (index > -1) {
      const itemName = this.items[index].getName();
      this.items.splice(index, 1);
      this.itemCount.set(itemName, this.itemCount.get(itemName) - 1);
    }
  }

  public removeItem(itemKey: string): Item {
    const givenItemCount = this.itemCount.get(itemKey);

    if (givenItemCount !== undefined && givenItemCount > 0) {
      const givenItem = Item.get(itemKey);
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].getName() === itemKey) {
          this.remove(i);
          return givenItem;
        }
      }
    }

    return undefined;
  }

  protected incrementItemCount(item: Item) {
    const itemName = item.getName();
    const itemVal = this.itemCount.get(itemName);
    if (itemVal === undefined) {
      this.itemCount.set(itemName, 1);
    } else {
      this.itemCount.set(itemName, itemVal + 1);
    }
  }

  public has(key: string): boolean {
    return this.itemCount.get(key) !== undefined && this.itemCount.get(key) > 0;
  }

  public diff(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.filter(item => !otherItems.has(item.getName())));
  }

  public merge(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.concat(otherItems.toArray()));
  }

  public toArray(): Array<Item> {
    return this.items;
  }

  public hasMissiles(): boolean {
    return this.has(PrimeItem.MISSILE_EXPANSION) || this.has(PrimeItem.MISSILE_LAUNCHER);
  }

  public hasMissileCount(count: number): boolean {
    if (this.hasMissiles()) {
      const expansionCount = this.has(PrimeItem.MISSILE_EXPANSION) ? this.itemCount.get(PrimeItem.MISSILE_EXPANSION) : 0;
      // Launcher's count value will almost always be 1 or 0
      const launcherCount = this.has(PrimeItem.MISSILE_LAUNCHER) ? this.itemCount.get(PrimeItem.MISSILE_LAUNCHER) : 0;
      return expansionCount + launcherCount >= count;
    }
    return false;
  }

  public hasEnergyTankCount(count: number): boolean {
    if (this.has(PrimeItem.ENERGY_TANK)) {
      const energyCount = this.has(PrimeItem.ENERGY_TANK) ? this.itemCount.get(PrimeItem.ENERGY_TANK) : 0;
      return energyCount >= count;
    }
    return false;
  }

  public hasAnySuit(): boolean {
    return this.has(PrimeItem.VARIA_SUIT) || this.has(PrimeItem.GRAVITY_SUIT) || this.has(PrimeItem.PHAZON_SUIT);
  }

  public canLayBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.MORPH_BALL_BOMB);
  }

  public canLayPowerBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.POWER_BOMB) || this.has(PrimeItem.POWER_BOMB_EXPANSION));
  }

  public canLayBombsOrPowerBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.MORPH_BALL_BOMB) || this.has(PrimeItem.POWER_BOMB)
      || this.has(PrimeItem.POWER_BOMB_EXPANSION));
  }

  public canFireSuperMissiles(): boolean {
    return this.hasMissiles() && this.has(PrimeItem.CHARGE_BEAM) && this.has(PrimeItem.SUPER_MISSILE);
  }

  public hasPhendranaReqs(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.hasAnySuit();
  }

  public hasPhendranaReqsMinorGlitches(minVMRTanks: number): boolean {
    return this.hasMissiles() && this.canLayBombs()
      && (this.hasAnySuit() || this.hasEnergyTankCount(minVMRTanks));
  }

  public hasBackwardsPhendranaReqs(): boolean {
    return this.hasMissiles() && this.hasAnySuit() && this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPIDER_BALL)
      && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.WAVE_BEAM);
  }

  public hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks: number): boolean {
    return this.hasMissiles() && this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
      && this.has(PrimeItem.WAVE_BEAM)
      && (this.hasAnySuit() || this.hasEnergyTankCount(minVMRTanks));
  }

  public hasMinesFromTallonReqs(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.GRAVITY_SUIT)
      && this.has(PrimeItem.THERMAL_VISOR) && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM);
  }

  public hasMinesFromTallonReqsMinorGlitches(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.has(PrimeItem.SPACE_JUMP_BOOTS)
      && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM);
  }

  public hasMinesFromMagmoorReqs(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.canLayPowerBombs() && this.hasAnySuit()
      && this.has(PrimeItem.SPIDER_BALL) && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.WAVE_BEAM)
      && this.has(PrimeItem.ICE_BEAM);
  }

  public hasMinesFromMagmoorReqsMinorGlitches(minVMRTanks: number): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.canLayPowerBombs() && this.has(PrimeItem.SPACE_JUMP_BOOTS)
      && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM)
      && (this.hasAnySuit() || this.hasEnergyTankCount(minVMRTanks));
  }

  public canDoInfiniteSpeed(): boolean {
    return this.canLayBombs() && this.has(PrimeItem.BOOST_BALL);
  }
}

import { Collection } from './Collection';
import { Item } from '../Item';
import { PrimeItemName } from '../ItemType';

export class ItemCollection extends Collection{
    protected items: Array<Item>;
    protected itemCount: Map<string, number>;

    constructor(items: Array<Item> = []) {
        super(items);
        this.itemCount = new Map<string, number>();
        if (this.items.length > 0) {
            for (let item of this.items) {
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
            let itemName = this.items[index].getName();
            this.items.splice(index, 1);
            this.itemCount.set(itemName, this.itemCount.get(itemName) - 1);
        }
    }

    public removeItem(itemKey: string): Item {
        let givenItemCount = this.itemCount.get(itemKey);

        if (givenItemCount !== undefined && givenItemCount > 0) {
            let givenItem = Item.get(itemKey);
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
        let itemName = item.getName();
        let itemVal= this.itemCount.get(itemName);
        if (itemVal === undefined)
            this.itemCount.set(itemName, 1);
        else
            this.itemCount.set(itemName, itemVal + 1);
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
        return this.has(PrimeItemName.MISSILE_EXPANSION) || this.has(PrimeItemName.MISSILE_LAUNCHER);
    }

    public hasMissileCount(count: number): boolean {
        if (this.hasMissiles()) {
            let expansionCount = this.has(PrimeItemName.MISSILE_EXPANSION) ? this.itemCount.get(PrimeItemName.MISSILE_EXPANSION) : 0;
            let launcherCount = this.has(PrimeItemName.MISSILE_LAUNCHER) ? this.itemCount.get(PrimeItemName.MISSILE_LAUNCHER) : 0; // This should almost always be 1 or 0
            return expansionCount + launcherCount >= count;
        }
        return false;
    }

    public hasAnySuit(): boolean {
        return this.has(PrimeItemName.VARIA_SUIT) || this.has(PrimeItemName.GRAVITY_SUIT) || this.has(PrimeItemName.PHAZON_SUIT);
    }

    public canLayBombs(): boolean {
        return this.has(PrimeItemName.MORPH_BALL) && this.has(PrimeItemName.MORPH_BALL_BOMB);
    }

    public canLayPowerBombs(): boolean {
        return this.has(PrimeItemName.MORPH_BALL) && (this.has(PrimeItemName.POWER_BOMB) || this.has(PrimeItemName.POWER_BOMB_EXPANSION));
    }

    public canLayBombsOrPowerBombs(): boolean {
        return this.has(PrimeItemName.MORPH_BALL) && (this.has(PrimeItemName.MORPH_BALL_BOMB) || this.has(PrimeItemName.POWER_BOMB) || this.has(PrimeItemName.POWER_BOMB_EXPANSION));
    }

    public canFireSuperMissiles(): boolean {
        return this.hasMissiles() && this.has(PrimeItemName.CHARGE_BEAM) && this.has(PrimeItemName.SUPER_MISSILE);
    }

    public hasPhendranaReqs(): boolean {
        return this.hasMissiles() && this.canLayBombs() && this.hasAnySuit();
    }

    public hasBackwardsPhendranaReqs(): boolean {
        return this.hasMissiles() && this.hasAnySuit() && this.has(PrimeItemName.MORPH_BALL) && this.has(PrimeItemName.SPIDER_BALL) && this.has(PrimeItemName.SPACE_JUMP_BOOTS)
            && this.has(PrimeItemName.WAVE_BEAM);
    }

    public hasMinesFromTallonReqs(): boolean {
        return this.hasMissiles() && this.canLayBombs() && this.has(PrimeItemName.SPACE_JUMP_BOOTS) && this.has(PrimeItemName.GRAVITY_SUIT)
            && this.has(PrimeItemName.THERMAL_VISOR) && this.has(PrimeItemName.WAVE_BEAM) && this.has(PrimeItemName.ICE_BEAM);
    }

    public hasMinesFromMagmoorReqs(): boolean {
		return this.hasMissiles() && this.canLayBombs() && this.canLayPowerBombs() && this.hasAnySuit() && this.has(PrimeItemName.SPIDER_BALL) && 
				this.has(PrimeItemName.SPACE_JUMP_BOOTS) && this.has(PrimeItemName.WAVE_BEAM) && this.has(PrimeItemName.ICE_BEAM);
	}
}
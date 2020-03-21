import { ItemCollection } from '../itemCollection';
import { PrimeItem } from '../../enums/primeItem';
import { HeatDamagePrevention } from '../../enums/heatDamagePrevention';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { MersenneTwister } from '../../mersenneTwister';
import { randomArray } from '../../utilities';

export class PrimeItemCollection extends ItemCollection {
  filter(fn): PrimeItemCollection {
    return new PrimeItemCollection(this.items.filter(fn));
  }

  shuffle(rng: MersenneTwister): PrimeItemCollection {
    return new PrimeItemCollection(randomArray(this.items, this.items.length, rng));
  }

  diff(otherItems: PrimeItemCollection): PrimeItemCollection {
    return this.filter(item => !otherItems.has(item.getName()));
  }

  merge(otherItems: PrimeItemCollection): PrimeItemCollection {
    return new PrimeItemCollection(this.items.concat(otherItems.toArray()));
  }

  hasMissiles(): boolean {
    return this.has(PrimeItem.MISSILE_LAUNCHER) || this.has(PrimeItem.MISSILE_EXPANSION);
  }

  hasMissileCount(count: number) {
    return this.filter(item => {
      return item.getName() === PrimeItem.MISSILE_EXPANSION || item.getName() === PrimeItem.MISSILE_LAUNCHER
    }).size() >= count;
  }

  canLayBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.MORPH_BALL_BOMB);
  }

  canLayPowerBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.POWER_BOMB) || this.has(PrimeItem.POWER_BOMB_EXPANSION));
  }

  canBoost(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.BOOST_BALL);
  }

  canSpider(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPIDER_BALL);
  }

  hasSuit(settings: PrimeRandomizerSettings): boolean {
    if (settings.heatProtection === HeatDamagePrevention.VARIA_ONLY) {
      return this.has(PrimeItem.VARIA_SUIT);
    }

    return this.has(PrimeItem.VARIA_SUIT) || this.has(PrimeItem.GRAVITY_SUIT) || this.has(PrimeItem.PHAZON_SUIT);
  }

  canLayBombsOrPowerBombs(): boolean {
    return this.canLayBombs() || this.canLayPowerBombs();
  }

  canFireSuperMissiles(): boolean {
    return this.hasMissiles() && this.has(PrimeItem.CHARGE_BEAM) && this.has(PrimeItem.SUPER_MISSILE);
  }

  canInfiniteSpeed(): boolean {
    return this.canLayBombs() && this.canBoost();
  }

  canWallcrawl(settings: PrimeRandomizerSettings): boolean {
    const bombReqs = settings.tricks.outOfBoundsWithoutMorphBall || this.canLayBombs();
    return bombReqs && this.has(PrimeItem.SPACE_JUMP_BOOTS);
  }
}

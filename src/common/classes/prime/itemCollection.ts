import { ItemCollection } from '../itemCollection';
import { primeItems } from './items';
import { PrimeItem } from '../../enums/primeItem';

export class PrimeItemCollection extends ItemCollection {
  hasMissiles(): boolean {
    return this.has(PrimeItem.MISSILE_LAUNCHER) || this.has(PrimeItem.MISSILE_EXPANSION);
  }
}

import { ItemCollection } from '../../src/electron/models/itemCollection';
import { primeItems } from '../../src/electron/models/prime/items';
import { PrimeItem } from '../../src/electron/enums/primeItem';
import { expect } from 'chai';
import 'mocha';

describe('ItemCollection', () => {
  it('should handle if an item is in the collection', () => {
    const items = [primeItems[PrimeItem.MORPH_BALL]];
    const collection = new ItemCollection(items);
    const hasResult = collection.has(primeItems[PrimeItem.MORPH_BALL].getName());

    expect(hasResult).to.equal(true);
  });

  it('should handle if an item is NOT in the collection', () => {
    const items = [primeItems[PrimeItem.MORPH_BALL]];
    const collection = new ItemCollection(items);
    const hasResult = collection.has(primeItems[PrimeItem.SUPER_MISSILE].getName());

    expect(hasResult).to.equal(false);
  });

  it('should contain at least a certain amount of specific items', () => {
    const amount = 8;
    const items = Array(amount).fill(primeItems[PrimeItem.MISSILE_EXPANSION]);
    const hasCount = new ItemCollection(items).hasCount(primeItems[PrimeItem.MISSILE_EXPANSION].getName(), amount);

    expect(hasCount).to.equal(true);
  });

  it('should NOT not contain at least a certain amount of specific items', () => {
    const amount = 7;
    const count = 8;
    const items = Array(amount).fill(primeItems[PrimeItem.MISSILE_EXPANSION]);
    const hasCount = new ItemCollection(items).hasCount(primeItems[PrimeItem.MISSILE_EXPANSION].getName(), count);

    expect(hasCount).to.equal(false);
  });
});

import { ItemCollection } from '../../src/common/classes/itemCollection';
import { primeItems } from '../../src/common/classes/prime/items';
import { expect } from 'chai';
import 'mocha';

describe('ItemCollection', () => {
  it('should handle if an item is in the collection', () => {
    const items = [primeItems.morphBall];
    const collection = new ItemCollection(items);
    const hasResult = collection.has(primeItems.morphBall.getName());

    expect(hasResult).to.equal(true);
  });

  it('should handle if an item is NOT in the collection', () => {
    const items = [primeItems.morphBall];
    const collection = new ItemCollection(items);
    const hasResult = collection.has(primeItems.superMissile.getName());

    expect(hasResult).to.equal(false);
  });

  it('should contain at least a certain amount of specific items', () => {
    const amount = 8;
    const items = Array(amount).fill(primeItems.missileExpansion);
    const hasCount = new ItemCollection(items).hasCount(primeItems.missileExpansion.getName(), amount);

    expect(hasCount).to.equal(true);
  });

  it('should NOT not contain at least a certain amount of specific items', () => {
    const amount = 7;
    const count = 8;
    const items = Array(amount).fill(primeItems.missileExpansion);
    const hasCount = new ItemCollection(items).hasCount(primeItems.missileExpansion.getName(), count);

    expect(hasCount).to.equal(false);
  });
});

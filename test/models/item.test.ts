import { Item } from '../../src/electron/models/item';
import { expect } from 'chai';
import 'mocha';

describe('Item', () => {
  it('should contain a name', () => {
    const itemName = 'e03dfd6b-5e97-40c6-b29a-4a7d400f75f0';
    const item = new Item(itemName, 'TestType', 0);

    expect(item.getName()).to.equal(itemName);
  });

  it('should contain a patcher ID', () => {
    const patcherId = Number.MAX_SAFE_INTEGER;
    const item = new Item('test', 'TestType', patcherId);

    expect(item.getPatcherId()).to.equal(patcherId);
  });
});

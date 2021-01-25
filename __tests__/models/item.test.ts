import { Item } from '../../src/electron/models/item';

describe('Item', () => {
  it('constructs without error', () => {
    expect(() => {
      new Item('Test Item', 'test type', 0);
    }).not.toThrow();
  });

  it('should contain a name', () => {
    const itemName = 'e03dfd6b-5e97-40c6-b29a-4a7d400f75f0';
    const item = new Item(itemName, 'TestType', 0);

    expect(item.getName()).toBe(itemName);
  });

  it('should contain a patcher ID', () => {
    const patcherId = Number.MAX_SAFE_INTEGER;
    const item = new Item('test', 'TestType', patcherId);

    expect(item.getPatcherId()).toBe(patcherId);
  });
});

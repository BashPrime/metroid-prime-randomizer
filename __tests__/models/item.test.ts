import { Item } from '../../src/electron/models/item';

describe('Item', () => {
  it('constructs without error', () => {
    expect(new Item('Test Item', 'test type', 0)).not.toThrow();
  });
});
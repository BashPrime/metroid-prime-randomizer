import { primeItems } from '../../src/electron/models/prime/items';

describe('Prime Items', () => {
  it('should contain 38 entries', () => {
    const numEntries = 38;
    expect(Object.keys(primeItems).length).toBe(numEntries);
  });
});
import { ItemOverrides } from '../../src/electron/models/prime/itemOverrides';
import { PrimeItem } from '../../src/electron/enums/primeItem';

describe('ItemOverrides', () => {
  it('constructs without error', () => {
    expect(() => {
      new ItemOverrides();
    }).not.toThrow();
  });

  it('should handle scan visor vanilla state', () => {
    const overrides = new ItemOverrides([
      {
        name: PrimeItem.SCAN_VISOR,
        state: ItemOverrides.STATES.vanilla,
        count: 0
      }
    ]);

    const scanVisorOverride = overrides[PrimeItem.SCAN_VISOR];
    expect(scanVisorOverride).toBeDefined;
    expect(scanVisorOverride.state).not.toBe(ItemOverrides.STATES.vanilla);
  });
});
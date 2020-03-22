import { ItemOverrides } from '../../../src/electron/models/prime/itemOverrides';
import { PrimeItem } from '../../../src/electron/enums/primeItem';
import { expect } from 'chai';
import 'mocha';

describe('ItemOverrides', () => {
  it('should create new ItemOverrides instance', () => {
    const overrides = new ItemOverrides();
    expect(overrides).to.exist;
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
    expect(scanVisorOverride).to.exist;
    expect(scanVisorOverride.state).to.not.equal(ItemOverrides.STATES.vanilla);
  });
});

import { Item } from '../../../src/electron/models/item';
import { primeItems } from '../../../src/electron/models/prime/items';
import { expect } from 'chai';
import 'mocha';

describe('Prime Items', () => {
  it('should contain 38 entries', () => {
    const numEntries = 38;
    expect(Object.keys(primeItems).length).to.equal(numEntries);
  });
});

import { PrimeWorld } from '../../../src/common/classes/prime/world';
import { PrimeRandomizerSettings } from '../../../src/common/classes/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeWorld', () => {
  it('should return a PrimeWorld instance', () => {
    const settings = new PrimeRandomizerSettings({});
    const world = new PrimeWorld(settings);
    expect(world).to.be.an.instanceof(PrimeWorld);
  });
});

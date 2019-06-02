import { PrimeRandomizer } from '../../../src/common/classes/prime/randomizer';
import { PrimeRandomizerSettings } from '../../../src/common/classes/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizer', () => {
  it('should return a randomizer instance', () => {
    const settings = new PrimeRandomizerSettings({});
    const randomizer = new PrimeRandomizer(settings);
    expect(randomizer).to.be.an.instanceof(PrimeRandomizer);
  });
});

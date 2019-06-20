import { generateWorld } from '../../../src/common/classes/prime/randomizer';
import { PrimeRandomizerSettings } from '../../../src/common/classes/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizer', () => {
  it('generated world should have an item pool', () => {
    const settings = new PrimeRandomizerSettings({});
    const world = generateWorld(settings);

    expect(world.getItemPool().getItemsArray()).to.have.lengthOf.above(0);
  });
});

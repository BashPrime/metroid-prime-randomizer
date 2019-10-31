import { generateWorld } from '../../../src/electron/models/prime/randomizer';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizer', () => {
  it('generated world should have an item pool', () => {
    const settings = new PrimeRandomizerSettings({seed: "Test"});
    const str = settings.getSettingsString();

    const world = generateWorld(settings);

    const placedItemLocations = world.getLocations().toArray().filter(location => location.hasItem());

    expect(placedItemLocations.length).to.equal(100);
  });
});

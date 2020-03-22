import { generateWorld } from '../../../src/electron/models/prime/randomizer';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizer', () => {
  it('should successfully generate a world', () => {
    const settings = new PrimeRandomizerSettings({ seed: 'K3N45IC8SJ' });
    const world = generateWorld(settings);
    const placedItemLocations = world.getLocations().toArray().filter(location => location.hasItem());

    expect(placedItemLocations.length).to.equal(100);
    expect(world.getRandomprimePatcherLayoutString()).to.exist;
    expect(world.getLayoutHash()).to.exist;
  });
});

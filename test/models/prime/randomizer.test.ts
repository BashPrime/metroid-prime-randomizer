import { generateWorld } from '../../../src/electron/models/prime/randomizer';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizer', () => {
  it('generated world should have an item pool', () => {
    const settings = new PrimeRandomizerSettings({ seed: 'K3N45IC8SJ' });
    const world = generateWorld(settings);
    const placedItemLocations = world.getLocations().toArray().filter(location => location.hasItem());

    expect(placedItemLocations.length).to.equal(100);
  });

  it('should also pass', () => {
    const settings = new PrimeRandomizerSettings({
      artifactLocationHints: true,
      excludeLocations: {},
      goal: 'artifact-collection',
      goalArtifacts: 12,
      heatProtection: 'any-suit',
      hideItemModels: false,
      seed: 'X0X0X0X0',
      skipFrigate: true,
      skipHudPopups: true,
      spoiler: false,
      suitDamageReduction: 'default',
      tricks: {}
    });
    const world = generateWorld(settings);
    const placedItemLocations = world.getLocations().toArray().filter(location => location.hasItem());

    expect(placedItemLocations.length).to.equal(100);
  });
});

import { generateWorld } from '../../src/electron/models/prime/randomizer';
import { PrimeRandomizerSettings } from '../../src/electron/models/prime/randomizerSettings';

describe('PrimeRandomizer', () => {
  it('should successfully generate a world', () => {
    const settings = new PrimeRandomizerSettings({ seed: 'N99OETYKV4' });
    const world = generateWorld(settings);
    const placedItemLocations = world.getLocations().toArray().filter(location => location.hasItem());

    expect(placedItemLocations.length).toBe(100);
    expect(world.getRandomprimePatcherLayoutString()).toBeDefined;
    expect(world.getLayoutHash()).toBeDefined;
  });
});
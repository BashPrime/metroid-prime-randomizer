import { PrimeWorld } from '../../src/electron/models/prime/world';
import { PrimeRandomizerSettings } from '../../src/electron/models/prime/randomizerSettings';

describe('PrimeWorld', () => {
  it('should return a PrimeWorld instance', () => {
    const settings = new PrimeRandomizerSettings();
    const world = new PrimeWorld(settings);
    // VS Code is complaining, likely due to unsupported TypeScript, but works
    expect(world).toBeInstanceOf(PrimeWorld);
  });
});
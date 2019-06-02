import { PrimeRandomizerSettings } from '../../../src/common/classes/prime/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizerSettings', () => {
  it('should return a settings instance', () => {
    const settings = new PrimeRandomizerSettings({});
    expect(settings).to.be.an.instanceof(PrimeRandomizerSettings);
  });

  it('should contain default settings', () => {
    const expectedSettings = {
      spoiler: false,
      skipFrigate: true,
      skipHudPopups: true,
      hideItemModels: false,
      goal: 'artifact-collection',
      goalArtifacts: 12,
      artifactLocationHints: false,
      heatDamagePrevention: 'any-suit',
      suitDamageReduction: 'default',
      shuffleArtifacts: true,
      shuffleMissileLauncher: true,
      shuffleMorph: true,
      shuffleBombs: true,
      shuffleCharge: true,
      shuffleSpaceJump: true
    };
    const settings = new PrimeRandomizerSettings({});

    expect(settings).to.deep.include(expectedSettings);
  });
});

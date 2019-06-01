import { RandomizerSettings } from '../../src/common/classes/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('RandomizerSettings', () => {
  it('should return a settings instance', () => {
    const settings = new RandomizerSettings({});
    expect(settings).to.be.an.instanceof(RandomizerSettings);
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
    const settings = new RandomizerSettings({});

    expect(settings).to.deep.include(expectedSettings);
  });
});

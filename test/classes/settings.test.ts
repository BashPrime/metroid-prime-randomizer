import { Settings } from '../../src/common/models/settings';
import { expect } from 'chai';
import 'mocha';

describe('Settings', () => {
  it('should return a settings instance', () => {
    const settings = new Settings({});
    expect(settings).to.be.an.instanceof(Settings);
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
    const settings = new Settings({});

    expect(settings).to.deep.include(expectedSettings);
  });
});

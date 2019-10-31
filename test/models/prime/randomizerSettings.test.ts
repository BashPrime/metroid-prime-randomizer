import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { numberRangeToObject } from '../../../src/electron/models/randomizerSettings';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizerSettings', () => {
  it('should return a settings instance', () => {
    const settings = new PrimeRandomizerSettings({});
    expect(settings).to.be.an.instanceof(PrimeRandomizerSettings);
  });

  it('numberRangeToObject should return full range', () => {
    const result = numberRangeToObject(1, 12);
    const expected = {
      [1]: 1,
      [2]: 2,
      [3]: 3,
      [4]: 4,
      [5]: 5,
      [6]: 6,
      [7]: 7,
      [8]: 8,
      [9]: 9,
      [10]: 10,
      [11]: 11,
      [12]: 12
    };

    expect(result).to.deep.equal(expected);
  });

  // it('should contain default settings', () => {
  //   const expectedSettings = {
  //     spoiler: false,
  //     skipFrigate: true,
  //     skipHudPopups: true,
  //     hideItemModels: false,
  //     goal: 'artifact-collection',
  //     goalArtifacts: 12,
  //     artifactLocationHints: false,
  //     heatDamagePrevention: 'any-suit',
  //     suitDamageReduction: 'default',
  //     shuffleArtifacts: true,
  //     shuffleMissileLauncher: true,
  //     shuffleMorph: true,
  //     shuffleBombs: true,
  //     shuffleCharge: true,
  //     shuffleSpaceJump: true
  //   };
  //   const settings = new PrimeRandomizerSettings({});

  //   expect(settings).to.deep.include(expectedSettings);
  // });
});

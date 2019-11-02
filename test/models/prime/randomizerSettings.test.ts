import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { discreteNumberSelection } from '../../../src/electron/models/option';
import { expect } from 'chai';
import 'mocha';

describe('PrimeRandomizerSettings', () => {
  it('should return a settings instance', () => {
    const settings = new PrimeRandomizerSettings({});
    expect(settings).to.be.an.instanceof(PrimeRandomizerSettings);
  });

  it('should export settings to settings string', () => {
    const settings = new PrimeRandomizerSettings({});
    const expected = '2jc-0';
    const result = settings.getSettingsString();

    expect(result).to.equal(expected);
  });

  it('should import settings successfully', () => {
    const expected = new PrimeRandomizerSettings({spoiler: false, goal: 'all-bosses'});
    const settingsString = expected.getSettingsString();
    const result = PrimeRandomizerSettings.fromSettingsString(settingsString);

    expect(result).to.deep.equal(expected);
    expect(result.getSettingsString()).to.equal(expected.getSettingsString());
  });

  it('discreteNumberSelection should return full range of given numbers', () => {
    const result = discreteNumberSelection(1, 5);
    const expected = [
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 }
    ];

    expect(result).to.deep.equal(expected);
  });
});

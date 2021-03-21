import { PrimeRandomizerSettings } from '../../src/electron/models/prime/randomizerSettings';
import { discreteNumberSelection } from '../../src/electron/models/option';

describe('PrimeRandomizerSettings', () => {
  it('should return a settings instance', () => {
    const settings = new PrimeRandomizerSettings();
    // VS Code is complaining, likely due to unsupported TypeScript, but works
    expect(settings).toBeInstanceOf(PrimeRandomizerSettings);
  });

  it('should export settings to settings string', () => {
    const settings = new PrimeRandomizerSettings({
      spoiler: true,
      skipHudPopups: false,
      hideItemModels: true,
      itemOverrides: [
        {
          name: 'Morph Ball',
          state: 'starting-item',
          count: 0
        }
      ],
      excludeLocations: {
        ['Alcove']: true
      },
      tricks: {
        alcoveEscapeWithoutSpaceJump: true,
        landingSiteScanDash: true
      }
    });
    const expected = 'GY574LC-TXQWBYM6C68KHWGNTO8V9X4NX8G-UQ3UEU2I5SNC9D47UV4-YKDBPOTTIAI540X6O0';
    const result = settings.toSettingsString();

    expect(result).toBe(expected);
  });

  it('should import settings from setting string successfully', () => {
    const expected = new PrimeRandomizerSettings({ spoiler: false, goal: 'all-bosses', excludeLocations: { ['Landing Site']: true } });
    const settingsString = expected.toSettingsString();
    const result = PrimeRandomizerSettings.fromSettingsString(settingsString);

    expect(result).toEqual(expected);
    expect(result.toSettingsString()).toBe(expected.toSettingsString());
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

    expect(result).toEqual(expected);
  });
});

import { ipcMain } from 'electron';

import { seedHistory } from './seedHistoryController';
import { RandomizerForm } from '../../common/models/randomizerForm';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings, PrimeRandomizerSettingsArgs } from '../models/prime/randomizerSettings';
import { SettingsFlagsArgs } from '../models/settingsFlags';

export function initialize() {
  ipcMain.on('generateSeed', (event, form: RandomizerForm, spoiler: boolean) => {
    const args = convertFormToArgs(form);
    args.spoiler = spoiler;

    const settings = new PrimeRandomizerSettings(args);

    // Generate the seed and add it to the seeds history
    const world = generateWorld(settings);
    const newSeedId = seedHistory.addSeedFromWorld(world);

    // Send client-friendly seed information back to the UI
    event.sender.send('generateSeedResponse', seedHistory.getSeedObject(newSeedId).seed);
  });
}

function convertFormToArgs(form: RandomizerForm): PrimeRandomizerSettingsArgs {
  return {
    skipFrigate: form.romSettings.skipFrigate,
    skipHudPopups: form.romSettings.skipHudPopups,
    hideItemModels: form.romSettings.hideItemModels,
    goal: form.rules.goal,
    goalArtifacts: form.rules.goalArtifacts,
    artifactLocationHints: form.rules.artifactLocationHints,
    elevatorShuffle: form.rules.elevatorShuffle,
    heatProtection: form.rules.heatProtection,
    suitDamageReduction: form.rules.suitDamageReduction,
    startingArea: form.rules.startingArea,
    excludeLocations: processArrayControl(form.excludeLocations),
    tricks: processArrayControl(form.tricks)
  };
}

/**
 * Converts the given array to key-value object for the randomizer class to use.
 * @param control The array passed from the form
 */
function processArrayControl(control: string[]): SettingsFlagsArgs {
  const newControl = {};

  for (let item of control) {
    newControl[item] = true;
  }

  return newControl;
}

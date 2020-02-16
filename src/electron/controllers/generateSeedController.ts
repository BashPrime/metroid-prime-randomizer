import { ipcMain } from 'electron';

import { seedHistory } from './seedHistoryController';
import { RandomizerForm } from '../../common/models/randomizerForm';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings, PrimeRandomizerSettingsArgs } from '../models/prime/randomizerSettings';
import { SettingsFlagsArgs } from '../models/settingsFlags';
import { allPresets } from './presetsController';

export function initialize() {
  ipcMain.on('generateSeed', (event, form: RandomizerForm, spoiler: boolean) => {
    console.log(allPresets);
    let args: PrimeRandomizerSettingsArgs;
    const preset = (form as any).preset;
    // If a preset was provided, don't use the form controls. Use the preset itself instead.
    if (preset !== 'Custom') {
      args = convertFormToArgs(allPresets[preset]);
    } else {
      args = convertFormToArgs(form);
    }

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
  const args: PrimeRandomizerSettingsArgs = {};
  Object.assign(args, form.romSettings);
  Object.assign(args, form.rules);
  Object.assign(args, {
    excludeLocations: processArrayControl(form.excludeLocations),
    tricks: processArrayControl(form.tricks)
  });

  return args;
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

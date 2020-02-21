import { app, ipcMain } from 'electron';
import * as path from 'path';

import { PatcherConfiguration, runRandomprimePatcher } from '../models/prime/patcher';
import { seedHistory } from './seedHistoryController';
import { GeneratedSeed } from '../../common/models/generatedSeed';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings } from '../models/prime/randomizerSettings';
import { PrimeWorld } from '../models/prime/world';
import { PatchForm } from '../../common/models/patchForm';
import { version } from '../../../package.json';

export const defaultOutputFolder = path.join(app.getPath('documents'), 'Metroid Prime Randomizer', 'Output');

export function initialize() {
  // Request from renderer to get settings file from main process
  ipcMain.on('patchIso', (event, seed: GeneratedSeed, form: PatchForm) => {
    patchIso(seed, form, message => {
      event.sender.send('patchMessage', JSON.parse(message));
    });
  });
}

function patchIso(seed: GeneratedSeed, form: PatchForm, callback: (message: string) => void): void {
  const seedObject = seedHistory.getSeedObject(seed.id);

  if (!seedObject) {
    throw new Error('Cannot find seed object in the seed history.');
  }

  // Generate the world instance if it isn't there.
  // Worlds are automatically pruned when the seed history is saved to seeds.json
  if (!seedObject.world) {
    const settings = PrimeRandomizerSettings.fromSettingsString(seedObject.seed.settingsString);
    settings.seed = seedObject.seed.seed;
    seedObject.world = generateWorld(settings);
  }

  runRandomprimePatcher(getPatcherConfig(seedObject.world, form), (message: string) => {
    callback(message);
  });
}

function getPatcherConfig(world: PrimeWorld, form: PatchForm): PatcherConfiguration {
  const settings = world.getSettings();
  const outputFolder = form.outputFolder ? form.outputFolder : defaultOutputFolder;
  const outputIso = 'Prime Randomizer - ' + world.getLayoutHash().toString().replace(/,+/g, ' ') + '.' + form.outputType;

  return {
    input_iso: form.baseIso,
    output_iso: path.join(outputFolder, outputIso),
    layout_string: world.getRandomprimePatcherLayoutString(),
    iso_format: form.outputType,
    skip_frigate: settings.skipFrigate,
    skip_hudmenus: settings.skipHudPopups,
    nonvaria_heat_damage: settings.heatProtection === 'varia-only',
    staggered_suit_damage: settings.suitDamageReduction === 'progressive',
    obfuscate_items: settings.hideItemModels,
    artifact_hint_behavior: settings.artifactLocationHints ? 'all' : 'none',
    trilogy_disc_path: form.trilogyIso ? form.trilogyIso : null,
    starting_items: null,
    comment: 'Metroid Prime Randomizer v' + version + ' by BashPrime, Syncathetic, and Pwootage. Permalink: ' + settings.toPermalink(),
    main_menu_message: 'Randomizer Version: ' + version
  };
}

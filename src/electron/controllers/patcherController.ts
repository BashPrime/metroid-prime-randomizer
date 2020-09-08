import { app, ipcMain, shell } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

import { PatcherConfiguration, runRandomprimePatcher } from '../models/prime/patcher';
import { seedHistory } from './seedHistoryController';
import { GeneratedSeed } from '../../common/models/generatedSeed';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings } from '../models/prime/randomizerSettings';
import { PrimeWorld } from '../models/prime/world';
import { PrimeItem } from '../enums/primeItem';
import { PatchForm } from '../../common/models/patchForm';
import { version } from '../../../package.json';
import { toRandomprimeFormat } from '../models/prime/startingItems';
import { mapToItemPool } from '../models/prime/itemPool';

export const defaultOutputFolder = path.join(app.getPath('documents'), 'Metroid Prime Randomizer', 'Output');

export function initialize() {
  // Request from renderer to get settings file from main process
  ipcMain.on('patchIso', (event, seed: GeneratedSeed, form: PatchForm) => {
    patchIso(seed, form, message => {
      event.sender.send('patchMessage', JSON.parse(message));
    });
  });

  ipcMain.on('openOutputFolder', (event, outputFolder: string) => {
    // Handle output folder not existing
    if (!outputFolder && !fs.existsSync(defaultOutputFolder)) {
      fs.mkdirSync(defaultOutputFolder, { recursive: true });
    }

    // If no output folder is defined, open the default folder
    shell.openItem(outputFolder ? outputFolder : defaultOutputFolder);
  });
}

export function getWorldFromSeedHistory(id: string): PrimeWorld {
  const seedObject = seedHistory.getSeedObject(id);

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

  return seedObject.world;
}

export function getRandomizerFileNameNoExtension(world: PrimeWorld): string {
  return 'Prime Randomizer - ' + world.getLayoutHash().toString().replace(/,+/g, ' ');
}

export function getOutputFolder(form: PatchForm) {
  // Create default output folder if it doesn't exist
  if (!form.outputFolder && !fs.existsSync(defaultOutputFolder)) {
    fs.mkdirSync(defaultOutputFolder, { recursive: true });
  }

  return form.outputFolder ? form.outputFolder : defaultOutputFolder;
}

function patchIso(seed: GeneratedSeed, form: PatchForm, callback: (message: string) => void): void {
  const world = getWorldFromSeedHistory(seed.id);

  runRandomprimePatcher(getPatcherConfig(world, form), (message: string) => {
    callback(message);
  });
}

function getPatcherConfig(world: PrimeWorld, form: PatchForm): PatcherConfiguration {
  const settings = world.getSettings();
  const outputIso = getRandomizerFileNameNoExtension(world) + '.' + form.outputType;

  const startingWithScanVisor: boolean = world.getStartingItems()[PrimeItem.SCAN_VISOR]
    && world.getStartingItems()[PrimeItem.SCAN_VISOR] > 0;

  const randomizerComment: string = 'starting area: ' + world.getStartingArea().name + '\n\n'
    + 'Layout generated with Metroid Prime Randomizer v' + version + ' - https://randomizer.metroidprime.run\n'
    + 'Randomizer Permalink: ' + settings.toPermalink();

  return {
    input_iso: form.baseIso,
    output_iso: path.join(getOutputFolder(form), outputIso),
    layout_string: world.getRandomprimePatcherLayoutString(),
    iso_format: form.outputType,
    skip_frigate: settings.skipFrigate,
    skip_hudmenus: settings.skipHudPopups,
    nonvaria_heat_damage: settings.heatProtection === 'varia-only',
    staggered_suit_damage: settings.suitDamageReduction === 'progressive',
    obfuscate_items: settings.hideItemModels,
    artifact_hint_behavior: settings.artifactLocationHints ? 'all' : 'none',
    trilogy_disc_path: form.trilogyIso ? form.trilogyIso : null,
    starting_items: toRandomprimeFormat(mapToItemPool(world.getStartingItems())),
    show_starting_items: world.getShowStartingItems(),
    comment: randomizerComment,
    main_menu_message: 'Seed Hash:\n' + seedHashAsString(world) + '\n\n' + 'Randomizer v' + version,
    auto_enabled_elevators: !startingWithScanVisor,
    enable_vault_ledge_door: world.getSettings().enableMainPlazaLedgeDoor,
    skip_impact_crater: world.getSettings().skipImpactCrater
  };
}

function seedHashAsString(world: PrimeWorld): string {
  let hashStr = '';
  const seedHash = world.getLayoutHash();

  seedHash.forEach((hashItem, index) => {
    hashStr += hashItem;

    if (index < seedHash.length - 1) {
      // Set a newline after every hash item in an odd index, else add a space
      hashStr += index % 2 !== 0 ? '\n' : ' ';
    }
  });

  return hashStr;
}

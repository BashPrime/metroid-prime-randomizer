import { app, ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as crypto from 'crypto-js';

import { Utilities } from '../Utilities';
import { Randomizer } from '../randomizer/Randomizer';
import { Config } from '../randomizer/Config';
import { HeatDamagePrevention } from '../randomizer/enums/heatDamagePrevention';
import { SuitDamageReduction } from '../randomizer/enums/suitDamageReduction';

const ProgressBar = require('electron-progressbar');

export class Patcher {
  private appRoot: string;
  private randomPrime: any;
  private serve: boolean;

  constructor() {
    this.serve = Utilities.isServe();
    this.appRoot = Utilities.getAppRoot();
    const randomPrimePath = this.getRandomPrimePath();

    // Gracefully handle unresolved randomprime native path
    try {
      this.randomPrime = require(randomPrimePath);
    } catch (err) {
      throw new ReferenceError('Cannot resolve the randomprime native module: ' + randomPrimePath);
    }

    // Handle IPC randomizer call from renderer
    ipcMain.on('randomizer', (event, arg) => {
      this.runRandomizerAndPatchIso(arg, event);
    });
  }

  public runRandomizerAndPatchIso(randomizerConfig, event) {
    // Open indeterminate progress bar
    const progressBar = new ProgressBar({
      title: 'Generating Seed',
      text: 'Getting Ready...',
      indeterminate: false
    });

    progressBar.text = 'Placing items...';

    // Create randomizer object and run based on settings
    const randomizer = new Randomizer(randomizerConfig);
    randomizer.randomize();
    const layoutDescriptor = randomizer.getWorld().generateLayout();
    const layoutDescriptorHash = parseInt(crypto.SHA256(layoutDescriptor).toString().substring(0, 10), 16).toString(32).toUpperCase(); // get truncated sha256 hash of descriptor, encoded as base32

    const outputPrefix = 'Prime Randomizer';
    const outputFile = outputPrefix + ' - ' + layoutDescriptorHash;
    const outputSpoiler = outputFile + ' Spoiler.txt';

    // If no folder is specified, use default output folder
    if (!randomizerConfig.outputFolder) {
      randomizerConfig.outputFolder = path.join(app.getPath('documents'), 'Metroid Prime Randomizer');

      // Create default output folder if it doesn't exist
      if (!existsSync(randomizerConfig.outputFolder)) {
        try {
          mkdirSync(randomizerConfig.outputFolder);
        } catch (err) {
          const dirError = new Error(err);
          event.sender.send('patch-error', dirError.toString());
        }
      }
    }

    if (randomizerConfig.spoiler) {
      progressBar.text = 'Creating spoiler log...';
      this.writeSpoilerLog(randomizer, randomizerConfig, path.join(randomizerConfig.outputFolder, outputSpoiler));
    }

    // Remove trilogy ISO property if no value is used
    if (!randomizerConfig.trilogyIso) {
      delete randomizerConfig.trilogyIso;
    }

    if (randomizerConfig.generateRom) {
      progressBar.text = 'Patching ROM...';
      const configObj = {
        input_iso: randomizerConfig.baseIso,
        output_iso: path.join(randomizerConfig.outputFolder, outputFile + '.' + randomizerConfig.fileType),
        iso_format: randomizerConfig.fileType,
        layout_string: layoutDescriptor,
        skip_frigate: randomizerConfig.skipFrigate,
        skip_hudmenus: randomizerConfig.skipHudPopups,
        obfuscate_items: randomizerConfig.hideItemModels,
        artifact_hint_behavior: randomizerConfig.artifactLocationHints,
        nonvaria_heat_damage: randomizerConfig.heatDamagePrevention === HeatDamagePrevention.VARIA_ONLY,
        staggered_suit_damage: randomizerConfig.suitDamageReduction === SuitDamageReduction.CUMULATIVE,
        trilogy_disc_path: randomizerConfig.trilogyIso,
        main_menu_message: this.getMainMenuOutput(randomizer, randomizerConfig.version),
        comment: 'Metroid Prime Randomizer v' + randomizerConfig.version + ' by BashPrime, Syncathetic, and Pwootage. Permalink: ' + randomizerConfig.permalink
      };

      this.randomPrime.patchRandomizedGame(JSON.stringify(configObj), message => {
        const messageObj: { type: string, percent: number, msg: string } = JSON.parse(message);
        switch (messageObj.type) {
          case 'progress': {
            // event.sender.send('patch-progress', messageObj);
            progressBar.value = messageObj.percent;
            progressBar.detail = messageObj.msg;
            break;
          }
          case 'success': {
            event.sender.send('patch-success', 'ROM patched and saved to ' + outputFile + '.' + randomizerConfig.fileType +'.\n\nIt can be found at ' + randomizerConfig.outputFolder, randomizerConfig.outputFolder);
            break;
          }
          case 'error': {
            progressBar.close();
            event.sender.send('patch-error', messageObj.msg);
            break;
          }
          default: {
            progressBar.close();
            event.sender.send('patch-error', 'An unknown error occurred.');
          }
        }
      });
    } else {
      progressBar.close();
      event.sender.send('patch-success', 'Spoiler log saved to ' + outputSpoiler + '.' + randomizerConfig.fileType +'.\n\nIt can be found at ' + randomizerConfig.outputFolder, randomizerConfig.outputFolder);
    }
  }

  public writeSpoilerLog(randomizer: Randomizer, game: any, filePath: string) {
    const spoiler = this.generateSpoilerLog(randomizer, game);
    writeFileSync(filePath, spoiler);
  }

  generateSpoilerLog(randomizer: Randomizer, game: any) {
    const spoiler: any = { info: {} };
    const config = new Config();

    spoiler.info.version = game.version;
    spoiler.info.permalink = game.permalink;
    spoiler.info.seed = game.seed;
    spoiler.info.seedHash = randomizer.getSeedHashNames();

    // Transform settings object to their long name keys, filter out all non-shared settings, and sort them alphabetically
    spoiler.info.settings = Object.keys(game)
    .filter(key => {
      const option = config.getOptionByName(key);
      return option && option.shared;
    })
    .sort((a,b) => {
      const aLong = config.getOptionByName(a).longName;
      const bLong = config.getOptionByName(b).longName;
      if (aLong < bLong) {
        return -1;
      } else if (aLong > bLong) {
        return 1;
      }
      return 0;
    })
    .reduce((obj, key) => (obj[config.getOptionByName(key).longName] = game[key], obj), {});

    spoiler.locations = JSON.parse(randomizer.getWorld().toJson());
    spoiler.walkthrough = randomizer.getWorld().getWalkthrough();

    return JSON.stringify(spoiler, null, '\t');
  }

  getRandomPrimePath(): string {
    const buildPath = 'build/Release/randomprime';

    // Return if running in development mode
    if (this.serve) {
      return path.join(this.appRoot, buildPath);
    }

    switch (process.platform) {
      case 'darwin': {
        return path.join(app.getAppPath(), '../..', buildPath);
      }
      default: {
        return path.join(this.appRoot, buildPath);
      }
    }
  }

  private getMainMenuOutput(randomizer: Randomizer, version: string) {
    const seedHashStr = 'Seed Hash:\n' + randomizer.getSeedHashNames(true);
    const versionStr = 'Randomizer Version: ' + version;

    return seedHashStr + '\n\n' + versionStr;
  }
}

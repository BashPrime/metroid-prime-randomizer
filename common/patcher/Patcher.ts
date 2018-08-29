import { app, ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';

import { Utilities } from '../Utilities';
import { Randomizer } from '../randomizer/Randomizer';
const ProgressBar = require('electron-progressbar');

export class Patcher {
  private appRoot: string;
  private randomPrime: any;
  private serve: boolean;
  private defaultOutputFolderName = 'prime-randomizer-output';

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

  public runRandomizerAndPatchIso(game, event) {
    // Open indeterminate progress bar
    const progressBar = new ProgressBar({
      title: 'Generating Seed',
      text: 'Getting Ready...'
    });

    progressBar
      .on('completed', () => {
        progressBar.text = 'Completed!';
      });

    progressBar.text = 'Placing items...';

    // Create randomizer object and run based on settings
    const randomizer = new Randomizer(
      game.settings.mode,
      game.settings.logic,
      game.settings.artifacts,
    );

    if (game.seed) {
      randomizer.randomize(game.seed);
    } else {
      randomizer.randomize();
    }

    const outputFile = 'Prime_' + game.permalink;

    // If no folder is specified, use default output folder
    if (!game.rom.outputFolder) {
      game.rom.outputFolder = path.join(app.getPath('documents'), 'Metroid Prime Randomizer');

      // Create default output folder if it doesn't exist
      if (!existsSync(game.rom.outputFolder)) {
        try {
          mkdirSync(game.rom.outputFolder);
        } catch (err) {
          const dirError = new Error(err);
          event.sender.send('patch-error', dirError.toString());
        }
      }
    }

    if (game.rom.spoiler) {
      progressBar.text = 'Creating spoiler log...';
      this.writeSpoilerLog(randomizer, game, path.join(game.rom.outputFolder, outputFile + '_spoiler.txt'));
    }

    if (game.rom.createIso) {
      progressBar.text = 'Patching ROM...';
      const layoutDescriptor = randomizer.getWorld().generateLayout();
      const configObj = {
        input_iso: game.rom.baseIso,
        output_iso: path.join(game.rom.outputFolder, outputFile + '.iso'),
        layout_string: layoutDescriptor,
        skip_frigate: game.rom.skipFrigate,
        skip_hudmenus: game.rom.skipHudPopups,
        comment: 'prime-randomizer-web ' + game.version + ' permalink: ' + game.permalink
      };

      this.randomPrime.patchRandomizedGame(JSON.stringify(configObj), message => {
        const messageObj: { type: string, percent: number, msg: string } = JSON.parse(message);
        switch (messageObj.type) {
          case 'progress': {
            event.sender.send('patch-progress', messageObj);
            break;
          }
          case 'success': {
            progressBar.setCompleted();
            event.sender.send('patch-success', 'ROM patched successfully.\n\nIt can be found at ' + game.rom.outputFolder);
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
      event.sender.send('patch-success', 'ROM patched successfully.\n\nIt can be found at ' + game.rom.outputFolder);
      progressBar.setCompleted();
    }
  }

  public writeSpoilerLog(randomizer: Randomizer, game: any, filePath: string) {
    const spoiler = this.generateSpoilerLog(randomizer, game);
    writeFileSync(filePath, spoiler);
  }

  generateSpoilerLog(randomizer: Randomizer, game: any) {
    const spoiler: any = { info: {} };
    spoiler.info.version = game.version;
    spoiler.info.permalink = game.permalink;
    spoiler.info.seed = randomizer.getSeed();
    spoiler.info.logic = randomizer.getLogic();
    spoiler.info.mode = randomizer.getMode();
    spoiler.info.artifacts = randomizer.getRandomizedArtifacts();
    spoiler.locations = JSON.parse(randomizer.getWorld().toJson());

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
}

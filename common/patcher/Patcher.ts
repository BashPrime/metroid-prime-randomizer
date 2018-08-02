import { app, ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';

import { Utilities } from '../Utilities';
import { Randomizer } from '../randomizer/Randomizer';

export class Patcher {
  private appRoot: string;
  private randomPrime: any;
  private serve: boolean;
  private defaultOutputFolderName: string = 'prime-randomizer-output';

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

    if (!game.rom.outputFolder) {
      game.rom.outputFolder = path.join(this.appRoot, this.defaultOutputFolderName);

      // Handle bundled Windows portable app
      if (process.platform === 'win32' && process.env.PORTABLE_EXECUTABLE_DIR) {
        game.rom.outputFolder = path.join(process.env.PORTABLE_EXECUTABLE_DIR, this.defaultOutputFolderName);
      }

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
      this.writeSpoilerLog(randomizer, game, path.join(game.rom.outputFolder, outputFile + '_spoiler.txt'));
    }

    if (game.rom.createIso) {
      const layoutDescriptor = randomizer.getWorld().generateLayout();
      const configObj = {
        input_iso: game.rom.baseIso,
        output_iso: path.join(game.rom.outputFolder, outputFile + '.iso'),
        layout_string: layoutDescriptor,
        skip_frigate: true,
        skip_hudmenus: true,
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
            event.sender.send('patch-success', messageObj.msg);
            break;
          }
          case 'error': {
            event.sender.send('patch-error', messageObj.msg);
            break;
          }
          default: {
            // Do nothing
          }
        }
      });
    } else {
      event.sender.send('patch-success');
    }
  }

  public writeSpoilerLog(randomizer: Randomizer, game: any, path: string) {
    const spoiler = this.generateSpoilerLog(randomizer, game);
    writeFileSync(path, spoiler);
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

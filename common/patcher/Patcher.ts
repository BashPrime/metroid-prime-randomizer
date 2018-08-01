import { app, ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';

import { Utilities } from '../Utilities';
import { Randomizer } from '../randomizer/Randomizer';

export class Patcher {
    workingFolder: string;
    randomPrime: any;

    constructor() {
        const serve = Utilities.isServe();
        const randomPrimePath = this.getRandomPrimePath();
        this.workingFolder = Utilities.getWorkingFolder();

        // Gracefully handle unresolved randomprime native path
        try {
            this.randomPrime = require(randomPrimePath);
        } catch(err) {
            throw new ReferenceError('Cannot resolve the randomprime native module' + randomPrimePath);
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

        const layoutDescriptor = randomizer.getWorld().generateLayout();

        // Set default output folder to working directory if one isn't provided by the user
        if (!game.rom.outputFolder) {
            game.rom.outputFolder = this.workingFolder + '/output';

            // Create default output folder if it doesn't exist
            if (!existsSync(game.rom.outputFolder)) {
                mkdirSync(game.rom.outputFolder);
            }
        }

        const randomprime = './bin/randomprime_patcher.win_64bit.exe';
        const outputFile = 'Prime_' + game.permalink;

        const configObj = {
            input_iso: game.rom.baseIso,
            output_iso: game.rom.outputFolder + '/' + outputFile + '.iso',
            layout_string: layoutDescriptor,
            skip_frigate: true,
            skip_hudmenus: true,
            comment: 'prime-randomizer-web ' + game.version + ' permalink: ' + game.permalink
        };

        if (game.rom.spoiler) {
            this.writeSpoilerLog(randomizer, game, game.rom.outputFolder + '/' + outputFile + '_spoiler.txt');
        }

        if (game.rom.createIso) {
            this.randomPrime.patchRandomizedGame(JSON.stringify(configObj), message => {
                const messageObj: {type: string, percent: number, msg: string} = JSON.parse(message);
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
      const serve = Utilities.isServe();
      const buildPath = 'build/Release/randomprime';

      // Return if running in development mode
      if (serve) {
        return path.join('../..', buildPath);
      }

      switch (process.platform) {
        case 'darwin': {
          return path.join(path.dirname(app.getPath('exe')), '..', buildPath);
        }
        default: {
          return path.join(path.dirname(app.getPath('exe')), buildPath);
        }
      }
    }
}

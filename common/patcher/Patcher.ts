import { ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { Randomizer } from '../randomizer/Randomizer';
const randomPrimeNative = require('../../build/Release/randomprime');

export class Patcher {
    workingFolder: string;

    constructor() {
        // If Windows portable file, use enviornment variable to properly set working directory
        // due to the relative path being within the unpacked application in AppData
        this.workingFolder = process.env.PORTABLE_EXECUTABLE_DIR;
        if (!this.workingFolder) {
            this.workingFolder = '.';
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
        const outputFile = 'Prime_' + game.version + '_' + randomizer.getLogic() + '_' + randomizer.getMode()
            + '_' + randomizer.getRandomizedArtifacts() + '_' + randomizer.getSeed();

        const configObj = {
            input_iso: game.rom.baseIso,
            output_iso: game.rom.outputFolder + '/' + outputFile + '.iso',
            layout_string: layoutDescriptor
        };

        if (game.rom.spoiler) {
            this.writeSpoilerLog(randomizer, game.version, game.rom.outputFolder + '/' + outputFile + '_spoiler.txt');
        }

        if (game.rom.createIso) {
            randomPrimeNative.patchRandomizedGame(JSON.stringify(configObj), message => {
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

    public writeSpoilerLog(randomizer: Randomizer, version: string, path: string) {
        const spoiler = this.generateSpoilerLog(randomizer, version);
        writeFileSync(path, spoiler);
    }

    generateSpoilerLog(randomizer: Randomizer, version: string) {
        const spoiler: any = { info: {} };
        spoiler.info.version = version;
        // spoiler.info.permalink = this.generatedPermalink;
        spoiler.info.seed = randomizer.getSeed();
        spoiler.info.logic = randomizer.getLogic();
        spoiler.info.mode = randomizer.getMode();
        spoiler.info.artifacts = randomizer.getRandomizedArtifacts();
        spoiler.locations = JSON.parse(randomizer.getWorld().toJson());

        return JSON.stringify(spoiler, null, '\t');
    }
}

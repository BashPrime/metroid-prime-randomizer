import { ipcMain } from 'electron';
import { execFile } from 'child_process';
import { mkdirSync, existsSync, writeFileSync } from 'fs';

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
            this.patchRandomizedGame(arg, event);
        });
    }

    public patchRandomizedGame(game, event?) {
        // Set default output folder to working directory if one isn't provided by the user
        if (!game.rom.outputFolder) {
            game.rom.outputFolder = this.workingFolder + '/output';

            // Create default output folder if it doesn't exist
            if (!existsSync(game.rom.outputFolder)) {
                mkdirSync(game.rom.outputFolder);
            }
        }

        const randomprime = './patcher/exec/randomprime_patcher.win_64bit.exe';
        const outputFile = 'Prime_' + game.version + '_' + game.settings.logic + '_' + game.settings.mode
        + '_' + game.settings.artifacts + '_' + game.settings.difficulty + '_' + game.seed;

        const params = [
            '--skip-frigate',
            '--non-modal-item-messages',
            '--input-iso', game.rom.baseIso,
            '--output-iso', game.rom.outputFolder + '/' + outputFile + '.iso',
            '--layout', game.layoutDescriptor
        ];

        if (game.rom.spoiler) {
            this.writeSpoilerLog(game, outputFile);
        }

        let child;
        if (game.rom.createIso) {
            child = execFile(randomprime, params, function (error, stdout, stderr) {
                if (error) {
                    console.log('error', error);
                    if (event) {
                        event.sender.send('patching-error', error);
                    }
                }
            });

            // use event hooks to provide a callback to execute when data are available:
            // hook on stdout for progress updates, send progress to view
            child.stdout.on('data', function (data) {
                console.log('stdout', data.toString());

                // mark game as successfully patched if stdout reaches Done
                if (event) {
                    if (data.toString().indexOf('Done') > -1) {
                        event.sender.send('patch-complete');
                    } else {
                        event.sender.send('patch-update', data.toString());
                    }
                }
            });

            // send errors to view if needed
            child.stderr.on('data', function (data) {
                const msg = data.toString();
                console.log('stderr', msg);
                if (event) {
                    let errMsg = msg;
                    const errorIndex = msg.indexOf('error: ');
                    if (errorIndex > -1) {
                        errMsg = msg.substr(errorIndex + 'error: '.length);
                    }
                    event.sender.send('patching-error', errMsg);
                }
            });

            // output error code to Electron main console
            child.on('exit', (code, signal) => {
                console.log('exit code', code);
            });
        } else if (event) {
            event.sender.send('patch-complete');
        }
    }

    public writeSpoilerLog(game, outputFile) {
        writeFileSync(game.rom.outputFolder + '/' + outputFile + '_spoiler.txt', game.spoiler);
    }
}

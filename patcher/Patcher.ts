import { ipcMain } from 'electron';
import { execFile } from 'child_process';

export class Patcher {
    constructor() {
        ipcMain.on('randomizer', (event, arg) => {
            this.patchRandomizedGame(arg, event);
        });
    }

    public patchRandomizedGame(game, event?) {
        const randomprime = './patcher/exec/randomprime_patcher.win_64bit.exe';
        const outputFileName = 'Prime_' + game['version'] + '_' + game['logic'] + '_' + game['mode']
            + '_' + game['artifacts'] + '_' + game['difficulty'] + '_' + game['seed'] + '.iso';
        const params = [
            '--skip-frigate',
            '--non-modal-item-messages',
            '--input-iso', game['cleanIso'],
            '--output-iso', game['outputFolder'] + '/' + outputFileName,
            '--layout', game['layoutDescriptor']
        ];

        const child = execFile(randomprime, params, function (error, stdout, stderr) {
            if (error) {
                console.log(error);
                console.log(stderr);
                if (event) {
                    event.sender.send('patching-error', error);
                }
            }
        });

        // use event hooks to provide a callback to execute when data are available:
        child.stdout.on('data', function (data) {
            console.log(data.toString());
            if (event) {
                event.sender.send('patch-update', data.toString());
            }
        });

        child.stderr.on('data', function (data) {
            console.log(data.toString());
        });

        child.on('exit', (code, signal) => {
            if (event) {
                event.sender.send('patched');
            }
        });
    }
}

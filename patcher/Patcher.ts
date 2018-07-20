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
    }
}

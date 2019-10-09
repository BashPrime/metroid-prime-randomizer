import { ipcMain } from 'electron';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings } from '../models/prime/randomizerSettings';

let _seedQueue: any[] = [];
const seedQueue$ = new BehaviorSubject<any[]>([]);
const isProcessing$ = new BehaviorSubject<boolean>(false);

export function initialize() {
  combineLatest(seedQueue$, isProcessing$).subscribe(([queue, isProcessing]) => {
    _seedQueue = queue;

    if (!isProcessing && _seedQueue.length) {
      processQueueItem();
    }
  });

  // Add seed from request to seed queue
  ipcMain.on('generateSeed', (event) => {
    _seedQueue.push({});
    seedQueue$.next(_seedQueue);
  });

  ipcMain.on('getDefaultSettings', (event) => {
    event.sender.send('getDefaultSettingsResponse', new PrimeRandomizerSettings({}));
  });
}

function processQueueItem() {
  isProcessing$.next(true);
  setTimeout(() => {
    if (_seedQueue.length) {
      _seedQueue.shift();
      console.log('Queue item processed (' + _seedQueue.length + ' remaining)');
      seedQueue$.next(_seedQueue);
    }
    isProcessing$.next(false);
  }, 1000);
}

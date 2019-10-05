import { ipcMain } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { generateWorld } from '../models/prime/randomizer';
import { PrimeRandomizerSettings } from '../models/prime/randomizerSettings';

let _seedQueue: any[] = [];
const seedQueue$ = new BehaviorSubject<any[]>([]);

export function initialize() {
  seedQueue$.subscribe(queue => {
    _seedQueue = queue;

    if (_seedQueue.length) {
      // generateWorld(new PrimeRandomizerSettings({}));
      setTimeout(() => {
        _seedQueue.shift();
        console.log('seedQueue is now ' + _seedQueue.length);
        seedQueue$.next(_seedQueue);
      }, 3000);
    }
  });

  // Add seed from request to seed queue
  ipcMain.on('generateSeed', (event) => {
    const queue = _seedQueue;
    queue.push({});
    seedQueue$.next(queue);
  });
}

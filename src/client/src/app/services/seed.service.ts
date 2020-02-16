import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

export interface HistoryObject {
  [id: string]: { seed: GeneratedSeed };
}

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private seedHistory$ = new BehaviorSubject<GeneratedSeed[]>(undefined);
  _seedHistory = this.seedHistory$.asObservable();
  
  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.getSeedHistory();

    this.electronService.ipcRenderer.on('getSeedHistoryResponse', (event, seedHistory: HistoryObject) => {
      this.ngZone.run(() => {
        const historyArray: GeneratedSeed[] = [];

        // Build array out of history object
        for (let id in seedHistory) {
          const seedObject = seedHistory[id].seed;
          seedObject.createdDate = new Date(seedObject.createdDate);

          historyArray.push(seedObject);
        }

        this.seedHistory$.next(historyArray);
      });
    });
  }

  getSeedHistory() {
    this.electronService.ipcRenderer.send('getSeedHistory');
  }
}

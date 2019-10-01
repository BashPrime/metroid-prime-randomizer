import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  seedHistory$ = new BehaviorSubject<GeneratedSeed[]>(undefined);
  
  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.getSeedHistory();

    this.electronService.ipcRenderer.on('getSeedHistoryResponse', (event, seedHistory) => {
      this.ngZone.run(() => {
        this.seedHistory$.next(seedHistory.map(seed => {
          seed.date = new Date(seed.date);
          return seed;
        }));
      });
    });
  }

  getSeedHistory() {
    this.electronService.ipcRenderer.send('getSeedHistory');
  }
}

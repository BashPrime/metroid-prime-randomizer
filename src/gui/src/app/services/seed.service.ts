import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private seedHistory$ = new BehaviorSubject<GeneratedSeed[]>(undefined);
  _seedHistory = this.seedHistory$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService) {
    this.getSeedHistory();

    this.electronService.ipcRenderer.on('getSeedHistoryResponse', (event, seedHistory: GeneratedSeed[]) => {
      this.ngZone.run(() => {
        this.seedHistory$.next(seedHistory);
      });
    });
  }

  getSeedHistory() {
    this.electronService.ipcRenderer.send('getSeedHistory');
  }
}

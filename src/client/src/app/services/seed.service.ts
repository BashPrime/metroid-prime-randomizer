import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  seedHistory = new BehaviorSubject<GeneratedSeed[]>([]);
  currentSeed = new BehaviorSubject<GeneratedSeed>(undefined);

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('getSeedHistoryResponse', (event, seedHistory) => {
      this.seedHistory.next(seedHistory);
    });

    this.electronService.ipcRenderer.on('getCurrentSeedResponse', (event, currentSeed) => {
      this.currentSeed.next(currentSeed);
    });
  }

  getSeedHistory() {
    this.electronService.ipcRenderer.send('getSeedHistory');
  }
}

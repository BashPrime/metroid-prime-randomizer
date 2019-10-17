import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  seedHistory$ = new BehaviorSubject<GeneratedSeed[]>(undefined);
  generatedSeed$ = new BehaviorSubject<GeneratedSeed>(undefined);
  
  constructor(private ngZone: NgZone, private router: Router, private electronService: ElectronService) {
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

  setUpRomGeneration(seed: GeneratedSeed) {
    this.generatedSeed$.next(seed);
    this.router.navigate(['/generate-rom']);
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SeedService } from '../services/seed.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Component({
  selector: 'app-seed-history',
  templateUrl: './seed-history.component.html',
  styleUrls: ['./seed-history.component.scss']
})
export class SeedHistoryComponent implements OnInit {
  isLoaded = false;
  seedHistory: GeneratedSeed[];

  constructor(private changeDetectorRef: ChangeDetectorRef, private seedService: SeedService) {}

  ngOnInit() {              
    this.seedService.seedHistory.subscribe(seedHistory => {
      if (seedHistory === undefined) {
        this.getSeedHistory();
      } else {
        this.seedHistory = seedHistory;
        this.isLoaded = true;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  private getSeedHistory() {
    this.seedService.getSeedHistory();
  }

}

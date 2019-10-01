import { Component, OnInit } from '@angular/core';
import { SeedService } from '../services/seed.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Component({
  selector: 'app-seed-history',
  templateUrl: './seed-history.component.html',
  styleUrls: ['./seed-history.component.scss']
})
export class SeedHistoryComponent implements OnInit {
  isLoaded = false;
  seeds: GeneratedSeed[];

  constructor(private seedService: SeedService) { }

  ngOnInit() {
    this.seedService.seedHistory$.subscribe(seedHistory => {
      this.seeds = seedHistory;
      this.isLoaded = true;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SeedService } from '../services/seed.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Component({
  selector: 'app-seed-history',
  templateUrl: './seed-history.component.html',
  styleUrls: ['./seed-history.component.scss']
})
export class SeedHistoryComponent implements OnInit {
  isLoaded = false;
  seedHistory: GeneratedSeed[];
  faChevronLeft = faChevronLeft;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private seedService: SeedService) { }

  ngOnInit() {
    this.seedService._seedHistory
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(seedHistory => {
      this.seedHistory = seedHistory;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

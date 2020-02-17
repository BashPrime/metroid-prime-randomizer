import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GeneratorService } from '../services/generator.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  private seeds: GeneratedSeed[];
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {
    // Get generated seed from service
    this.generatorService._generatedSeeds
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(seeds => {
      this.seeds = seeds;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getSeeds(): GeneratedSeed[] {
    return this.seeds;
  }

  getPermalink(seed: GeneratedSeed): string {
    return Utilities.generatePermalink(seed.seed, seed.settingsString);
  }
}

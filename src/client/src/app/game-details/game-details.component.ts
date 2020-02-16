import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GeneratorService } from '../services/generator.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  private seed: GeneratedSeed;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {
    // Get generated seed from service
    this.generatorService._generatedSeed
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(seed => {
      this.seed = seed;
    });
  }

  getSeed(): GeneratedSeed {
    return this.seed;
  }
}

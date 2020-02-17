import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GeneratorService } from '../services/generator.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  private seeds: GeneratedSeed[];
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  // Constants
  readonly LIST_STYLE = { height: '100%' };


  constructor(private generatorService: GeneratorService, private clipboardService: ClipboardService, private toastrService: ToastrService) { }

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

  copyPermalink(permalink: string): void {
    this.clipboardService.copy(permalink);
    this.toastrService.info('Permalink copied.');
  }
}

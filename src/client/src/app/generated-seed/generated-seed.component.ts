import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';

import { SeedService } from '../services/seed.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Component({
  selector: 'app-generated-seed',
  templateUrl: './generated-seed.component.html',
  styleUrls: ['./generated-seed.component.scss']
})
export class GeneratedSeedComponent implements OnInit {
  isLoaded = false;
  seed: GeneratedSeed;

  constructor(
    private route: ActivatedRoute,
    private seedService: SeedService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data && this.route.snapshot.data.withIndex) {
      zip(this.route.params, this.seedService.seedHistory$).subscribe(([params, seedHistory]) => {
        this.seed = seedHistory[params.index];
        this.isLoaded = true;
      });    
    }
  }
}

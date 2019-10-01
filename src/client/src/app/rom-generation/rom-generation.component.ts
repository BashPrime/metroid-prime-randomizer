import { Component, OnInit } from '@angular/core';
import { SeedService } from '../services/seed.service';
import { GeneratedSeed } from '../../../../common/generatedSeed';

@Component({
  selector: 'app-rom-generation',
  templateUrl: './rom-generation.component.html',
  styleUrls: ['./rom-generation.component.scss']
})
export class RomGenerationComponent implements OnInit {
  seed: GeneratedSeed;
  isLoaded = false;

  constructor(private seedService: SeedService) { }

  ngOnInit() {
    this.seedService.generatedSeed$.subscribe(seed => {
      this.seed = seed;
      this.isLoaded = true;
    });
  }

}

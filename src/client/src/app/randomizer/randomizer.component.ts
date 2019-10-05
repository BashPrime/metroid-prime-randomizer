import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../services/generator.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  private tabs: Tab[] = [
    { name: 'ROM Settings', route: 'rom-settings' },
    { name: 'Rules', route: 'rules' },
    { name: 'Logic', route: 'logic' }
  ];

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {
  }

  getTabs(): Tab[] {
    return this.tabs;
  }

  generateSeed() {
    this.generatorService.generateSeed();
  }
}

interface Tab {
  name: string;
  route: string;
}

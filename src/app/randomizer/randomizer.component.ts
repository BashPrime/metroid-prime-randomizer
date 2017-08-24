import { Component, OnInit } from '@angular/core';
import { Randomizer } from './Randomizer';
import { Location } from './Location';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  randomizer: Randomizer;
  locations: Array<Location>;
  selectedSeed: number;
  selectedMode: string;
  selectedLogic: string;
  selectedDifficulty: string;
  modes = [
    { name: "Standard", value: "Standard" }
  ];
  logics = [
    { name: "No Glitches", value: "NoGlitches" }
  ];
  difficulties = [
    { name: "Normal", value: "Normal" }
  ];
  
  constructor() {
    this.selectedMode = this.modes[0].value;
    this.selectedLogic = this.logics[0].value;
    this.selectedDifficulty = this.difficulties[0].value;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.runRandomizer();
  }

  runRandomizer(): void {
    this.randomizer = new Randomizer(this.selectedMode, this.selectedLogic, this.selectedDifficulty);

    if (this.selectedSeed)
      this.randomizer.randomize(this.selectedSeed);
    else
      this.randomizer.randomize();

    this.locations = this.randomizer.getWorld().getLocations();
  }

}

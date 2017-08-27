import { Component, OnInit } from '@angular/core';
import { Randomizer } from './Randomizer';
import { Region } from './Region';
import { Location } from './Location';
import { RandomizerMode } from './enums/RandomizerMode';
import { RandomizerLogic } from './enums/RandomizerLogic';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  randomizer: Randomizer;
  regions: Array<Region>;
  locations: Array<Location>;
  selectedSeed: number;
  selectedMode: string;
  selectedLogic: string;
  selectedDifficulty: string;
  layoutString: string;
  toggleSpoilers: boolean = false;
  modes = [
    { name: "Standard", value: RandomizerMode.STANDARD },
    { name: "Major Items", value: RandomizerMode.MAJORS },
  ];
  logics = [
    { name: "No Glitches", value: RandomizerLogic.NO_GLITCHES },
    { name: "Naive", value: RandomizerLogic.NAIVE }
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

    this.regions = this.randomizer.getWorld().getRegions();
    this.locations = this.randomizer.getWorld().getLocations();
    this.layoutString = this.randomizer.getWorld().generateLayout();
  }

}

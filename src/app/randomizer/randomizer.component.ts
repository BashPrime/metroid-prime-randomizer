import {Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import {Randomizer} from '../../common/randomizer/Randomizer';
import {Region} from '../../common/randomizer/Region';
import {Location} from '../../common/randomizer/Location';
import {RandomizerMode} from '../../common/randomizer/enums/RandomizerMode';
import {RandomizerLogic} from '../../common/randomizer/enums/RandomizerLogic';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  randomizer: Randomizer;
  regions: Array<Region>;
  selectedRegionIndex: number;
  locations: Array<Location>;
  selectedSeed: number;
  selectedMode: string;
  selectedLogic: string;
  selectedDifficulty: string;
  layoutString: string;
  toggleSpoilers = false;
  spoilerLog: string;
  spoilerFileName: string;
  downloadJsonHref: SafeUrl;
  modes = [
    {name: 'Standard', value: RandomizerMode.STANDARD},
    {name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS}
  ];
  logics = [
    {name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES},
    {name: 'Minor Glitches', value: RandomizerLogic.MINOR_GLITCHES},
    {name: 'Naive', value: RandomizerLogic.NAIVE}
  ];
  difficulties = [
    {name: 'Normal', value: 'normal'}
  ];

  constructor(private sanitizer: DomSanitizer) {
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
    this.spoilerLog = undefined;
    this.randomizer = new Randomizer(this.selectedMode, this.selectedLogic, this.selectedDifficulty);

    if (this.selectedSeed) {
      this.selectedSeed = this.selectedSeed < 1 ? 1 : this.selectedSeed > 999999999 ? 999999999 : this.selectedSeed;
      this.randomizer.randomize(this.selectedSeed);
    } else {
      this.randomizer.randomize();
    }
    this.regions = this.randomizer.getWorld().getRegions();
    this.locations = this.randomizer.getWorld().getLocations();
    this.layoutString = this.randomizer.getWorld().generateLayout();
    this.generateSpoilerLog();
  }

  generateSpoilerLog(): void {
    const spoiler: any = {info: {}};
    spoiler.info.mode = this.randomizer.getMode();
    spoiler.info.logic = this.randomizer.getLogic();
    spoiler.info.difficulty = this.randomizer.getDifficulty();
    spoiler.info.seed = this.randomizer.getSeed();
    spoiler.locations = JSON.parse(this.randomizer.getWorld().toJson());

    this.spoilerLog = JSON.stringify(spoiler, null, '\t');

    const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(this.spoilerLog));
    this.downloadJsonHref = uri;

    this.spoilerFileName = 'prime_randomizer_' + this.randomizer.getMode() +
      '_' + this.randomizer.getLogic() + '_' + this.randomizer.getDifficulty() +
      '_' + this.randomizer.getSeed() + '.txt';
  }

}

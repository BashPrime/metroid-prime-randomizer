import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ClipboardService } from 'ngx-clipboard';

import { environment } from '../../environments/environment';
import {Randomizer} from '../../common/randomizer/Randomizer';
import {Region} from '../../common/randomizer/Region';
import {Location} from '../../common/randomizer/Location';
import {RandomizerMode} from '../../common/randomizer/enums/RandomizerMode';
import {RandomizerLogic} from '../../common/randomizer/enums/RandomizerLogic';
import {RandomizerArtifacts} from '../../common/randomizer/enums/RandomizerArtifacts';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  version: string = environment.version;
  randomizer: Randomizer;
  regions: Array<Region>;
  selectedRegionIndex: number = 0;
  locations: Array<Location>;
  selectedSeed: number;
  selectedMode: string;
  selectedLogic: string;
  defaultLogic: string = RandomizerLogic.NO_GLITCHES;
  selectedDifficulty: string;
  selectedArtifacts: string;
  layoutDescriptor: string;
  toggleSpoilers = false;
  spoilerLog: string;
  spoilerFileName: string;
  downloadJsonHref: SafeUrl;
  showPatchingInstructions: boolean = false;
  modes = [
    {name: 'Standard', value: RandomizerMode.STANDARD},
    {name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS}
  ];
  logics = [
    {name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES},
    {name: 'Normal', value: RandomizerLogic.NORMAL},
    {name: 'Hard', value: RandomizerLogic.HARD}
  ];
  difficulties = [
    {name: 'Normal', value: 'normal'}
  ];
  artifacts = [
    {name: 'Vanilla (Not Randomized)', value: RandomizerArtifacts.VANILLA},
    {name: 'Randomized', value: RandomizerArtifacts.RANDOMIZED}
  ];

  constructor(private sanitizer: DomSanitizer, private clipboardService: ClipboardService, public snackBar: MatSnackBar) {
    this.selectedMode = RandomizerMode.STANDARD;
    this.selectedLogic = RandomizerLogic.NO_GLITCHES;
    this.selectedDifficulty = 'normal';
    this.selectedArtifacts = RandomizerArtifacts.VANILLA;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.regions = undefined;
    this.locations = undefined;
    this.layoutDescriptor = undefined;
    this.runRandomizer();
  }

  runRandomizer(): void {
    this.spoilerLog = undefined;
    this.randomizer = new Randomizer(this.selectedMode, this.selectedLogic, this.selectedArtifacts, this.selectedDifficulty);

    if (this.selectedSeed) {
      this.selectedSeed = this.selectedSeed < 1 ? 1 : this.selectedSeed > 999999999 ? 999999999 : this.selectedSeed;
      this.randomizer.randomize(this.selectedSeed);
    } else {
      this.randomizer.randomize();
    }
    this.regions = this.randomizer.getWorld().getRegions();
    this.locations = this.randomizer.getWorld().getLocations();
    this.layoutDescriptor = this.randomizer.getWorld().generateLayout();
    this.generateSpoilerLog();
  }

  generateSpoilerLog(): void {
    const spoiler: any = {info: {}};
    spoiler.info.mode = this.randomizer.getMode();
    spoiler.info.logic = this.randomizer.getLogic();
    spoiler.info.randomizedArtifacts = this.randomizer.getRandomizedArtifacts();
    spoiler.info.difficulty = this.randomizer.getDifficulty();
    spoiler.info.seed = this.randomizer.getSeed();
    spoiler.info.version = this.version;
    spoiler.locations = JSON.parse(this.randomizer.getWorld().toJson());

    this.spoilerLog = JSON.stringify(spoiler, null, '\t');

    const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(this.spoilerLog));
    this.downloadJsonHref = uri;

    this.spoilerFileName = 'prime_randomizer_' + this.randomizer.getMode() +
      '_' + this.randomizer.getLogic() + '_' + this.randomizer.getDifficulty() +
      '_' + this.randomizer.getSeed() + '.txt';
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
  }

}

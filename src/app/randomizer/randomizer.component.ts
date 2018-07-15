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
  selectedPermalink: string;
  model: any = {
    logic: RandomizerLogic.NO_GLITCHES,
    mode: RandomizerMode.STANDARD,
    difficulty: 'normal',
    artifacts: RandomizerArtifacts.VANILLA
  };
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
    this.randomizer = new Randomizer(this.model['mode'], this.model['logic'], this.model['artifacts'], this.model['difficulty']);

    if (this.model['seed']) {
      this.model['seed'] = this.model['seed'] < 1 ? 1 : this.model['seed'] > 999999999 ? 999999999 : this.model['seed'];
      this.randomizer.randomize(this.model['seed']);
    } else {
      this.randomizer.randomize();
    }
    this.regions = this.randomizer.getWorld().getRegions();
    this.locations = this.randomizer.getWorld().getLocations();
    this.layoutDescriptor = this.randomizer.getWorld().generateLayout();
    let permaObj = JSON.parse(JSON.stringify(this.model));
    permaObj['seed'] = this.randomizer.getSeed();
    this.selectedPermalink = btoa(JSON.stringify(permaObj));
    this.generateSpoilerLog();
  }

  generateSpoilerLog(): void {
    const spoiler: any = {info: {}};
    spoiler.info.mode = this.randomizer.getMode();
    spoiler.info.logic = this.randomizer.getLogic();
    spoiler.info.artifacts = this.randomizer.getRandomizedArtifacts();
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

  onPermalinkChange(e: any) {
    try {
      let decoded = atob(e);
      this.model = JSON.parse(decoded);
    } catch (exception) {
      if (!e)
        alert("Not valid base64");
    }
  }

}

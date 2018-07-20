import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ClipboardService } from 'ngx-clipboard';

import { environment } from '../../environments/environment';
import { Randomizer } from '../../common/randomizer/Randomizer';
import { Region } from '../../common/randomizer/Region';
import { Location } from '../../common/randomizer/Location';
import { RandomizerMode } from '../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../common/randomizer/enums/RandomizerArtifacts';
import { Utilities } from '../../common/Utilities';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  version: string = environment.version;
  randomizer: Randomizer;
  regions: Array<Region>;
  selectedRegionIndex = 0;
  locations: Array<Location>;
  model: any = {
    logic: RandomizerLogic.NO_GLITCHES,
    mode: RandomizerMode.STANDARD,
    difficulty: 'normal',
    artifacts: RandomizerArtifacts.VANILLA
  };
  generatedPermalink: string;
  defaultLogic = RandomizerLogic.NO_GLITCHES;
  layoutDescriptor: string;
  toggleSpoilers = false;
  spoilerLog: string;
  spoilerFileName: string;
  downloadJsonHref: SafeUrl;
  showPatchingInstructions: boolean = false;
  dropdowns: any = {
    logic: [
      { name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES },
      { name: 'Normal', value: RandomizerLogic.NORMAL },
      { name: 'Hard', value: RandomizerLogic.HARD }
    ],
    mode: [
      { name: 'Standard', value: RandomizerMode.STANDARD },
      { name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS }
    ],
    difficulty: [
      { name: 'Normal', value: 'normal' }
    ],
    artifacts: [
      { name: 'Vanilla (Not Randomized)', value: RandomizerArtifacts.VANILLA },
      { name: 'Randomized', value: RandomizerArtifacts.RANDOMIZED }
    ]
  };
  hexStringFormat = ['logic', 'mode', 'difficulty', 'artifacts'];

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

    let game = JSON.parse(JSON.stringify(this.model));
    game['seed'] = this.randomizer.getSeed();
    this.generatedPermalink = this.getPermalinkFromGame(game);
    this.model['permalink'] = this.generatedPermalink;

    this.generateSpoilerLog();
  }

  generateSpoilerLog(): void {
    const spoiler: any = { info: {} };
    spoiler.info.version = this.version;
    spoiler.info.permalink = this.generatedPermalink;
    spoiler.info.seed = this.randomizer.getSeed();
    spoiler.info.logic = this.randomizer.getLogic();
    spoiler.info.mode = this.randomizer.getMode();
    spoiler.info.artifacts = this.randomizer.getRandomizedArtifacts();
    spoiler.info.difficulty = this.randomizer.getDifficulty();
    spoiler.info.layoutDescriptor = this.layoutDescriptor;
    spoiler.locations = JSON.parse(this.randomizer.getWorld().toJson());

    this.spoilerLog = JSON.stringify(spoiler, null, '\t');

    const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(this.spoilerLog));
    this.downloadJsonHref = uri;

    this.spoilerFileName = 'prime_randomizer_' + this.version + '_' + this.randomizer.getLogic() +
      '_' + this.randomizer.getMode() + '_' + this.randomizer.getRandomizedArtifacts() + '_' +
      this.randomizer.getDifficulty() + '_' + this.randomizer.getSeed() + '.txt';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
  }

  onPermalinkChange(permalink: string) {
    this.clearPermalink();
    if (permalink) {
      const game = this.getGameFromPermalink(permalink);

      if (game) {
        this.model = JSON.parse(JSON.stringify(game));
        this.model['permalink'] = permalink;
      }
    }
  }

  clearPermalink() {
    this.model['permalink'] = null;
  }

  getPermalinkFromGame(game: any): string {
    let permalink = this.version + ',' + game['seed'] + ',';
    return btoa(this.version + ',' + game['seed'] + ',' + this.getHexStringFromGamePrefs(game));
  }

  getGameFromPermalink(permalink: string): any {
    let permalinkRaw;
    const invalidText = 'This permalink is invalid.';
    try {
      permalinkRaw = atob(permalink);
    } catch {
      alert(invalidText);
      return null;
    }

    const permalinkSeg = permalinkRaw.split(',');

    if (permalinkSeg.length !== 3) {
      alert(invalidText);
      return null;
    }

    // Validate matching versions
    if (permalinkSeg[0].match(/\d\.\d\.\d/g)) {
      if (permalinkSeg[0] !== this.version) {
        alert('This permalink was generated with a different version of the randomizer and cannot be used.');
        return null;
      }
    } else {
      alert(invalidText);
      return null;
    }

    // Generate game object
    let game = this.getGamePrefsFromHexString(permalinkSeg[2]);

    if (!game) {
      alert(invalidText);
      return null;
    }

    game['seed'] = permalinkSeg[1];
    return game;
  }

  getHexStringFromGamePrefs(gamePrefs: any): string {
    let hexStr = '';
    for (let key of this.hexStringFormat) {
      this.dropdowns[key].find((dropdown: any, index: number) => {
        // Convert dropdown index value into half-byte hex value (1ch)
        if (dropdown.value === gamePrefs[key])
          hexStr += Utilities.toPaddedHexString(index, 1);
      });
    }

    return hexStr;
  }

  getGamePrefsFromHexString(hexStr: string) {
    let gamePrefs: any = {};
    // Hex values are half a byte, so we need to segment every one character
    let hexSegments = hexStr.match(/.{1,1}/g);

    // Hex string is invalid if lengths don't match
    if (hexSegments.length !== this.hexStringFormat.length)
      return null;

    for (let i = 0; i < hexSegments.length; i++) {
      const key = this.hexStringFormat[i];
      const index = parseInt(hexSegments[i], 16);
      if (!this.dropdowns[key][index])
        return null;

      gamePrefs[key] = this.dropdowns[key][index].value;
    }

    return gamePrefs;
  }


}

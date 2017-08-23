import { Component } from '@angular/core';
import { Randomizer } from './randomizer/Randomizer';
import { Location } from './randomizer/Location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Metroid Prime Randomizer';
  randomizer: Randomizer;
  locations: Array<Location>;
  constructor() {
    this.randomizer = new Randomizer("Standard", "NoGlitches", "Normal");
    this.randomizer.randomize();
    this.locations = this.randomizer.getWorld().getLocations();
  }
}

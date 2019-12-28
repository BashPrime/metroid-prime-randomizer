import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { RandomizerService } from '../../services/randomizer.service';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent implements OnInit {
  readonly picklistStyle = { height: 'calc(100% - 70px)' };
  tricks: PickList = {
    available: [],
    selected: []
  };

  constructor(private randomizerService: RandomizerService) { }

  ngOnInit() {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of Object.keys(settings.allowedTricks)) {
      const trickDetails = this.randomizerService.DETAILS[key];

      if (trickDetails) {
        const trick = {
          label: trickDetails.name,
          value: key,
          tooltip: trickDetails.description
        };
        this.tricks.available.push(trick);
      }
    }
  }

}

interface PickList {
  available: SelectItem[];
  selected: SelectItem[];
}

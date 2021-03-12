import { Component, OnInit } from '@angular/core';
import { FormArray, ControlContainer, FormBuilder } from '@angular/forms';

import { RandomizerService } from '../../services/randomizer.service';
import { PicklistFormComponent } from '../../components/common/picklist-form.component';
import { Difficulty } from '../../../../../common/data/settingsDetails';
import { TrickItem } from '../../../../../common/models/trickItem';

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent extends PicklistFormComponent implements OnInit {
  selectedDifficulty: string;
  protected formArray: FormArray;

  // Constants
  readonly GLOBAL_STYLE = { height: 'calc(100% - 50px)' };
  readonly DIFFICULTIES: string[] = [
    Difficulty.TRIVIAL,
    Difficulty.EASY,
    Difficulty.NORMAL,
    Difficulty.HARD,
    Difficulty.INSANE,
    Difficulty.OOB
  ];

  constructor(private controlContainer: ControlContainer, protected randomizerService: RandomizerService) {
    super(randomizerService);
    this.selectedDifficulty = this.DIFFICULTIES[0];
  }

  ngOnInit() {
    this.formArray = this.controlContainer.control.get('tricks') as FormArray;
    this.initialize();
  }

  addAllTricksForDifficulty(difficulty: string) {
    const fb = new FormBuilder();

    for (let trickItem of (this.items.available as TrickItem[])) {
      // If trick is within the difficulty threshold, select it
      if (trickItem.difficulty === difficulty) {
        this.formArray.push(fb.control(trickItem.value));
        this.items.selected.push(trickItem);
      }
    }

    // Filter any items in available that are in selected
    if (this.items.selected.length > 0) {
      this.items.available = this.items.available.filter(trickItem =>
        this.items.selected.map(item => item.value).indexOf(trickItem.value) < 0);
    }
  }

  removeAllTricksForDifficulty(difficulty: string) {
    const fb = new FormBuilder();

    for (let trickItem of (this.items.selected as TrickItem[])) {
      // If trick is within the difficulty threshold, select it
      if (trickItem.difficulty === difficulty) {
        this.formArray.removeAt(this.items.selected.findIndex(trick => trick.value === trickItem.value));
        this.items.available.push(trickItem);
      }
    }

    // Filter any items in available that are in selected
    if (this.items.selected.length > 0) {
      this.items.selected = this.items.selected.filter(trickItem =>
        this.items.available.map(item => item.value).indexOf(trickItem.value) < 0);
    }
  }

  protected initialize(): void {
    const settings = this.randomizerService.DEFAULT_SETTINGS;

    for (let key of settings.tricks.getSettingsKeys()) {
      const trickDetails = this.DETAILS[key];

      const trick: TrickItem = {
        label: trickDetails ? trickDetails.name : key,
        value: key,
        tooltip: trickDetails
        ? `Difficulty: ${trickDetails.difficulty}\n\n${trickDetails.description}`
        : null,
        difficulty: trickDetails ? trickDetails.difficulty : null
      };

      // If form contains value on init, push to selected tricks. Else, push to available tricks.
      if (this.formArray.value.includes(trick.value)) {
        this.items.selected.push(trick);
      } else {
        this.items.available.push(trick);
      }
    }

    // Sort selected and unselected items
    this.items.selected.sort((a, b) => {
      if (a.label < b.label) return -1;
      else if (a.label > b.label) return 1;
      return 0;
    });

    this.items.available.sort((a, b) => {
      if (a.label < b.label) return -1;
      else if (a.label > b.label) return 1;
      return 0;
    });
  }
}

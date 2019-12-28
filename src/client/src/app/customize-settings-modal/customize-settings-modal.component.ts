import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { RandomizerService } from '../services/randomizer.service';

@Component({
  selector: 'app-customize-settings-modal',
  templateUrl: './customize-settings-modal.component.html',
  styleUrls: ['./customize-settings-modal.component.scss']
})
export class CustomizeSettingsModalComponent implements OnInit {
  readonly picklistStyle = { height: 'calc(100% - 70px)' };
  tricks: PickList = {
    available: [],
    selected: []
  };
  private open: boolean = false;
  private form: FormGroup;

  constructor(private randomizerService: RandomizerService) {}

  ngOnInit() {
    const settings = this.randomizerService.DEFAULT_SETTINGS;
    const fb = new FormBuilder();
    this.form = fb.group({
      settings: [null]
    });

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

  getForm(): FormGroup {
    return this.form;
  }

  getOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }
}

interface PickList {
  available: SelectItem[];
  selected: SelectItem[];
}

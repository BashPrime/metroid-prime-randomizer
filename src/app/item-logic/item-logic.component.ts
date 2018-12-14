import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Utilities } from '../../../common/Utilities';

@Component({
  selector: 'app-item-logic',
  templateUrl: './item-logic.component.html',
  styleUrls: ['./item-logic.component.scss']
})
export class ItemLogicComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  vmrEtanks = Utilities.numberRange(3, 14);
  earlyMagmoorEtanks = Utilities.numberRange(7, 14);

  constructor() { }

  ngOnInit() {
  }
}

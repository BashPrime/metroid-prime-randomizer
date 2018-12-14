import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-logic',
  templateUrl: './item-logic.component.html',
  styleUrls: ['./item-logic.component.scss']
})
export class ItemLogicComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  vmrEtanks = this.numberRange(3, 14);
  earlyMagmoorEtanks = this.numberRange(7, 14);

  constructor() { }

  ngOnInit() {
  }

  private numberRange(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (x, i) => start + i);
  }

}

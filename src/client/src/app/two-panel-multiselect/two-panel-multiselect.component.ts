import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-two-panel-multiselect',
  templateUrl: './two-panel-multiselect.component.html',
  styleUrls: ['./two-panel-multiselect.component.scss']
})
export class TwoPanelMultiselectComponent implements OnInit {
  @Input('items') private items: PanelItem[];
  @Input('formControlName') private formControlName: string;
  @Input('name') private name: string;
  @Input('value') private value: string;

  constructor() { }

  ngOnInit() {
  }

  getItems(): PanelItem[] {
    return this.items;
  }

  getFormControlName(): string {
    return this.formControlName;
  }

  getName(): string {
    return this.name;
  }

  getValue(): string {
    return this.value;
  }
}

interface PanelItem {
  name: string,
  value: string,
  selected: boolean
}

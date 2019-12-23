import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';


/**
 * This is a common picklist component meant to be used for all picklists in the randomizer application.
 */
@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.scss']
})
export class PicklistComponent implements OnInit {
  @Input() source: SelectItem[];
  @Input() target: SelectItem[];
  @Input() style: object;
  @Input() sourceStyle: object;
  @Input() targetStyle: object;
  @Input() sourceHeader: string;
  @Input() targetHeader: string;

  constructor() { }

  ngOnInit() {
  }
}

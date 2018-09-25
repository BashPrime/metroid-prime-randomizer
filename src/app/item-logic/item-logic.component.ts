import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-logic',
  templateUrl: './item-logic.component.html',
  styleUrls: ['./item-logic.component.scss']
})
export class ItemLogicComponent implements OnInit {
  @Input('group') logicForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

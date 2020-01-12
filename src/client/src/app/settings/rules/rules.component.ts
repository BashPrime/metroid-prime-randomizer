import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}

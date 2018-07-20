import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  tabs = [
    'ROM Settings',
    'Main Rules',
    'Detailed Logic',
    'Other'
  ];
  selectedTab = 0;

  constructor() { }

  ngOnInit() {
  }

}

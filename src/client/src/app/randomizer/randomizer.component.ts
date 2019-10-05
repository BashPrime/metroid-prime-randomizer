import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  private tabs: Tab[] = [
    { name: 'ROM Settings', route: 'rom-settings' },
    { name: 'Rules', route: 'rules' },
    { name: 'Logic', route: 'logic' },
    { name: 'History', route: 'history' }
  ];

  constructor() { }

  ngOnInit() {
  }

  getTabs(): Tab[] {
    return this.tabs;
  }
}

interface Tab {
  name: string;
  route: string;
}

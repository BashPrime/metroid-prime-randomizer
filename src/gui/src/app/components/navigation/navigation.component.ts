import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  readonly tabIds = {
    welcome: 0,
    generateGame: 1,
    help: 2
  };
  private tabs: Tab[] = [
    { id: this.tabIds.welcome, name: 'Welcome', route: 'home' },
    { id: this.tabIds.generateGame, name: 'Generate Game', route: 'generate' },
    { id: this.tabIds.help, name: 'Help', route: 'help' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getTabs(): Tab[] {
    return this.tabs;
  }
}

/**
 * Basic tab interface for Angular application tabs
 */
export interface Tab {
  id: number;
  name: string;
  route: string;
}
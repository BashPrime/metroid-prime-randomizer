import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  readonly menuItems = [
    { name: 'Randomizer', route: '/' },
    { name: 'Seed History', route: '/seed-history' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

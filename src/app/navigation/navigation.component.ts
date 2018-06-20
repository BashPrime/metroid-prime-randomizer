import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showNav = false;
  helpItems: Array<object> = [
    { link: '/modes', text: 'Modes' },
    { link: '/logics', text: 'Logics' }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNav = false;
    });
  }

  ngOnInit() {
  }

}

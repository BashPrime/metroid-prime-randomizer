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
    { link: '/help/modes', text: 'Modes' },
    { link: '/help/logics', text: 'Logics' },
    { link: '/help/patching-instructions', text: 'Patching Instructions' }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNav = false;
    });
  }

  ngOnInit() {
  }

}

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Metroid Prime Randomizer';
  navItems: Array<object> = [
    { link: '/', icon: 'home', text: 'Home' },
    { link: '/randomizer', icon: 'shuffle', text: 'Generate Randomized Game' }
  ];
  helpItems: Array<object> = [
    { link: '/modes', text: 'Modes' },
    { link: '/logics', text: 'Logics' }
  ];
}

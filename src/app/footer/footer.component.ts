import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub } from '@fortawesome/fontawesome-free-brands';

import fontawesome from '@fortawesome/fontawesome';

import { environment } from '../../environments/environment';

fontawesome.library.add(faDiscord, faGithub);

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  version: string = environment.version;
  constructor() { }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
  }

}

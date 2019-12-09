import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  readonly faqLink = 'https://randomizer.metroidprime.run/randomizer/prime/article/faq';

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  openExternalUrl(url: string) {
    this.electronService.shell.openExternal(url);
  }

}

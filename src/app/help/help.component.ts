import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { FileService } from '../services/file.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  articles: object[] = [
    { name: 'Modes', value: '/help/modes' },
    { name: 'Logics', value: '/help/logics' },
    { name: 'Patching Instructions', value: '/help/patching-instructions' }
  ];
  article: string;
  content: any;

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const filePath = '/assets/help-articles'
      this.article = params['article'] + '.html';

      this.fileService.getLocalFileAsString(filePath + '/' + this.article)
      .subscribe(data => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(data);
      });
    });
  }

}

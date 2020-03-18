import { Component, OnInit, HostListener } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

import { ElectronService } from '../services/electron.service';

interface MenuItem {
  name: string;
  file: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  readonly menuItems = [
    { name: 'FAQ', file: 'faq.md' }
  ];
  private selectedIndex: number;

  constructor(private markdownService: MarkdownService, private electronService: ElectronService) { }

  ngOnInit() {
    this.setSelectedIndex(0);

    this.markdownService.renderer.link = (href: string, title: string, text: string) => {
      return `<a class="has-text-link" href="${href}">${text}</a>`;
    };
  }

  getSelectedItem(): MenuItem {
    return this.menuItems[this.selectedIndex];
  }

  getSelectedIndex(): number {
    return this.selectedIndex;
  }

  setSelectedIndex(index: number): void {
    this.selectedIndex = index;
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    const element = event.target;

    if (element.tagName === 'A' && element.href) {
      event.preventDefault();
      this.electronService.shell.openExternal(element.href);
    }
  }

  interceptHref(_event) {
    const tEvent = _event || window.event;
    const element = tEvent.target || tEvent.srcElement;


    if (element.tagName === 'A' && element.href) {
      tEvent.preventDefault;
      this.electronService.shell.openExternal(element.href);
    }
  }
}

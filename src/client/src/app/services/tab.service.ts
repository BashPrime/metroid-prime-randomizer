import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  selectedTabId$ = new Subject<number>();

  constructor() { }

  selectTab(tabId: number) {
    this.selectedTabId$.next(tabId);
  }
}

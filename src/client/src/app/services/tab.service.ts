import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private selectedTabId$ = new Subject<number>();
  _selectedTabId = this.selectedTabId$.asObservable();

  constructor() { }

  selectTab(tabId: number) {
    this.selectedTabId$.next(tabId);
  }
}

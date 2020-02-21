import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProgressBar } from '../../../../common/models/progressBar';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressBars$ = new BehaviorSubject<ProgressBar[]>(undefined);
  private open$ = new BehaviorSubject<boolean>(false);
  private title$ = new BehaviorSubject<string>(undefined);
  _progressBars = this.progressBars$.asObservable();
  _open = this.open$.asObservable();
  _title = this.title$.asObservable();

  constructor() { }

  setProgressBars(progressBars: ProgressBar[]): void {
    this.progressBars$.next(progressBars);
  }

  setOpen(open: boolean): void {
    this.open$.next(open);
  }

  setTitle(title: string): void {
    this.title$.next(title);
  }
}

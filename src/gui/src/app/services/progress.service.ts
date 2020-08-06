import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProgressBar } from '../../../../common/models/progressBar';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  progressBars$ = new BehaviorSubject<ProgressBar[]>(undefined);
  open$ = new BehaviorSubject<boolean>(false);
  title$ = new BehaviorSubject<string>(undefined);
  message$ = new BehaviorSubject<string>(undefined);
  _progressBars = this.progressBars$.asObservable();
  _open = this.open$.asObservable();
  _title = this.title$.asObservable();
  _message = this.message$.asObservable();

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

  setMessage(message: string): void {
    this.message$.next(message);
  }
}

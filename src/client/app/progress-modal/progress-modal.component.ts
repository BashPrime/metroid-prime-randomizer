import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalComponent } from '../components/common/modal.component';
import { ProgressBar } from '../../../../common/models/progressBar';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss']
})
export class ProgressModalComponent extends ModalComponent implements OnInit {
  OBJECT_KEYS = Object.keys;
  private progressBars: ProgressBar[];
  private title: string;
  private message: string;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private progressService: ProgressService) {
    super();
  }

  ngOnInit() {
    this.progressService._progressBars
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(progressBars => this.setProgressBars(progressBars));

    this.progressService._open
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(open => this.setOpen(open));

    this.progressService._title
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(title => this.setTitle(title));

      this.progressService._message
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(message => this.setMessage(message));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getProgressBars(): ProgressBar[] {
    return this.progressBars;
  }

  setProgressBars(progressBars: ProgressBar[]): void {
    this.progressBars = progressBars;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string): void {
    this.message = message;
  }
}

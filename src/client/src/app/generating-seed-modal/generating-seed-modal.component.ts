import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalComponent } from '../components/common/modal.component';
import { GeneratorService } from '../services/generator.service';

@Component({
  selector: 'app-generating-seed-modal',
  templateUrl: './generating-seed-modal.component.html',
  styleUrls: ['./generating-seed-modal.component.scss']
})
export class GeneratingSeedModalComponent extends ModalComponent implements OnInit {
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private generatorService: GeneratorService) {
    super();
  }

  ngOnInit() {
    this.generatorService._seedIsCurrentlyGenerating
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isGenerating => {
        this.setOpen(isGenerating);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

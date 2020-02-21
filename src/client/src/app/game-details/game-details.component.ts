import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

import { GeneratorService } from '../services/generator.service';
import { GeneratedSeed } from '../../../../common/models/generatedSeed';
import * as Utilities from '../utilities';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  private seeds: GeneratedSeed[];
  private form: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  // Constants
  readonly LIST_STYLE = { height: '100%' };


  constructor(
    private electronService: ElectronService,
    private generatorService: GeneratorService,
    private clipboardService: ClipboardService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.initForm();

    // Get generated seed from service
    this.generatorService._generatedSeeds
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(seeds => {
        this.seeds = seeds;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initForm(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      baseIso: ['', [Validators.required]],
      outputFolder: ['', Validators.required],
      trilogyIso: [''],
      outputType: ['iso']
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getSeeds(): GeneratedSeed[] {
    return this.seeds;
  }

  getPermalink(seed: GeneratedSeed): string {
    return Utilities.generatePermalink(seed.seed, seed.settingsString);
  }

  hasMultipleSeeds(): boolean {
    return this.seeds && this.seeds.length > 1;
  }

  copyPermalink(permalink: string): void {
    this.clipboardService.copy(permalink);
    this.toastrService.info('Permalink copied.');
  }

  selectBaseIso(): void {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'GC ISO Files', extensions: ['iso', 'gcm'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.baseIso.setValue(result.filePaths[0]);
      }
    });
  }

  selectTrilogyIso(): void {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'Wii ISO Files', extensions: ['iso', 'wbfs'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.trilogyIso.setValue(result.filePaths[0]);
      }
    });
  }

  selectOutputFolder(): void {
    this.electronService.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled) {
        this.form.controls.outputFolder.setValue(result.filePaths[0]);
      }
    });
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalComponent } from '../components/common/modal.component';

@Component({
  selector: 'app-remove-preset-modal',
  templateUrl: './remove-preset-modal.component.html',
  styleUrls: ['./remove-preset-modal.component.scss']
})
export class RemovePresetModalComponent extends ModalComponent implements OnInit {
  @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
  private preset: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getPreset(): string {
    return this.preset;
  }

  setPresetAndOpen(preset: string): void {
    this.preset = preset;
    this.setOpen(true);
  }

  onRemovePreset(): void {
    this.onRemove.emit(this.preset);
    this.setOpen(false);
  }
}

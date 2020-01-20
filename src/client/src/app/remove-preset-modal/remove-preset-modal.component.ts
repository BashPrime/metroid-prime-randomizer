import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PresetModalComponent } from '../components/common/preset-modal.component';

@Component({
  selector: 'app-remove-preset-modal',
  templateUrl: './remove-preset-modal.component.html',
  styleUrls: ['./remove-preset-modal.component.scss']
})
export class RemovePresetModalComponent extends PresetModalComponent implements OnInit {
  @Output() onRemovePreset: EventEmitter<string> = new EventEmitter<string>();
  preset: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onRemove() {
    this.onRemovePreset.emit(this.preset);
    this.setOpen(false);
  }
}

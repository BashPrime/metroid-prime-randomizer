import { ModalComponent } from './modal.component';

export class PresetModalComponent extends ModalComponent {
  preset: string;

  constructor() {
    super();
  }

  setPresetAndOpen(preset: string) {
    this.preset = preset;
    this.setOpen(true);
  }
}

export class ModalComponent {
  private open: boolean = false;

  constructor() { }

  getOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }
}

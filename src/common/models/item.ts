export class Item {
  private name: string;
  private patcherId: number; // internal number used by randomprime patcher

  constructor(name: string, patcherId: number) {
    this.name = name;
    this.patcherId = patcherId;
  }

  getName(): string {
    return this.name;
  }

  getPatcherId(): number {
    return this.patcherId;
  }
}

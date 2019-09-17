export class Item {
  private name: string;
  private type: string;
  private priority: number;
  private patcherId: number; // internal number used by randomprime patcher

  constructor(name: string, type: string, patcherId: number) {
    this.name = name;
    this.patcherId = patcherId;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }

  getPatcherId(): number {
    return this.patcherId;
  }

  getType(): string {
    return this.type;
  }

  getPriority(): number {
    return this.priority;
  }

  setPriority(priority: number) {
    this.priority = priority;
  }

  copy(): Item {
    return new Item(this.name, this.type, this.patcherId);
  }
}

/**
 * Generic representation of an item in the Metroid Prime series.
 */
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

  /**
   * Returns the item's name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the item ID used externally, such as through a game patcher.
   */
  getPatcherId(): number {
    return this.patcherId;
  }

  /**
   * Returns the item's type.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Returns the item's priority (when being placed in the world)
   */
  getPriority(): number {
    return this.priority;
  }

  /**
   * Sets the priority number for the item.
   * @param priority The priority being assigned.
   */
  setPriority(priority: number) {
    this.priority = priority;
  }

  /**
   * Returns a deep-copied (separate) instance of this item.
   */
  copy(): Item {
    return new Item(this.name, this.type, this.patcherId);
  }
}

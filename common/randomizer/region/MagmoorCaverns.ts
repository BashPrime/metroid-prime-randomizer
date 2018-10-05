import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItem} from '../enums/PrimeItem';

export class MagmoorCaverns extends Region {
  constructor() {
    super();
    this.name = 'Magmoor Caverns';
    this.locations = new Map<string, Location>([
      ['Lava Lake', new Location('Lava Lake', 'a4719c6a.mrea', 0x0004287c, true)],
      ['Triclops Pit', new Location('Triclops Pit', 'bad9edbf.mrea', 0x0006010c)],
      ['Storage Cavern', new Location('Storage Cavern', 'adef843e.mrea', 0x0008000f)],
      ['Transport Tunnel A', new Location('Transport Tunnel A', '47f2c087.mrea', 0x000a0006, true)],
      ['Warrior Shrine', new Location('Warrior Shrine', '89a6cb8d.mrea', 0x000b0037, true)],
      ['Shore Tunnel', new Location('Shore Tunnel', '901040df.mrea', 0x000c0028, true)],
      ['Fiery Shores (Morph Track)', new Location('Fiery Shores (Morph Track)', 'f5ef1862.mrea', 0x000e01da)],
      ['Fiery Shores (Warrior Shrine Tunnel)', new Location('Fiery Shores (Warrior Shrine Tunnel)', 'f5ef1862.mrea', 0x000e023f)],
      ['Plasma Processing', new Location('Plasma Processing', '4cc18e5a.mrea', 0x0015001f, true)],
      ['Magmoor Workstation', new Location('Magmoor Workstation', '8abeb3c3.mrea', 0x0017028e, true)],
    ]);
  }

  public setVanillaArtifacts() {
    this.locations.get('Lava Lake').setItem(Item.get(PrimeItem.ARTIFACT_OF_NATURE));
    this.locations.get('Warrior Shrine').setItem(Item.get(PrimeItem.ARTIFACT_OF_STRENGTH));
  }

  public init(config: any): void {
    this.locations.get('Lava Lake').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayBombsOrPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Triclops Pit').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && items.has(PrimeItem.XRAY_VISOR);
    };

    this.locations.get('Storage Cavern').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get('Transport Tunnel A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayBombs();
    };

    this.locations.get('Shore Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Fiery Shores (Morph Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Fiery Shores (Warrior Shrine Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayPowerBombs() && items.has(PrimeItem.BOOST_BALL)
        && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };
    this.locations.get('Fiery Shores (Warrior Shrine Tunnel)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    this.locations.get('Warrior Shrine').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Plasma Processing').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPIDER_BALL)
        && items.has(PrimeItem.GRAPPLE_BEAM);
    };
    this.locations.get('Plasma Processing').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Magmoor Workstation').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.hasAnySuit() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
        && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPIDER_BALL);
    };
  }
}

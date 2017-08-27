import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItemName} from '../ItemType';

export class TallonOverworld extends Region {
  constructor() {
    super();
    this.name = 'Tallon Overworld';
    this.locations = new Map<string, Location>([
      ['Landing Site', new Location('Landing Site', 'b2701146.mrea', 0x0000007e)],
      ['Alcove', new Location('Alcove', 'c44e7a07.mrea', 0x00040007, true)],
      ['Frigate Crash Site', new Location('Frigate Crash Site', 'b9abcd56.mrea', 0x000801fb)],
      ['Overgrown Cavern', new Location('Overgrown Cavern', 'cea263e3.mrea', 0x000d00c6)],
      ['Root Cave', new Location('Root Cave', 'bd8c8625.mrea', 0x000f0032)],
      ['Artifact Temple', new Location('Artifact Temple', '2398e906.mrea', 0x41001d4, true)],
      ['Transport Tunnel B', new Location('Transport Tunnel B', 'c7e821ba.mrea', 0x00130136)],
      ['Arbor Chamber', new Location('Arbor Chamber', '24f8aff3.mrea', 0x00140015)],
      ['Cargo Freight Lift to Deck Gamma', new Location('Cargo Freight Lift to Deck Gamma', '37b3afe6.mrea', 0x001b0015, true)],
      ['Biohazard Containment', new Location('Biohazard Containment', 'ac2c58fe.mrea', 0x001e02ec)],
      ['Hydro Access Tunnel', new Location('Hydro Access Tunnel', 'ffb4a966.mrea', 0x00230053, true)],
      ['Great Tree Chamber', new Location('Great Tree Chamber', 'c5d6a597.mrea', 0x0025000d)],
      ['Life Grove Tunnel', new Location('Life Grove Tunnel', 'b4fbbef5.mrea', 0x00270036)],
      ['Life Grove (Start)', new Location('Life Grove (Start)', '86eb2e02.mrea', 0x002a0021, true)],
      ['Life Grove (Underwater Spinner)', new Location('Life Grove (Underwater Spinner)', '86eb2e02.mrea', 0x002a0234, true)],
    ]);
  }

  public initNoGlitches(): void {
    this.locations.get('Landing Site').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Alcove').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.canLayBombs() && items.has(PrimeItemName.BOOST_BALL)) || items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Artifact Temple').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Root Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.XRAY_VISOR);
    };

    this.locations.get('Arbor Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.PLASMA_BEAM);
    };

    this.locations.get('Transport Tunnel B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Frigate Crash Site').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has('morph') && items.has(PrimeItemName.GRAVITY_SUIT) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Overgrown Cavern').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Cargo Freight Lift to Deck Gamma').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.GRAVITY_SUIT)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.THERMAL_VISOR);
    };

    this.locations.get('Biohazard Containment').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.GRAVITY_SUIT)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.THERMAL_VISOR);
    };

    this.locations.get('Hydro Access Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.GRAVITY_SUIT) && items.has(PrimeItemName.SPACE_JUMP_BOOTS)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.THERMAL_VISOR);
    };

    this.locations.get('Great Tree Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
        && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.XRAY_VISOR);
    };

    this.locations.get('Life Grove Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL)
        && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM);
    };

    this.locations.get('Life Grove (Start)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL)
        && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM);
    };

    this.locations.get('Life Grove (Underwater Spinner)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL)
        && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.ICE_BEAM);
    };
  }
}

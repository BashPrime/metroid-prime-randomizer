import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItemName} from '../ItemType';

export class PhazonMines extends Region {
  constructor() {
    super();
    this.locations = new Map<string, Location>([
      ['Main Quarry', new Location('Main Quarry', '643d038f.mrea', 0x00020233)],
      ['Security Access A', new Location('Security Access A', 'c44e7a07.mrea', 0x00050187)],
      ['Storage Depot A', new Location('Storage Depot A', '35c5d736.mrea', 0x000C0026, true)],
      ['Elite Research (Phazon Elite)', new Location('Elite Research (Phazon Elite)', '8a97bb54.mrea', 0x00050187, true)],
      ['Elite Research (Laser)', new Location('Elite Research (Laser)', '8a97bb54.mrea', 0x000D0340)],
      ['Storage Depot B', new Location('Storage Depot B', 'e39c342b.mrea', 0x00090003, true)],
      ['Fungal Hall Access', new Location('Fungal Hall Access', 'de9d71f5.mrea', 0x00280102)],
      ['Phazon Mining Tunnel', new Location('Phazon Mining Tunnel', 'bbfa4ab3.mrea', 0x0027007F, true)],
      ['Fungal Hall B', new Location('Fungal Hall B', 'ec47c242.mrea', 0x00240127)],
      ['Metroid Quarantine A', new Location('Metroid Quarantine A', 'fb051f5a.mrea', 0x002005EA)],
      ['Metroid Quarantine B', new Location('Metroid Quarantine B', 'bb3afc4e.mrea', 0x001F0205)],
      ['Elite Quarters', new Location('Elite Quarters', '3953c353.mrea', 0x001A04B8, true)],
      ['Processing Center Access', new Location('Processing Center Access', 'ed6de73b.mrea', 0x001600A7, true)],
      ['Phazon Processing Center', new Location('Phazon Processing Center', 'ad2e7eb9.mrea', 0x00130766)],
      ['Elite Control Access', new Location('Elite Control Access', '8988d1cb.mrea', 0x000F008D)],
      ['Ventilation Shaft', new Location('Ventilation Shaft', '90709aac.mrea', 0x0012010C, true)],
      ['Central Dynamo', new Location('Central Dynamo', 'fea372e2.mrea', 0x001B04B1, true)],
    ]);
  }

  public initNoGlitches(): void {
    this.locations.get('Main Quarry').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.has(PrimeItemName.SPIDER_BALL)) || (items.hasMinesFromMagmoorReqs() && items.has(PrimeItemName.THERMAL_VISOR));
    };

    this.locations.get('Security Access A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL)) || (items.hasMinesFromMagmoorReqs() && items.canLayBombs());
    };

    this.locations.get('Storage Depot A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.has(PrimeItemName.PLASMA_BEAM))
        || (items.hasMinesFromMagmoorReqs() && items.has(PrimeItemName.GRAPPLE_BEAM) && items.canLayBombs() && items.has(PrimeItemName.PLASMA_BEAM));
    };

    this.locations.get('Elite Research (Phazon Elite)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL))
        || (items.hasMinesFromMagmoorReqs() && items.canLayBombs() && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.BOOST_BALL));
    };

    this.locations.get('Elite Research (Laser)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.has(PrimeItemName.BOOST_BALL))
        || (items.hasMinesFromMagmoorReqs() && items.canLayBombs() && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.BOOST_BALL));
    };

    this.locations.get('Storage Depot B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL))
        || (items.hasMinesFromMagmoorReqs() && items.canLayBombs() && items.has(PrimeItemName.GRAPPLE_BEAM));
    };

    this.locations.get('Fungal Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.PLASMA_BEAM))
        || (items.hasMinesFromMagmoorReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.PLASMA_BEAM));
    };

    this.locations.get('Phazon Mining Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.PLASMA_BEAM)
        && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.PHAZON_SUIT))
        || (items.hasMinesFromMagmoorReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.PLASMA_BEAM)
          && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.PHAZON_SUIT));
    };

    this.locations.get('Fungal Hall B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() || items.hasMinesFromMagmoorReqs()) && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR)
        && items.has(PrimeItemName.PLASMA_BEAM);
    };

    this.locations.get('Metroid Quarantine A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return ((items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs())
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR);
    };

    this.locations.get('Metroid Quarantine B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return ((items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs())
        && items.canFireSuperMissiles() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.GRAPPLE_BEAM) && items.has(PrimeItemName.PLASMA_BEAM);
    };

    this.locations.get('Elite Quarters').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return ((items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs())
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.PLASMA_BEAM) && items.has(PrimeItemName.XRAY_VISOR);
    };

    this.locations.get('Processing Center Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return ((items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs())
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.PLASMA_BEAM) && items.has(PrimeItemName.XRAY_VISOR) && items.has(PrimeItemName.GRAPPLE_BEAM);
    };

    this.locations.get('Phazon Processing Center').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs();
    };

    this.locations.get('Elite Control Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqs() || items.hasMinesFromMagmoorReqs();
    };

    this.locations.get('Ventilation Shaft').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return ((items.hasMinesFromTallonReqs() && items.canLayPowerBombs()) || items.hasMinesFromMagmoorReqs())
        && items.has(PrimeItemName.BOOST_BALL);
    };

    this.locations.get('Central Dynamo').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqs() || items.hasMinesFromMagmoorReqs()) && items.has(PrimeItemName.BOOST_BALL);
    };
  }
}

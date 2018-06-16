import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItem} from '../enums/PrimeItem';

export class PhazonMines extends Region {
  constructor() {
    super();
    this.name = 'Phazon Mines';
    this.locations = new Map<string, Location>([
      ['Main Quarry', new Location('Main Quarry', '643d038f.mrea', 0x00020233)],
      ['Security Access A', new Location('Security Access A', 'c44e7a07.mrea', 0x00050187)],
      ['Storage Depot B', new Location('Storage Depot B', 'e39c342b.mrea', 0x00090003, true)],
      ['Storage Depot A', new Location('Storage Depot A', '35c5d736.mrea', 0x000C0026, true)],
      ['Elite Research (Phazon Elite)', new Location('Elite Research (Phazon Elite)', '8a97bb54.mrea', 0x00050187, true)],
      ['Elite Research (Laser)', new Location('Elite Research (Laser)', '8a97bb54.mrea', 0x000D0340)],
      ['Elite Control Access', new Location('Elite Control Access', '8988d1cb.mrea', 0x000F008D)],
      ['Ventilation Shaft', new Location('Ventilation Shaft', '90709aac.mrea', 0x0012010C, true)],
      ['Phazon Processing Center', new Location('Phazon Processing Center', 'ad2e7eb9.mrea', 0x00130766)],
      ['Processing Center Access', new Location('Processing Center Access', 'ed6de73b.mrea', 0x001600A7, true)],
      ['Elite Quarters', new Location('Elite Quarters', '3953c353.mrea', 0x001A04B8, true)],
      ['Central Dynamo', new Location('Central Dynamo', 'fea372e2.mrea', 0x001B04B1, true)],
      ['Metroid Quarantine B', new Location('Metroid Quarantine B', 'bb3afc4e.mrea', 0x001F0205)],
      ['Metroid Quarantine A', new Location('Metroid Quarantine A', 'fb051f5a.mrea', 0x002005EA)],
      ['Fungal Hall B', new Location('Fungal Hall B', 'ec47c242.mrea', 0x00240127)],
      ['Phazon Mining Tunnel', new Location('Phazon Mining Tunnel', 'bbfa4ab3.mrea', 0x0027007F, true)],
      ['Fungal Hall Access', new Location('Fungal Hall Access', 'de9d71f5.mrea', 0x00280102)]
    ]);
  }

  public setVanillaArtifacts() {
    this.locations.get('Elite Research (Phazon Elite)').setItem(Item.get(PrimeItem.ARTIFACT_OF_WARRIOR));
    this.locations.get('Phazon Mining Tunnel').setItem(Item.get(PrimeItem.ARTIFACT_OF_NEWBORN));
  }

  public initCasual(): void {
    this.locations.get('Main Quarry').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsCasual() && items.has(PrimeItem.SPIDER_BALL))
      || (items.hasMinesFromMagmoorReqsNoGlitches() && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM));
    };

    this.locations.get('Security Access A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs())
      || (items.hasMinesFromMagmoorReqsNoGlitches() && items.has(PrimeItem.GRAPPLE_BEAM));
    };

    this.locations.get('Storage Depot A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM)
        && (
          (items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs())
          || (items.hasMinesFromMagmoorReqsNoGlitches() && items.has(PrimeItem.GRAPPLE_BEAM))
        );
    };

    this.locations.get('Elite Research (Phazon Elite)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL))
        || (items.hasMinesFromMagmoorReqsNoGlitches() && items.has(PrimeItem.GRAPPLE_BEAM)));
    };

    this.locations.get('Elite Research (Laser)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && (items.hasMinesFromTallonReqsCasual() || (items.hasMinesFromMagmoorReqsNoGlitches() && items.has(PrimeItem.GRAPPLE_BEAM)));
    };

    this.locations.get('Storage Depot B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPIDER_BALL))
        || items.hasMinesFromMagmoorReqsNoGlitches();
    };

    this.locations.get('Fungal Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Phazon Mining Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
        && items.has(PrimeItem.PHAZON_SUIT)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || (items.hasMinesFromMagmoorReqsNoGlitches()));
    };

    this.locations.get('Fungal Hall B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Metroid Quarantine A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.XRAY_VISOR)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Metroid Quarantine B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM)
        && items.has(PrimeItem.PLASMA_BEAM)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Elite Quarters').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Processing Center Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Phazon Processing Center').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches();
    };

    this.locations.get('Elite Control Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsCasual() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches();
    };

    this.locations.get('Ventilation Shaft').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && ((items.hasMinesFromTallonReqsCasual() && items.canLayPowerBombs() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };

    this.locations.get('Central Dynamo').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL) && ((items.hasMinesFromTallonReqsCasual() && items.has(PrimeItem.SPIDER_BALL)) || items.hasMinesFromMagmoorReqsNoGlitches());
    };
  }

  public initNormal(): void {
    this.locations.get('Main Quarry').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsNormal() || items.hasMinesFromMagmoorReqsNormal();
    };

    this.locations.get('Security Access A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal();
    };

    this.locations.get('Storage Depot A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM)
        && (
          (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
          || items.hasMinesFromMagmoorReqsNormal()
        );
    };

    this.locations.get('Elite Research (Phazon Elite)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
          || (items.hasMinesFromMagmoorReqsNormal());
    };

    this.locations.get('Elite Research (Laser)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && (items.hasMinesFromTallonReqsNormal() || items.hasMinesFromMagmoorReqsNormal());
    };

    this.locations.get('Storage Depot B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsNormal() || items.hasMinesFromMagmoorReqsNormal();
    };

    this.locations.get('Fungal Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.BOOST_BALL)
        && (
          (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
          || items.hasMinesFromMagmoorReqsNormal()
        );
    };

    this.locations.get('Phazon Mining Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.PHAZON_SUIT) && items.has(PrimeItem.BOOST_BALL)
        && (
          (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
          || items.hasMinesFromMagmoorReqsNormal()
        );
    };

    this.locations.get('Fungal Hall B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.BOOST_BALL)
      && (
        (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Metroid Quarantine A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
      && (
        (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Metroid Quarantine B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.canFireSuperMissiles() && items.has(PrimeItem.BOOST_BALL)
      && (
        (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Elite Quarters').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.BOOST_BALL)
      && (
        (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Processing Center Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.BOOST_BALL)
      && (
        (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Phazon Processing Center').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMinesFromTallonReqsNormal() && items.canLayPowerBombs())
        || items.hasMinesFromMagmoorReqsNormal();
    };

    this.locations.get('Elite Control Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsNormal() || items.hasMinesFromTallonReqsNormal();
    };

    this.locations.get('Ventilation Shaft').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
      && (
        items.hasMinesFromTallonReqsNormal() || items.hasMinesFromMagmoorReqsNormal()
      );
    };

    this.locations.get('Central Dynamo').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.BOOST_BALL)
        && (
          items.hasMinesFromTallonReqsNormal() || items.hasMinesFromMagmoorReqsNormal()
        );
    };
  }

  public initHard(): void {
    const minVMRTanks = 5;

    this.locations.get('Main Quarry').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard()
      && (items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS));
    };

    this.locations.get('Security Access A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs();
    };

    this.locations.get('Storage Depot A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Elite Research (Phazon Elite)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs();
    };

    this.locations.get('Elite Research (Laser)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard();
    };

    this.locations.get('Storage Depot B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard();
    };

    this.locations.get('Fungal Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
      && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Phazon Mining Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs()
      && items.has(PrimeItem.PHAZON_SUIT) && items.has(PrimeItem.PLASMA_BEAM)
      && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Fungal Hall B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
      && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Metroid Quarantine A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs();
    };

    this.locations.get('Metroid Quarantine B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canFireSuperMissiles()
      && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
      && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Elite Quarters').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs()
      && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM)
      && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Processing Center Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs()
      && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM)
      && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Phazon Processing Center').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs();
    };

    this.locations.get('Elite Control Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard();
    };

    this.locations.get('Ventilation Shaft').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard() && items.canLayPowerBombs();
    };

    this.locations.get('Central Dynamo').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesFromTallonReqsHard();
    };
  }

  public initInsane(): void {
    // stub for now
    this.initHard();
  }
}

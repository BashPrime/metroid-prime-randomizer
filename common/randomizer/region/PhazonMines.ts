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

  public init(settings: any): void {
    this.locations.get('Main Quarry').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
      && (!settings.requireVisors || items.has(PrimeItem.THERMAL_VISOR))
      && ((settings.ghettoJumping && settings.lJumping) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Security Access A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs();
    };

    this.locations.get('Storage Depot A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM);
    };

    // Note that with the upper mines requirements, you are able to reach Elite Research without needing boost ball
    this.locations.get('Elite Research (Phazon Elite)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs();
    };
   
    this.locations.get('Elite Research (Laser)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
      && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR)) // visor requirement
      && (settings.spinnersNoBoost || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL))); // spinner manip without boost
    };

    this.locations.get('Storage Depot B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesReqsMagmoorSouth(settings)
      || (items.hasMinesReqsTallonSouth(settings) && items.canClimbOreProcessing(settings));
    };

    // Overriding lower mines access checks because grapple isn't needed for this room
    this.locations.get('Fungal Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayBombs() && items.canLayPowerBombs()
      && items.has(PrimeItem.PLASMA_BEAM)
      && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings)
      && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR)) // Metroid Quarantine A platforms
      && ((settings.ghettoJumping && settings.standableTerrain && settings.dashing) || items.has(PrimeItem.SPIDER_BALL)) // Exiting MQA
    };

    this.locations.get('Phazon Mining Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings)
      && ((settings.phazonMiningTunnelNoPhazonSuit && items.hasEnergyTankCount(11) && items.has(PrimeItem.BOOST_BALL)) || items.has(PrimeItem.PHAZON_SUIT));
    };

    this.locations.get('Fungal Hall B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings)
      && (!settings.requireVisors || (items.has(PrimeItem.THERMAL_VISOR) || items.has(PrimeItem.XRAY_VISOR)));
    };

    this.locations.get('Metroid Quarantine A').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs()
      && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings)
      && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR))
      && ((settings.ghettoJumping && settings.standableTerrain && settings.dashing) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get('Metroid Quarantine B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && (!settings.noSupers && items.canFireSuperMissiles());
    };

    this.locations.get('Elite Quarters').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && items.has(PrimeItem.XRAY_VISOR);
    };

    this.locations.get('Processing Center Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && items.has(PrimeItem.XRAY_VISOR);
    };

    this.locations.get('Phazon Processing Center').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get('Elite Control Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get('Ventilation Shaft').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs()
      && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get('Central Dynamo').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
      && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };
  }
}

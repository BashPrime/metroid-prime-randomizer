import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItem } from '../enums/PrimeItem';
import { PrimeLocation } from '../enums/PrimeLocation';

export class PhazonMines extends Region {
  constructor() {
    super();
    this.name = 'Phazon Mines';
    this.locations = new Map<string, Location>([
      [PrimeLocation.MAIN_QUARRY, new Location(PrimeLocation.MAIN_QUARRY, '643d038f.mrea', 0x00020233)],
      [PrimeLocation.SECURITY_ACCESS_A, new Location(PrimeLocation.SECURITY_ACCESS_A, 'c44e7a07.mrea', 0x00050187)],
      [PrimeLocation.STORAGE_DEPOT_B, new Location(PrimeLocation.STORAGE_DEPOT_B, 'e39c342b.mrea', 0x00090003, true)],
      [PrimeLocation.STORAGE_DEPOT_A, new Location(PrimeLocation.STORAGE_DEPOT_A, '35c5d736.mrea', 0x000C0026, true)],
      [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE, new Location(PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE, '8a97bb54.mrea', 0x00050187, true)],
      [PrimeLocation.ELITE_RESEARCH_LASER, new Location(PrimeLocation.ELITE_RESEARCH_LASER, '8a97bb54.mrea', 0x000D0340)],
      [PrimeLocation.ELITE_CONTROL_ACCESS, new Location(PrimeLocation.ELITE_CONTROL_ACCESS, '8988d1cb.mrea', 0x000F008D)],
      [PrimeLocation.VENTILATION_SHAFT, new Location(PrimeLocation.VENTILATION_SHAFT, '90709aac.mrea', 0x0012010C, true)],
      [PrimeLocation.PHAZON_PROCESSING_CENTER, new Location(PrimeLocation.PHAZON_PROCESSING_CENTER, 'ad2e7eb9.mrea', 0x00130766)],
      [PrimeLocation.PROCESSING_CENTER_ACCESS, new Location(PrimeLocation.PROCESSING_CENTER_ACCESS, 'ed6de73b.mrea', 0x001600A7, true)],
      [PrimeLocation.ELITE_QUARTERS, new Location(PrimeLocation.ELITE_QUARTERS, '3953c353.mrea', 0x001A04B8, true)],
      [PrimeLocation.CENTRAL_DYNAMO, new Location(PrimeLocation.CENTRAL_DYNAMO, 'fea372e2.mrea', 0x001B04B1, true)],
      [PrimeLocation.METROID_QUARANTINE_B, new Location(PrimeLocation.METROID_QUARANTINE_B, 'bb3afc4e.mrea', 0x001F0205)],
      [PrimeLocation.METROID_QUARANTINE_A, new Location(PrimeLocation.METROID_QUARANTINE_A, 'fb051f5a.mrea', 0x002005EA)],
      [PrimeLocation.FUNGAL_HALL_B, new Location(PrimeLocation.FUNGAL_HALL_B, 'ec47c242.mrea', 0x00240127)],
      [PrimeLocation.PHAZON_MINING_TUNNEL, new Location(PrimeLocation.PHAZON_MINING_TUNNEL, 'bbfa4ab3.mrea', 0x0027007F, true)],
      [PrimeLocation.FUNGAL_HALL_ACCESS, new Location(PrimeLocation.FUNGAL_HALL_ACCESS, 'de9d71f5.mrea', 0x00280102)]
    ]);
  }

  public init(settings: any): void {
    this.locations.get(PrimeLocation.MAIN_QUARRY).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
        && (items.hasMinesReqsMagmoorSouth(settings) ? items.canLayBombs() : true) // require bombs if coming from Magmoor
        && (!settings.requireVisors || items.has(PrimeItem.THERMAL_VISOR))
        && ((settings.standableTerrain && settings.ghettoJumping && settings.lJumping) || items.has(PrimeItem.SPIDER_BALL)); // ghetto and l jump to the crane
    };

    this.locations.get(PrimeLocation.SECURITY_ACCESS_A).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs() && (
        (settings.standableTerrain && settings.ghettoJumping) ? ((settings.infiniteBoostEliteResearch && items.has(PrimeItem.BOOST_BALL)) || items.canLayBombs()) : true
      );
    };

    this.locations.get(PrimeLocation.STORAGE_DEPOT_A).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM) && (
        (settings.standableTerrain && settings.ghettoJumping) ? ((settings.infiniteBoostEliteResearch && items.has(PrimeItem.BOOST_BALL)) || items.canLayBombs()) : true
      );
    };

    // Note that with the upper mines requirements, you are able to reach Elite Research without needing boost ball,
    // at least on glitchless difficulties. You will need it if bombs are placed here, in Mine Security Station,
    // or Security Access A.
    this.locations.get(PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs() && (
        (settings.standableTerrain && settings.ghettoJumping) ? ((settings.infiniteBoostEliteResearch && items.has(PrimeItem.BOOST_BALL)) || items.canLayBombs()) : true
      );
    };

    this.locations.get(PrimeLocation.ELITE_RESEARCH_LASER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
        && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR)) // visor requirement
        && (
          (settings.standableTerrain && settings.ghettoJumping) ? ((settings.infiniteBoostEliteResearch && items.has(PrimeItem.BOOST_BALL)) || items.canLayBombs()) : true
        ) // allow bombs here with given glitches if you have boost ball
        && (settings.spinnersNoBoost || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL))); // spinner manip without boost
    };

    this.locations.get(PrimeLocation.STORAGE_DEPOT_B).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMinesReqsMagmoorSouth(settings)
        || (items.hasMinesReqsTallonSouth(settings) && items.canClimbOreProcessing(settings));
    };

    // Overriding lower mines access checks because grapple isn't needed for this room
    this.locations.get(PrimeLocation.FUNGAL_HALL_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayBombs() && items.canLayPowerBombs()
        && items.has(PrimeItem.PLASMA_BEAM)
        && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings)
        && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR)) // Metroid Quarantine A platforms
        && ((settings.ghettoJumping && settings.standableTerrain && settings.dashing) || items.has(PrimeItem.SPIDER_BALL)) // Exiting MQA
    };

    this.locations.get(PrimeLocation.PHAZON_MINING_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings)
        && (settings.phazonMiningTunnelNoPhazonSuit && ( // non phazon suit requirements
          (items.hasEnergyTankCount(11) && items.has(PrimeItem.BOOST_BALL)) // Early Newborn inbounds
          || (settings.earlyNewborn && items.canWallcrawl(settings)) // Early Newborn wallcrawl
        )
          || items.has(PrimeItem.PHAZON_SUIT)); // or have Phazon Suit (developer intended)
    };

    this.locations.get(PrimeLocation.FUNGAL_HALL_B).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings)
        && (!settings.requireVisors || (items.has(PrimeItem.THERMAL_VISOR) || items.has(PrimeItem.XRAY_VISOR)));
    };

    this.locations.get(PrimeLocation.METROID_QUARANTINE_A).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs()
        && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings)
        && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR))
        && ((settings.ghettoJumping && settings.standableTerrain && settings.dashing) || items.has(PrimeItem.SPIDER_BALL));
    };

    this.locations.get(PrimeLocation.METROID_QUARANTINE_B).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && items.canFireSuperMissiles();
    };

    this.locations.get(PrimeLocation.ELITE_QUARTERS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && items.has(PrimeItem.XRAY_VISOR);
    };

    this.locations.get(PrimeLocation.PROCESSING_CENTER_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLowerMinesAccess(settings) && items.has(PrimeItem.XRAY_VISOR);
    };

    this.locations.get(PrimeLocation.PHAZON_PROCESSING_CENTER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get(PrimeLocation.ELITE_CONTROL_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get(PrimeLocation.VENTILATION_SHAFT).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings) && items.canLayPowerBombs()
        && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };

    this.locations.get(PrimeLocation.CENTRAL_DYNAMO).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasUpperMinesAccess(settings)
        && items.canClimbVentShaft(settings) && items.canClimbMinesSpiderShafts(settings) && items.canClimbOreProcessing(settings);
    };
  }
}

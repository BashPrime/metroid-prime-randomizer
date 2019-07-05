import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function phazonMines(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Mines Upper',
      locations: {
        [PrimeLocation.MAIN_QUARRY]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = settings.allowedTricks.mainQuarryItemWithoutSpider || items.canSpider();
          const thermalReqs = settings.allowedTricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return spiderReqs && thermalReqs;
        },
        [PrimeLocation.SECURITY_ACCESS_A]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.STORAGE_DEPOT_A]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Mines Elite Research': () => true,
        'Mines Ore Processing': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM),
        'Tallon South Lower': () => true
      }
    },
    {
      name: 'Mines Elite Research',
      locations: {
        [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.ELITE_RESEARCH_LASER]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs()
      },
      exits: {
        'Mines Upper': () => true,
        'Mines Ore Processing': (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs()
      }
    },
    {
      name: 'Mines Ore Processing',
      locations: {
        [PrimeLocation.STORAGE_DEPOT_B]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canSpider()
      },
      exits: {
        'Mines Upper': (items: PrimeItemCollection) => items.canLayBombs() && items.canLayPowerBombs() && items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM),
        'Mines Central': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider()
        // Don't add Elite Research unless trick is enabled
      }
    },
    {
      name: 'Mines Central',
      locations: {
        [PrimeLocation.ELITE_CONTROL_ACCESS]: (items: PrimeItemCollection) => items.hasMissiles(),
        [PrimeLocation.PHAZON_PROCESSING_CENTER]: (items: PrimeItemCollection) => items.canSpider() && items.canLayPowerBombs()
      },
      exits: {
        'Mines Ore Processing': () => true,
        'Mines Lower': () => true,
        'Magmoor Second Half': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => (settings.allowedTricks.minesSpiderlessShafts && items.canLayBombs()) || items.canSpider()
        // Don't add Mines Depths as the exit is initially locked
      }
    },
    {
      name: 'Mines Lower',
      locations: {
        [PrimeLocation.VENTILATION_SHAFT]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.CENTRAL_DYNAMO]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.METROID_QUARANTINE_A]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.allowedTricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return items.canSpider() && items.canLayPowerBombs() && xrayReqs;
        }
      },
      exits: {
        'Mines Central': (items: PrimeItemCollection) => items.canBoost(),
        'Mines Depths': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.allowedTricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return items.canSpider() && xrayReqs && items.has(PrimeItem.PLASMA_BEAM)
        }
      }
    },
    {
      name: 'Mines Depths',
      locations: {
        [PrimeLocation.FUNGAL_HALL_ACCESS]: () => true,
        [PrimeLocation.PHAZON_MINING_TUNNEL]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.PHAZON_SUIT),
        [PrimeLocation.FUNGAL_HALL_B]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.canLayBombs(),
        [PrimeLocation.METROID_QUARANTINE_B]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.canSpider()
          && items.canFireSuperMissiles(),
        [PrimeLocation.ELITE_QUARTERS]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR),
        [PrimeLocation.PROCESSING_CENTER_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR)
      },
      exits: {
        'Mines Lower': () => true,
        'Mines Central': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR)
      }
    }
  ];

  return regions;
};

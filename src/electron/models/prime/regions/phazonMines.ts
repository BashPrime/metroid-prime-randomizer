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
          const spiderReqs = settings.tricks.mainQuarryItemWithoutSpider || items.canSpider();
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return spiderReqs && thermalReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [PrimeLocation.SECURITY_ACCESS_A]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.STORAGE_DEPOT_A]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Mines Elite Research': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Mines Ore Processing': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Mines Transport East': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Mines Elite Research',
      locations: {
        [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.ELITE_RESEARCH_LASER]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Mines Upper': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM),
        'Mines Ore Processing': (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Mines Ore Processing',
      locations: {
        [PrimeLocation.STORAGE_DEPOT_B]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canSpider()
      },
      exits: {
        'Mines Upper': (items: PrimeItemCollection) => items.canLayBombs() && items.canLayPowerBombs() && items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.ICE_BEAM),
        'Mines Central': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.has(PrimeItem.ICE_BEAM)
        // Don't add Elite Research unless trick is enabled
      }
    },
    {
      name: 'Mines Central',
      locations: {
        [PrimeLocation.ELITE_CONTROL_ACCESS]: (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.PHAZON_PROCESSING_CENTER]: (items: PrimeItemCollection) => items.canSpider() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Mines Ore Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.canLayBombs() && (settings.tricks.minesSpiderlessShafts || items.canSpider())
          && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Mines Lower': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS), // boost for safety/anti-softlock
        'Mines Transport West': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM)
        // Don't add Mines Depths as the exit is initially locked
      }
    },
    {
      name: 'Mines Lower',
      locations: {
        [PrimeLocation.VENTILATION_SHAFT]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.CENTRAL_DYNAMO]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.METROID_QUARANTINE_A]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && items.canSpider() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Mines Central': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Mines Depths': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && items.canSpider() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)
        }
      }
    },
    {
      name: 'Mines Depths',
      locations: {
        [PrimeLocation.FUNGAL_HALL_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        [PrimeLocation.PHAZON_MINING_TUNNEL]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PHAZON_SUIT),
        [PrimeLocation.FUNGAL_HALL_B]: (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.METROID_QUARANTINE_B]: (items: PrimeItemCollection) => items.canSpider() && items.canFireSuperMissiles() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.ELITE_QUARTERS]: (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.PROCESSING_CENTER_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR)
      },
      exits: {
        'Mines Lower': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM),
        'Mines Central': (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Mines Transport East',
      exits: {
        'Tallon Transport South (Mines)': () => true,
        'Mines Upper': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Mines Transport West',
      exits: {
        'Magmoor Transport South (Mines)': () => true,
        'Mines Central': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    }
  ];

  return regions;
};

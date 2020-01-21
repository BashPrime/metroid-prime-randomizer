import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function magmoorCaverns(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Magmoor Lava Lake',
      locations: {
        [PrimeLocation.LAVA_LAKE]: () => true
      },
      exits: {
        'Magmoor First Half': (items: PrimeItemCollection) => items.canLayBombs(),
        'Chozo Sun Tower': () => true,
      }
    },
    {
      name: 'Magmoor First Half',
      locations: {
        [PrimeLocation.TRICLOPS_PIT]: (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.XRAY_VISOR),
        [PrimeLocation.STORAGE_CAVERN]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        [PrimeLocation.TRANSPORT_TUNNEL_A]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.SHORE_TUNNEL]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
      },
      exits: {
        'Magmoor Lava Lake': (items: PrimeItemCollection) => items.canLayBombs(),
        'Magmoor Warrior Shrine': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const wsReqs = settings.tricks.warriorShrineWithoutBoost || (items.canBoost() && items.canLayBombs());
          return wsReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.canLayBombs() || items.has(PrimeItem.GRAPPLE_BEAM),
        'Phendrana Shorelines': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        }
      }
    },
    {
      name: 'Magmoor Fiery Shores',
      locations: {
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Magmoor First Half': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM),
        'Magmoor Transport Tallon West': (items: PrimeItemCollection) => items.canLayBombs() || items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Magmoor Warrior Shrine',
      locations: {
        [PrimeLocation.WARRIOR_SHRINE]: () => true,
        [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]: (items: PrimeItemCollection) => items.canLayPowerBombs()
      },
      exits: {
        'Magmoor First Half': () => true,
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canLayBombs()
      }
    },
    {
      name: 'Magmoor Transport Tallon West',
      locations: {},
      exits: {
        'Magmoor Fiery Shores': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleMorphReq = settings.tricks.fieryShoresAccessWithoutMorphGrapple || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.GRAPPLE_BEAM));
          return grappleMorphReq && items.hasSuit(settings);
        },

        'Magmoor Second Half': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const accessReqs = settings.tricks.crossTwinFiresTunnelWithoutSpider || items.canSpider();
          return accessReqs && items.hasSuit(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM);
        },
        'Tallon Root Cave': () => true
      }
    },
    {
      name: 'Magmoor Second Half',
      locations: {
        [PrimeLocation.MAGMOOR_WORKSTATION]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Magmoor Plasma Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleSpiderReqs = settings.tricks.plasmaProcessingWithoutGrappleSpider || (items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM));
          return grappleSpiderReqs && items.canLayBombs() && items.canBoost() && items.has(PrimeItem.ICE_BEAM);
        },
        'Phendrana Transport Magmoor South': () => true,
        'Magmoor Transport Tallon West': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.hasSuit(settings),
        'Mines Central': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Magmoor Plasma Processing',
      locations: {
        [PrimeLocation.PLASMA_PROCESSING]: () => true
      },
      exits: {
        'Magmoor Second Half': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM)
      }
    }
  ];

  return regions;
};

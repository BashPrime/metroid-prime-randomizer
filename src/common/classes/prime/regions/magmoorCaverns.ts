import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function magmoorCaverns(settings: PrimeRandomizerSettings): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Magmoor Lava Lake',
      locations: {
        [PrimeLocation.LAVA_LAKE]: () => true
      },
      exits: {
        'Magmoor First Half': () => true,
        'Chozo Sun Tower': () => true,
      }
    },
    {
      name: 'Magmoor First Half',
      locations: {
        [PrimeLocation.TRICLOPS_PIT]: () => true,
        [PrimeLocation.STORAGE_CAVERN]: () => true,
        [PrimeLocation.TRANSPORT_TUNNEL_A]: () => true,
        [PrimeLocation.WARRIOR_SHRINE]: () => true,
        [PrimeLocation.SHORE_TUNNEL]: () => true,
      },
      exits: {
        'Magmoor Lava Lake': () => true,
        'Magmoor Shrine Tunnel': (items: PrimeItemCollection) => items.canLayPowerBombs(),
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM),
        'Phendrana Shorelines': () => true
      }
    },
    {
      name: 'Magmoor Fiery Shores',
      locations: {
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Magmoor First Half': () => true,
        'Magmoor Second Half': (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM),
        'Tallon North': () => true
      }
    },
    {
      name: 'Magmoor Shrine Tunnel',
      locations: {
        [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]: () => true
      },
      exits: {
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Magmoor Second Half',
      locations: {
        [PrimeLocation.PLASMA_PROCESSING]: () => true,
        [PrimeLocation.MAGMOOR_WORKSTATION]: () => true
      },
      exits: {
        'Magmoor Fiery Shores': () => true,
        'Phendrana Transport Magmoor South': () => true,
        'Mines Central': () => true
      }
    }
  ];

  return regions;
};

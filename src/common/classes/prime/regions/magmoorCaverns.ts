import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';

export function magmoorCaverns(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Magmoor First Half',
      locations: {
        [PrimeLocation.LAVA_LAKE]: () => true,
        [PrimeLocation.TRICLOPS_PIT]: () => true,
        [PrimeLocation.STORAGE_CAVERN]: () => true,
        [PrimeLocation.TRANSPORT_TUNNEL_A]: () => true,
        [PrimeLocation.WARRIOR_SHRINE]: () => true,
        [PrimeLocation.SHORE_TUNNEL]: () => true,
      },
      exits: {
        'Magmoor Shrine Tunnel': (items: PrimeItemCollection) => items.canLayPowerBombs(),
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Magmoor Fiery Shores',
      locations: {
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Magmoor First Half': () => true,
        'Tallon North': () => true,
        'Magmoor Second Half': (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
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
        'Magmoor Fiery Shores': () => true
      }
    }
  ];

  return regions;
};

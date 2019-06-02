import { Region } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { Location } from '../../location';
import { PrimeItemCollection } from '../itemCollection';
import { ItemCollection } from '../../itemCollection';

export function magmoorCaverns(): Region[] {
  const regions = [
    new Region({
      name: 'Magmoor First Half',
      locations: {
        [PrimeLocation.LAVA_LAKE]: new Location(PrimeLocation.LAVA_LAKE, 90),
        [PrimeLocation.TRICLOPS_PIT]: new Location(PrimeLocation.TRICLOPS_PIT, 91),
        [PrimeLocation.STORAGE_CAVERN]: new Location(PrimeLocation.STORAGE_CAVERN, 92),
        [PrimeLocation.TRANSPORT_TUNNEL_A]: new Location(PrimeLocation.TRANSPORT_TUNNEL_A, 93),
        [PrimeLocation.WARRIOR_SHRINE]: new Location(PrimeLocation.WARRIOR_SHRINE, 94),
        [PrimeLocation.SHORE_TUNNEL]: new Location(PrimeLocation.SHORE_TUNNEL, 95),
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: new Location(PrimeLocation.FIERY_SHORES_MORPH_TRACK, 96),
        [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]: new Location(PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL, 97)
      },
      exits: {
        'Chozo Sunchamber and Vault': () => true,
        'Tallon North': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM),
        'Magmoor Second Half': (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
      }
    }),
    new Region({
      name: 'Magmoor Second Half',
      locations: {
        [PrimeLocation.PLASMA_PROCESSING]: new Location(PrimeLocation.PLASMA_PROCESSING, 98),
        [PrimeLocation.MAGMOOR_WORKSTATION]: new Location(PrimeLocation.MAGMOOR_WORKSTATION, 99)
      },
      exits: {
        'Magmoor First Half': (items: ItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
      }
    })
  ];

  return regions;
};

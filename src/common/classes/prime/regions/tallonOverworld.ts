import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function tallonOverworld(settings: PrimeRandomizerSettings): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Tallon North',
      locations: {
        [PrimeLocation.LANDING_SITE]: () => true,
        [PrimeLocation.ALCOVE]: () => true,
        [PrimeLocation.ARTIFACT_TEMPLE]: () => true
      },
      exits: {
        'Tallon Crash Site': () => true,
        'Tallon Root Cave': (items: PrimeItemCollection) => items.hasMissiles(),
        'Chozo West': () => true
      }
    },
    {
      name: 'Tallon Crash Site',
      locations: {
        [PrimeLocation.FRIGATE_CRASH_SITE]: () => true
      },
      exits: {
        'Tallon North': () => true,
        'Tallon Crashed Frigate': () => true
      }
    },
    {
      name: 'Tallon Overgrown Cavern',
      locations: {
        [PrimeLocation.OVERGROWN_CAVERN]: () => true
      },
      exits: {
        'Chozo Reflecting Pool': () => true,
        'Tallon Crash Site': () => true
      }
    },
    {
      name: 'Tallon Root Cave',
      locations: {
        [PrimeLocation.ROOT_CAVE]: () => true,
        [PrimeLocation.TRANSPORT_TUNNEL_B]: () => true,
        [PrimeLocation.ARBOR_CHAMBER]: () => true
      },
      exits: {
        'Tallon North': () => true,
        'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Tallon Crashed Frigate',
      locations: {
        [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]: () => true,
        [PrimeLocation.BIOHAZARD_CONTAINMENT]: () => true,
        [PrimeLocation.HYDRO_ACCESS_TUNNEL]: () => true
      },
      exits: {
        'Tallon North': () => true,
        'Tallon South Lower': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Tallon South Upper',
      locations: {
        [PrimeLocation.GREAT_TREE_CHAMBER]: () => true,
        [PrimeLocation.LIFE_GROVE_TUNNEL]: () => true,
        [PrimeLocation.LIFE_GROVE_START]: () => true,
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: () => true
      },
      exits: {
        'Chozo Reflecting Pool': () => true
      }
    },
    {
      name: 'Tallon South Lower',
      locations: {
      },
      exits: {
        'Mines Upper': () => true
      }
    }
  ];

  return regions;
};

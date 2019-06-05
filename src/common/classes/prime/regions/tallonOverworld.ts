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
        [PrimeLocation.FRIGATE_CRASH_SITE]: () => true,
        [PrimeLocation.OVERGROWN_CAVERN]: () => true,
        [PrimeLocation.ARTIFACT_TEMPLE]: () => true
      },
      exits: {
        'Tallon Crashed Frigate': (items: PrimeItemCollection) => {
          return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
            && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAVITY_SUIT);
        },
        'Tallon Root Cave': (items: PrimeItemCollection) => items.hasMissiles(),
        // 'Chozo Main Plaza': () => true
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
        // 'Magmoor Fiery Shores': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
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
        'Tallon North': () => true
        // 'Tallon South': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Tallon South',
      locations: {
        [PrimeLocation.GREAT_TREE_CHAMBER]: () => true,
        [PrimeLocation.LIFE_GROVE_TUNNEL]: () => true,
        [PrimeLocation.LIFE_GROVE_START]: () => true,
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: () => true
      },
      exits: {
        'Tallon Crashed Frigate': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT)
      }
    }
  ];

  return regions;
};

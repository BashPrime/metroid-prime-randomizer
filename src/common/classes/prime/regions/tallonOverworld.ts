import { Region } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { Location } from '../../location';
import { PrimeItemCollection } from '../itemCollection';

export function tallonOverworld(): Region[] {
  const regions = [
    new Region({
      name: 'Tallon North',
      locations: {
        [PrimeLocation.LANDING_SITE]: new Location(PrimeLocation.LANDING_SITE, 58),
        [PrimeLocation.ALCOVE]: new Location(PrimeLocation.ALCOVE, 59),
        [PrimeLocation.FRIGATE_CRASH_SITE]: new Location(PrimeLocation.FRIGATE_CRASH_SITE, 60),
        [PrimeLocation.OVERGROWN_CAVERN]: new Location(PrimeLocation.OVERGROWN_CAVERN, 61),
        [PrimeLocation.ROOT_CAVE]: new Location(PrimeLocation.ROOT_CAVE, 62),
        [PrimeLocation.ARTIFACT_TEMPLE]: new Location(PrimeLocation.ARTIFACT_TEMPLE, 63),
        [PrimeLocation.TRANSPORT_TUNNEL_B]: new Location(PrimeLocation.TRANSPORT_TUNNEL_B, 64),
        [PrimeLocation.ARBOR_CHAMBER]: new Location(PrimeLocation.ARBOR_CHAMBER, 65)
      },
      exits: {
        'Tallon Crashed Frigate': (items: PrimeItemCollection) => {
          return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
            && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAVITY_SUIT);
        }
      }
    }),
    new Region({
      name: 'Tallon Crashed Frigate',
      locations: {
        [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]: new Location(PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA, 66),
        [PrimeLocation.BIOHAZARD_CONTAINMENT]: new Location(PrimeLocation.BIOHAZARD_CONTAINMENT, 67),
        [PrimeLocation.HYDRO_ACCESS_TUNNEL]: new Location(PrimeLocation.HYDRO_ACCESS_TUNNEL, 68),
      },
      exits: {
        'Tallon North': () => true,
        'Tallon South': (items: PrimeItemCollection) => items.canLayBombs()
      }
    }),
    new Region({
      name: 'Tallon South',
      locations: {
        [PrimeLocation.GREAT_TREE_CHAMBER]: new Location(PrimeLocation.GREAT_TREE_CHAMBER, 69),
        [PrimeLocation.LIFE_GROVE_TUNNEL]: new Location(PrimeLocation.LIFE_GROVE_TUNNEL, 70),
        [PrimeLocation.LIFE_GROVE_START]: new Location(PrimeLocation.LIFE_GROVE_START, 71),
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: new Location(PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER, 72)
      },
      exits: {
        'Tallon Crashed Frigate': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT)
      }
    })
  ];

  return regions;
};

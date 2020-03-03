import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function tallonOverworld(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Tallon North',
      locations: {
        [PrimeLocation.LANDING_SITE]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Tallon Alcove': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const normalReqs = items.canBoost() && items.canLayBombs();
          return settings.tricks.alcoveNoItems || normalReqs || items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Tallon Artifact Temple': (items: PrimeItemCollection) => items.hasMissiles(),
        'Tallon Crash Site': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL),
        'Tallon Root Cave': (items: PrimeItemCollection) => items.hasMissiles(),
        'Tallon Transport North': () => true
      }
    },
    {
      name: 'Tallon Artifact Temple',
      locations: {
        [PrimeLocation.ARTIFACT_TEMPLE]: () => true
      },
      exits: {
        'Tallon North': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Tallon Alcove',
      locations: {
        [PrimeLocation.ALCOVE]: () => true
      },
      exits: {
        'Tallon North': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tallon Crash Site',
      locations: {
        [PrimeLocation.FRIGATE_CRASH_SITE]: (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAVITY_SUIT)
      },
      exits: {
        'Tallon North': (items: PrimeItemCollection) => items.hasMissiles(),
        'Tallon Crashed Frigate': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAVITY_SUIT)
            && thermalReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
      }
    },
    {
      name: 'Tallon Overgrown Cavern',
      locations: {
        [PrimeLocation.OVERGROWN_CAVERN]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM),
      },
      exits: {
        'Tallon Crash Site': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM),
        'Tallon Transport East': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM),
      }
    },
    {
      name: 'Tallon Root Cave',
      locations: {
        [PrimeLocation.ROOT_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM);
        },
        [PrimeLocation.TRANSPORT_TUNNEL_B]: () => true,
        [PrimeLocation.ARBOR_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const plasmaReqs = (settings.tricks.arborChamberWithoutPlasma && items.canLayBombs())
            || items.has(PrimeItem.PLASMA_BEAM);
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && plasmaReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM);
        }
      },
      exits: {
        'Tallon North': (items: PrimeItemCollection) => items.hasMissiles(),
        'Tallon Transport West': () => true
      }
    },
    {
      name: 'Tallon Crashed Frigate',
      locations: {
        [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]: (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM),
        [PrimeLocation.BIOHAZARD_CONTAINMENT]: (items: PrimeItemCollection) => items.canFireSuperMissiles(),
        [PrimeLocation.HYDRO_ACCESS_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Tallon North': () => true,
        'Tallon South Lower': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Tallon South Upper',
      locations: {
        [PrimeLocation.GREAT_TREE_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
        (settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR)) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Tallon Life Grove': (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM),
        'Tallon Transport South (Chozo)': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Tallon Life Grove',
      locations: {
        [PrimeLocation.LIFE_GROVE_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.LIFE_GROVE_START]: () => true,
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canBoost()
      },
      exits: {
        'Tallon South Upper': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tallon South Lower',
      locations: {
      },
      exits: {
        'Tallon South Upper': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Tallon Crashed Frigate': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);

          return thermalReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Tallon Transport South (Mines)': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tallon Transport North',
      exits: {
        'Chozo Transport West': () => true,
        'Tallon North': () => true
      }
    },
    {
      name: 'Tallon Transport East',
      exits: {
        'Chozo Transport East': () => true,
        'Tallon Overgrown Cavern': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tallon Transport West',
      exits: {
        'Magmoor Transport East': () => true,
        'Tallon Root Cave': () => true
      }
    },
    {
      name: 'Tallon Transport South (Chozo)',
      exits: {
        'Chozo Transport South': () => true,
        'Tallon South Upper': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tallon Transport South (Mines)',
      exits: {
        'Mines Transport East': () => true,
        'Tallon South Lower': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    }
  ];

  return regions;
};

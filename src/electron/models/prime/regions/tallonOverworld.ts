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
        [PrimeLocation.LANDING_SITE]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        [PrimeLocation.ARTIFACT_TEMPLE]: (items: PrimeItemCollection) => items.hasMissiles()
      },
      exits: {
        'Tallon Alcove': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const normalReqs = items.canBoost() && items.canLayBombs();
          return settings.allowedTricks.alcoveNoItems || normalReqs || items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Tallon Crash Site': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL),
        'Tallon Root Cave': (items: PrimeItemCollection) => items.hasMissiles(),
        'Chozo West': () => true
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
        'Tallon North': () => true,
        'Tallon Crashed Frigate': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.allowedTricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAVITY_SUIT)
            && thermalReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
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
        [PrimeLocation.ROOT_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.allowedTricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM) && xrayReqs;
        },
        [PrimeLocation.TRANSPORT_TUNNEL_B]: () => true,
        [PrimeLocation.ARBOR_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const plasmaReqs = (settings.allowedTricks.arborChamberWithoutPlasma && items.canLayBombs())
            || items.has(PrimeItem.PLASMA_BEAM);
          const xrayReqs = settings.allowedTricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && plasmaReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM);
        }
      },
      exits: {
        'Tallon North': (items: PrimeItemCollection) => items.hasMissiles(),
        'Magmoor Transport Tallon West': () => true
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
          settings.allowedTricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR)
      },
      exits: {
        'Tallon Life Grove': (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.canLayPowerBombs(),
        'Chozo Reflecting Pool': () => true
      }
    },
    {
      name: 'Tallon Life Grove',
      locations: {
        [PrimeLocation.LIFE_GROVE_TUNNEL]: () => true,
        [PrimeLocation.LIFE_GROVE_START]: () => true,
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: () => true
      },
      exits: {
        'Tallon South Upper': () => true
      }
    },
    {
      name: 'Tallon South Lower',
      locations: {
      },
      exits: {
        'Tallon South Upper': (items: PrimeItemCollection) => items.canBoost(),
        'Mines Upper': () => true
      }
    }
  ];

  return regions;
};

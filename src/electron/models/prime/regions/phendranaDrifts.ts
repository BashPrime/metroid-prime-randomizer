import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function phendranaDrifts(): RegionObject[] {
  const canBreakIce = (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM) || items.has(PrimeItem.PLASMA_BEAM);
  const regions: RegionObject[] = [
    {
      name: 'Phendrana Shorelines',
      locations: {
        [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK]: (items: PrimeItemCollection) => items.canFireSuperMissiles() && items.canSpider() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
      },
      exits: {
        'Phendrana Chozo Ice Temple': (items: PrimeItemCollection) => canBreakIce(items) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Phendrana Ice Ruins': (items: PrimeItemCollection) => (items.hasMissiles() && canBreakIce(items)) || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Phendrana Transport North': (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      }
    },
    {
      name: 'Phendrana Ice Ruins',
      locations: {
        [PrimeLocation.ICE_RUINS_WEST]: (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]: (items: PrimeItemCollection) => items.canSpider(),
        [PrimeLocation.PHENDRANA_CANYON]: (items: PrimeItemCollection) => items.hasMissiles()
      },
      exits: {
        'Phendrana Shorelines': () => true,
        'Phendrana Courtyard': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Phendrana Chozo Ice Temple',
      locations: {
        [PrimeLocation.CHOZO_ICE_TEMPLE]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Phendrana Chapel of the Elders': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs(),
        'Phendrana Shorelines': (items: PrimeItemCollection) => canBreakIce(items)
      }
    },
    {
      name: 'Phendrana Chapel of the Elders',
      locations: {
        [PrimeLocation.CHAPEL_OF_THE_ELDERS]: () => true
      },
      exits: {
        'Phendrana Chozo Ice Temple': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.canLayBombs()
      }
    },
    {
      name: 'Phendrana Courtyard',
      locations: {
        [PrimeLocation.RUINED_COURTYARD]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs()
      },
      exits: {
        'Phendrana Ice Ruins': () => true,
        'Phendrana Labs First Half': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && ((items.canBoost() && items.canLayBombs()) || items.has(PrimeItem.SPIDER_BALL)),
        'Phendrana Quarantine Cave': (items: PrimeItemCollection) => items.canFireSuperMissiles() && items.has(PrimeItem.WAVE_BEAM)
          && ((items.canBoost() && items.canLayBombs()) || items.has(PrimeItem.SPIDER_BALL))
      }
    },
    {
      name: 'Phendrana Labs First Half',
      locations: {
        [PrimeLocation.RESEARCH_LAB_HYDRA]: (items: PrimeItemCollection) => items.canFireSuperMissiles(),
        [PrimeLocation.OBSERVATORY]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs()
      },
      exits: {
        'Phendrana Courtyard': () => true,
        'Phendrana Labs Second Half': (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs()
      }
    },
    {
      name: 'Phendrana Labs Second Half',
      locations: {
        [PrimeLocation.CONTROL_TOWER]: (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.RESEARCH_CORE]: () => true,
        [PrimeLocation.RESEARCH_LAB_AETHER_TANK]: (items: PrimeItemCollection) => items.hasMissiles(),
        [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Phendrana Labs First Half': () => true,
        'Phendrana Depths': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Phendrana Quarantine Cave',
      locations: {
        [PrimeLocation.QUARANTINE_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
          settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR),
        [PrimeLocation.QUARANTINE_MONITOR]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.quarantineMonitorDash || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.canSpider(); // requiring spider ball for quality of life/softlock protection
        }
      },
      exits: {
        'Phendrana Courtyard': (items: PrimeItemCollection) => items.canSpider() && items.canFireSuperMissiles(), // to prevent softlocking
        'Phendrana Transport South': (items: PrimeItemCollection) => items.canLayBombs() && (items.canSpider() || items.has(PrimeItem.GRAPPLE_BEAM))
      }
    },
    {
      name: 'Phendrana Depths',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.FROST_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.phendranaDepthsGrappleSkips || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.has(PrimeItem.GRAVITY_SUIT);
        },
        [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: (items: PrimeItemCollection) => true,
        [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.gravityChamberGrappleLedgeRJump || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.GRAVITY_SUIT);
        },
        [PrimeLocation.STORAGE_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.phendranaDepthsGrappleSkips || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM);
        },
        [PrimeLocation.SECURITY_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.phendranaDepthsGrappleSkips || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.has(PrimeItem.MORPH_BALL);
        }
      },
      exits: {
        'Phendrana Transport South': (items: PrimeItemCollection) => items.canLayBombs(),
        'Phendrana Labs Second Half': () => true
      }
    },
    {
      name: 'Phendrana Transport North',
      exits: {
        'Magmoor Transport West': () => true,
        'Phendrana Shorelines': (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      }
    },
    {
      name: 'Phendrana Transport South',
      exits: {
        'Magmoor Transport South (Phendrana)': () => true,
        'Phendrana Quarantine Cave': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Phendrana Depths': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.phendranaDepthsAccessWithoutSpider && items.has(PrimeItem.MORPH_BALL)) || items.canSpider();
          return spiderReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM);
        }
      }
    }
  ];

  return regions;
};

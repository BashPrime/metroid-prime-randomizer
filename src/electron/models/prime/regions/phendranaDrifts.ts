import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
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
        'Chozo Ice Temple': (items: PrimeItemCollection) => canBreakIce(items) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Ice Ruins East': (items: PrimeItemCollection) => (items.hasMissiles() && canBreakIce(items)) || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Ice Ruins West': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Phendrana Transport North': (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      }
    },
    {
      name: 'Chozo Ice Temple',
      locations: {
        [PrimeLocation.CHOZO_ICE_TEMPLE]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Chapel of the Elders': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Phendrana Shorelines': (items: PrimeItemCollection) => canBreakIce(items)
      }
    },
    {
      name: 'Chapel of the Elders',
      locations: {
        [PrimeLocation.CHAPEL_OF_THE_ELDERS]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const waveBeamReqs = settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW || items.has(PrimeItem.WAVE_BEAM);
          return waveBeamReqs && (items.hasMissiles() || items.canLayBombs() || items.has(PrimeItem.PLASMA_BEAM));
        }
      },
      exits: {
        'Chozo Ice Temple': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Ice Ruins East',
      locations: {
        [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM),
        [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]: (items: PrimeItemCollection) => items.canSpider()
      },
      exits: {
        'Ice Ruins West': () => true,
        'Phendrana Shorelines': (items: PrimeItemCollection) => canBreakIce(items)
      }
    },
    {
      name: 'Ice Ruins West',
      locations: {
        [PrimeLocation.ICE_RUINS_WEST]: (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Phendrana Canyon': (items: PrimeItemCollection) => items.hasMissiles(),
        'Ruined Courtyard': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM),
        'Ice Ruins East': () => true,
        'Phendrana Shorelines': () => true
      }
    },
    {
      name: 'Phendrana Canyon',
      locations: {
        [PrimeLocation.PHENDRANA_CANYON]: () => true
      },
      exits: {
        // You'll softlock if you destroy the boxes, and don't have space jump or boost
        'Ice Ruins West': (items: PrimeItemCollection) => items.canBoost() || items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Ruined Courtyard',
      locations: {
        [PrimeLocation.RUINED_COURTYARD]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Ice Ruins West': () => true,
        'Research Lab Hydra': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && ((items.canBoost() && items.canLayBombs()) || items.has(PrimeItem.SPIDER_BALL)),
        'Quarantine Cave': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return thermalReqs && items.canFireSuperMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && ((items.canBoost() && items.canLayBombs()) || items.has(PrimeItem.SPIDER_BALL));
        }
      }
    },
    {
      name: 'Quarantine Cave',
      locations: {
        [PrimeLocation.QUARANTINE_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
          settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR),
        [PrimeLocation.QUARANTINE_MONITOR]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.quarantineMonitorDash || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.canSpider(); // requiring spider ball for quality of life/softlock protection
        }
      },
      exits: {
        'Phendrana Transport South': (items: PrimeItemCollection) => (items.canLayBombs() && items.canSpider())
          || (items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM)),
        'Ruined Courtyard': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = items.canSpider() || settings.tricks.exitQuarantineCaveRuinedCourtyardSlopeJump;
          return spiderReqs && items.canFireSuperMissiles() && items.has(PrimeItem.WAVE_BEAM);
        }
      }
    },
    {
      name: 'Research Lab Hydra',
      locations: {
        [PrimeLocation.RESEARCH_LAB_HYDRA]: (items: PrimeItemCollection) => items.canFireSuperMissiles()
      },
      exits: {
        'Observatory': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM),
        'Ruined Courtyard': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Observatory',
      locations: {
        [PrimeLocation.OBSERVATORY]: (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Control Tower': (items: PrimeItemCollection) => items.hasMissiles() && items.canBoost() && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Research Lab Hydra': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Control Tower',
      exits: {
        'Research Lab Aether': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Control Tower (Collapsed Tower)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const bombReqs = settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL || items.canLayBombs();
          return bombReqs && items.hasMissiles() && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Research Lab Hydra': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Control Tower (Collapsed Tower)',
      locations: {
        [PrimeLocation.CONTROL_TOWER]: () => true
      },
      exits: {
        'Control Tower': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Research Lab Aether',
      locations: {
        [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.RESEARCH_LAB_AETHER_TANK]: (items: PrimeItemCollection) => items.hasMissiles()
      },
      exits: {
        'Research Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Control Tower': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Research Core',
      locations: {
        [PrimeLocation.RESEARCH_CORE]: () => true
      },
      exits: {
        'Frozen Pike': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        'Research Lab Aether': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return thermalReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Frozen Pike',
      exits: {
        'Frost Cave': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Hunter Cave': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Transport Access (Phendrana)': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Transport Access (Phendrana)',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Frozen Pike': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const bombReqs = settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL || items.canLayBombs();
          return bombReqs && items.has(PrimeItem.WAVE_BEAM);
        },
        'Phendrana Transport South': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Frost Cave',
      locations: {
        [PrimeLocation.FROST_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.removePhendranaDepthsGrappleReqs || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReqs && items.hasMissiles() && items.has(PrimeItem.GRAVITY_SUIT)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Phendrana\'s Edge': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Frozen Pike': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Phendrana\'s Edge',
      locations: {
        [PrimeLocation.STORAGE_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.removePhendranaDepthsGrappleReqs || items.has(PrimeItem.GRAPPLE_BEAM);
          return items.canLayPowerBombs() && grappleReqs && items.has(PrimeItem.PLASMA_BEAM)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [PrimeLocation.SECURITY_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.removePhendranaDepthsGrappleReqs || items.has(PrimeItem.GRAPPLE_BEAM);
          return items.has(PrimeItem.MORPH_BALL) && grappleReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Hunter Cave': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM),
        'Frost Cave': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Hunter Cave',
      exits: {
        'Gravity Chamber': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Frost Cave': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.removePhendranaDepthsGrappleReqs || items.has(PrimeItem.GRAPPLE_BEAM);
          return items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && grappleReqs
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Phendrana\'s Edge': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Gravity Chamber',
      locations: {
        [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grapplePlasmaReqs = settings.tricks.gravityChamberLedgeItemWithoutGrapplePlasma || (items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.PLASMA_BEAM));
          return grapplePlasmaReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Hunter Cave': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Frost Cave': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
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
        'Quarantine Cave': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Transport Access (Phendrana)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.phendranaTransportSouthToTransportAccessWithoutSpider && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.canSpider();
          return spiderReqs && items.has(PrimeItem.ICE_BEAM);
        }
      }
    }
  ];

  return regions;
};

import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';
import { Elevator } from '../../../enums/elevator';

export function phendranaDrifts(): RegionObject[] {
  const canBreakIce = (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM) || items.has(PrimeItem.PLASMA_BEAM);

  const regions: RegionObject[] = [
    {
      name: 'Phendrana Shorelines',
      locations: {
        [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.chozoIceTempleWithoutSpaceJump && items.canLayBombs());
          const infiniteSpeedReqs = settings.tricks.earlyPhendranaBehindIceItemsWithIS && sjReqs && items.canInfiniteSpeed() && items.has(PrimeItem.WAVE_BEAM);

          return infiniteSpeedReqs || items.has(PrimeItem.PLASMA_BEAM);
        },
        [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.chozoIceTempleWithoutSpaceJump && items.canLayBombs());
          return sjReqs && items.canFireSuperMissiles() && items.canSpider() && items.has(PrimeItem.SCAN_VISOR);
        },
      },
      exits: {
        'Chozo Ice Temple': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.chozoIceTempleWithoutSpaceJump && items.canLayBombs());
          return sjReqs && canBreakIce(items);
        },
        'Ice Ruins East': (items: PrimeItemCollection) => (canBreakIce(items) || items.has(PrimeItem.SPACE_JUMP_BOOTS)) && items.has(PrimeItem.SCAN_VISOR),
        'Ice Ruins West': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [Elevator.PHENDRANA_NORTH]: (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      }
    },
    {
      name: 'Chozo Ice Temple',
      locations: {
        [PrimeLocation.CHOZO_ICE_TEMPLE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.chozoIceTempleWithoutSpaceJump && items.canLayBombs());
          const infiniteSpeedReqs = (settings.tricks.chozoIceTempleItemWithIS && items.canInfiniteSpeed() && items.has(PrimeItem.WAVE_BEAM))
            || (settings.tricks.waveSunOobWallcrawlWithIS && items.hasMissiles() && items.canWallcrawl(settings) && items.canInfiniteSpeed());
          return sjReqs && ((items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.MORPH_BALL)) || infiniteSpeedReqs);
        }
      },
      exits: {
        'Chapel of the Elders': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || settings.tricks.chozoIceTempleWithoutSpaceJump;
          return sjReqs && items.hasMissiles() && items.canLayBombs();
        },
        'Phendrana Shorelines': (items: PrimeItemCollection) => canBreakIce(items)
      }
    },
    {
      name: 'Chapel of the Elders',
      locations: {
        [PrimeLocation.CHAPEL_OF_THE_ELDERS]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const infiniteSpeedReqs = settings.tricks.waveSunOobWallcrawlWithIS && items.hasMissiles() && items.canWallcrawl(settings) && items.canInfiniteSpeed();
          const baseReqs = (items.hasMissiles() || items.canLayBombs() || items.has(PrimeItem.PLASMA_BEAM)) || infiniteSpeedReqs;

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return baseReqs;
          }

          return items.has(PrimeItem.WAVE_BEAM) && baseReqs;
        }
      },
      exits: {
        'Chozo Ice Temple': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const waveReqs = items.has(PrimeItem.WAVE_BEAM) || (settings.tricks.chapelOfTheEldersWithPowerBombs && items.canLayPowerBombs());
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || settings.tricks.chozoIceTempleWithoutSpaceJump;
          return waveReqs && sjReqs && items.canLayBombs();
        }
      }
    },
    {
      name: 'Ice Ruins East',
      locations: {
        [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.chozoIceTempleWithoutSpaceJump && items.canLayBombs());
          const infiniteSpeedReqs = settings.tricks.earlyPhendranaBehindIceItemsWithIS && sjReqs && items.canInfiniteSpeed() && items.has(PrimeItem.WAVE_BEAM);

          return infiniteSpeedReqs || items.has(PrimeItem.PLASMA_BEAM);
        },
        [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
          items.canSpider() || (settings.tricks.iceRuinsEastSpiderItemWithoutSpider && items.canLayBombs())
      },
      exits: {
        'Ice Ruins West': () => true,
        'Phendrana Shorelines': () => true
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
        // Need space jump or scan visor to get to the platforms
        [PrimeLocation.PHENDRANA_CANYON]: (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SCAN_VISOR)
      },
      exits: {
        // You'll softlock if you destroy the boxes, and don't have space jump or boost
        'Ice Ruins West': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.canBoost() || items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return baseReqs || settings.tricks.exitPhendranaCanyonNoItems;
        }
      }
    },
    {
      name: 'Ruined Courtyard',
      locations: {
        [PrimeLocation.RUINED_COURTYARD]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostSpiderReqs = items.canBoost() || items.canSpider() || settings.tricks.climbRuinedCourtyardWithoutBoostSpider;
          return boostSpiderReqs && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Ice Ruins West': () => true,
        'Research Lab Hydra': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostSpiderReqs = ((items.canBoost() && items.canLayBombs()) || items.canSpider()) || settings.tricks.climbRuinedCourtyardWithoutBoostSpider;
          return boostSpiderReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);
        },
        'Quarantine Cave': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          const boostSpiderReqs = ((items.canBoost() && items.canLayBombs()) || items.canSpider()) || (settings.tricks.climbRuinedCourtyardWithoutBoostSpider && items.has(PrimeItem.MORPH_BALL));
          const baseReqs = !settings.excludeLocations[PrimeLocation.QUARANTINE_CAVE] && boostSpiderReqs && thermalReqs && items.canFireSuperMissiles()
            && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canSpider() && baseReqs;
        }
      }
    },
    {
      name: 'Quarantine Cave',
      locations: {
        [PrimeLocation.QUARANTINE_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR),
        [PrimeLocation.QUARANTINE_MONITOR]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.quarantineMonitorDash || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.canSpider(); // requiring spider ball for quality of life/softlock protection
        }
      },
      exits: {
        [Elevator.PHENDRANA_SOUTH]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          const baseReqs = (items.canLayBombs() && items.canSpider())
            || (items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.MORPH_BALL))
          return thermalReqs && baseReqs;
        },
        'Ruined Courtyard': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          const spiderReqs = items.canSpider() || (settings.tricks.exitQuarantineCaveRuinedCourtyardSlopeJump && items.has(PrimeItem.MORPH_BALL));
          const baseReqs = thermalReqs && spiderReqs && items.has(PrimeItem.WAVE_BEAM);

          // For Ruined Courtyard climb, when point of no return isn't allow all
          const ruinedCourtyardClimbReqs = ((items.canBoost() && items.canLayBombs()) || items.canSpider()) || settings.tricks.climbRuinedCourtyardWithoutBoostSpider;

          // Account for observatory climb
          const observatoryReqs = settings.tricks.climbObservatoryWithoutBoost || (items.canBoost() && items.canLayBombs());

          // For requirements to go through labs to Frozen Pike
          const labsReqs = observatoryReqs && items.hasMissiles() && items.has(PrimeItem.SCAN_VISOR);

          // For Frozen Pike climb requirements
          const frozenPikeClimbReqs = labsReqs && items.has(PrimeItem.ICE_BEAM) && (items.canLayBombs() || settings.tricks.climbFrozenPikeWithoutBombs
            || (items.canBoost() && settings.tricks.boostThroughBombTunnels));

          // Point of no return for Ruined Courtyard climb/Supers
          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          // Need Supers or Ice Beam to come back through the same door or through labs
          return (items.canFireSuperMissiles() || frozenPikeClimbReqs) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && ruinedCourtyardClimbReqs && baseReqs;
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
        'Ruined Courtyard': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SCAN_VISOR)
      }
    },
    {
      name: 'Observatory',
      locations: {
        [PrimeLocation.OBSERVATORY]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const puzzleReqs = settings.tricks.observatoryPuzzleSkip || (items.canBoost() && items.canLayBombs());
          return puzzleReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);
        }
      },
      exits: {
        'Control Tower': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = (items.canBoost() && items.canLayBombs()) || settings.tricks.climbObservatoryWithoutBoost;
          return items.hasMissiles() && boostReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SCAN_VISOR)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Research Lab Hydra': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Control Tower',
      exits: {
        'Research Lab Aether': (items: PrimeItemCollection) => items.has(PrimeItem.SCAN_VISOR) && items.has(PrimeItem.WAVE_BEAM),
        'Control Tower (Collapsed Tower)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.hasMissiles() && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canLayBombs() && baseReqs;
        },
        'Observatory': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM);

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return baseReqs;
          }

          return items.canBoost() && items.canLayBombs() && baseReqs;
        }
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
        [PrimeLocation.RESEARCH_CORE]: (items: PrimeItemCollection) => items.has(PrimeItem.SCAN_VISOR)
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
        'Research Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Frost Cave': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Hunter Cave': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Transport Access (Phendrana)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          const bombReqs = items.canLayBombs() || settings.tricks.climbFrozenPikeWithoutBombs;
          return (bombReqs || canBoost) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Transport Access (Phendrana)',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Frozen Pike': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return items.has(PrimeItem.WAVE_BEAM);
          }

          return items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM);
        },
        [Elevator.PHENDRANA_SOUTH]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)
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
          const grappleReqs = items.has(PrimeItem.GRAPPLE_BEAM) || settings.tricks.removePhendranaDepthsGrappleReqs;
          // Effectively removes visor requirements if either Remove Thermal or Remove X-Ray Requirements are enabled.
          const visorReqs = (items.has(PrimeItem.THERMAL_VISOR) || settings.tricks.removeThermalReqs)
            || (items.has(PrimeItem.XRAY_VISOR) || settings.tricks.removeXrayReqs);

          return grappleReqs && visorReqs && items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM)
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
        'Gravity Chamber': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return baseReqs;
          }

          return items.has(PrimeItem.GRAVITY_SUIT) && baseReqs;
        },
        'Frozen Pike': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.removePhendranaDepthsGrappleReqs || items.has(PrimeItem.GRAPPLE_BEAM);
          return items.hasMissiles() && items.has(PrimeItem.WAVE_BEAM) && grappleReqs
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Phendrana\'s Edge': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
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
        'Hunter Cave': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM),
        'Frozen Pike': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: Elevator.PHENDRANA_NORTH,
      exits: {
        [Elevator.MAGMOOR_WEST]: () => true,
        'Phendrana Shorelines': (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      }
    },
    {
      name: Elevator.PHENDRANA_SOUTH,
      exits: {
        [Elevator.MAGMOOR_SOUTH_PHENDRANA]: () => true,
        'Quarantine Cave': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = !settings.excludeLocations[PrimeLocation.QUARANTINE_CAVE] && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canSpider() && baseReqs;
        },
        'Transport Access (Phendrana)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.phendranaTransportSouthToTransportAccessWithoutSpider && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.canSpider();
          return spiderReqs && items.has(PrimeItem.ICE_BEAM);
        }
      }
    }
  ];

  return regions;
};

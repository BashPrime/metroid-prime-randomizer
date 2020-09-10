import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';
import { Elevator } from '../../../enums/elevator';

export function phazonMines(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Main Quarry',
      locations: {
        [PrimeLocation.MAIN_QUARRY]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const morphReqs = settings.tricks.mainQuarryItemWithoutSpider || (items.canSpider() && items.canLayBombs());
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);

          return morphReqs && thermalReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.SCAN_VISOR);
        }
      },
      exits: {
        'Security Access A': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SCAN_VISOR),
        'Ore Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = items.has(PrimeItem.GRAPPLE_BEAM) || settings.tricks.mainQuarryToOreProcessingWithoutGrapple;
          const baseReqs = grappleReqs && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.ICE_BEAM);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canSpider() && baseReqs;
        },
        [Elevator.MINES_EAST]: (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Security Access A',
      locations: {
        [PrimeLocation.SECURITY_ACCESS_A]: (items: PrimeItemCollection) => items.canLayPowerBombs()
      },
      exits: {
        'Main Quarry': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        'Mine Security Station': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Mine Security Station',
      locations: {
        [PrimeLocation.STORAGE_DEPOT_A]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SCAN_VISOR)
      },
      exits: {
        'Security Access A': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        'Elite Research': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Elite Research',
      locations: {
        [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.ELITE_RESEARCH_LASER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = settings.tricks.eliteResearchLaserWithoutBoost || items.canBoost();
          return boostReqs && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);
        }
      },
      exits: {
        'Ore Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = items.canBoost() || settings.tricks.eliteResearchLaserWithoutBoost;
          const baseReqs = items.canLayBombs() && items.has(PrimeItem.ICE_BEAM)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return boostReqs && baseReqs;
          }

          return items.canSpider() && boostReqs && baseReqs;
        },
        'Mine Security Station': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Ore Processing',
      locations: {
        [PrimeLocation.STORAGE_DEPOT_B]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = items.canSpider() || settings.tricks.climbOreProcessingWithoutGrappleSpider;
          return spiderReqs && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM);
        },
      },
      exits: {
        'Main Quarry': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderGrappleReqs = (items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM))
            || settings.tricks.climbOreProcessingWithoutGrappleSpider;
          return spiderGrappleReqs && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.ICE_BEAM)
        },
        'Elite Research': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.spiderlessShafts && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.canSpider();
          return spiderReqs && settings.tricks.eliteResearchInfiniteBoostClip && items.canBoost() && items.has(PrimeItem.ICE_BEAM);
        },
        'Elite Control Access': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (items.canLayBombs() && items.canSpider()) || settings.tricks.climbOreProcessingWithoutGrappleSpider;
          return spiderReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);
        }
      }
    },
    {
      name: 'Elite Control Access',
      locations: {
        [PrimeLocation.ELITE_CONTROL_ACCESS]: (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Elite Control': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Ore Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.spiderlessShafts && items.canLayBombs()) || items.canSpider();
          return spiderReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Elite Control',
      exits: {
        'Ventilation Shaft': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canBoost() && baseReqs;
        },
        'Phazon Processing Center': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM),
        'Elite Control Access': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Phazon Processing Center',
      locations: {
        [PrimeLocation.PHAZON_PROCESSING_CENTER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderBombsReqs = (items.canSpider() && items.canLayBombs()) || settings.tricks.climbPhazonProcessingCenterWithoutSpider;
          return spiderBombsReqs && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Elite Control': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderBombsReqs = (items.canSpider() && items.canLayBombs()) || settings.tricks.climbPhazonProcessingCenterWithoutSpider;
          return spiderBombsReqs && items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [Elevator.MINES_WEST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderBombsReqs = (items.canSpider() && items.canLayBombs()) || settings.tricks.climbPhazonProcessingCenterWithoutSpider;
          return spiderBombsReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Ventilation Shaft',
      locations: {
        [PrimeLocation.VENTILATION_SHAFT]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR)
      },
      exits: {
        'Central Dynamo': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        'Elite Control': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = items.canBoost() || (settings.tricks.ventShaftHpbj && items.canLayBombs());
          return boostReqs && items.has(PrimeItem.ICE_BEAM);
        }
      }
    },
    {
      name: 'Central Dynamo',
      locations: {
        [PrimeLocation.CENTRAL_DYNAMO]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Metroid Quarantine A': (items: PrimeItemCollection) => items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM),
        'Ventilation Shaft': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Metroid Quarantine A',
      locations: {
        [PrimeLocation.METROID_QUARANTINE_A]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = settings.tricks.lowerPhazonMineWithoutSpiderGrapple || (items.canSpider());
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);

          return xrayReqs && spiderReqs && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Fungal Hall Access': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = settings.tricks.lowerPhazonMineWithoutSpiderGrapple || (items.canSpider());
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && spiderReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)
            && items.has(PrimeItem.SCAN_VISOR);
        },
        'Central Dynamo': (items: PrimeItemCollection) => items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Fungal Hall Access',
      locations: {
        [PrimeLocation.FUNGAL_HALL_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Fungal Hall A': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Metroid Quarantine A': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Fungal Hall A',
      exits: {
        'Phazon Mining Tunnel': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.lowerPhazonMineWithoutSpiderGrapple || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Fungal Hall Access': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Phazon Mining Tunnel',
      locations: {
        [PrimeLocation.PHAZON_MINING_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const phazonReqs = items.has(PrimeItem.PHAZON_SUIT) || (settings.tricks.phazonMiningTunnelItemWithoutPhazonSuit && items.hasCount(PrimeItem.ENERGY_TANK, 12) && items.canBoost());
          return items.canLayPowerBombs() && items.canLayBombs() && phazonReqs;
        }
      },
      exits: {
        'Fungal Hall B': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.PLASMA_BEAM),
        'Fungal Hall A': (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Fungal Hall B',
      locations: {
        [PrimeLocation.FUNGAL_HALL_B]: (items: PrimeItemCollection) => items.canLayBombsOrPowerBombs()
      },
      exits: {
        'Metroid Quarantine B (Fungal Hall B Side)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = settings.tricks.lowerPhazonMineWithoutSpiderGrapple || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM);
        },
        'Phazon Mining Tunnel': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Metroid Quarantine B (Fungal Hall B Side)',
      exits: {
        'Metroid Quarantine B (Elite Quarters Side)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderGrappleReqs = settings.tricks.lowerPhazonMineWithoutSpiderGrapple || (items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM));
          return spiderGrappleReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SCAN_VISOR);
        },
        'Fungal Hall B': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Metroid Quarantine B (Elite Quarters Side)',
      locations: {
        [PrimeLocation.METROID_QUARANTINE_B]: (items: PrimeItemCollection) => items.canFireSuperMissiles()
      },
      exits: {
        'Elite Quarters': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Metroid Quarantine B (Fungal Hall B Side)': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Elite Quarters',
      locations: {
        [PrimeLocation.ELITE_QUARTERS]: (items: PrimeItemCollection) => items.has(PrimeItem.XRAY_VISOR)
      },
      exits: {
        'Processing Center Access': (items: PrimeItemCollection) => items.has(PrimeItem.XRAY_VISOR) && items.has(PrimeItem.PLASMA_BEAM),
        'Metroid Quarantine B (Elite Quarters Side)': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Processing Center Access',
      locations: {
        [PrimeLocation.PROCESSING_CENTER_ACCESS]: () => true
      },
      exits: {
        'Phazon Processing Center': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM),
        'Elite Quarters': (items: PrimeItemCollection) => items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: Elevator.MINES_EAST,
      exits: {
        [Elevator.TALLON_SOUTH_MINES]: () => true,
        'Main Quarry': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: Elevator.MINES_WEST,
      exits: {
        [Elevator.MAGMOOR_SOUTH_MINES]: () => true,
        'Phazon Processing Center': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return items.canSpider() && baseReqs;
        }
      }
    }
  ];

  return regions;
};

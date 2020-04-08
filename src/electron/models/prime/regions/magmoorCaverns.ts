import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function magmoorCaverns(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Lava Lake',
      locations: {
        [PrimeLocation.LAVA_LAKE]: (items: PrimeItemCollection) => items.hasMissiles()
          && (items.has(PrimeItem.GRAPPLE_BEAM) || items.has(PrimeItem.SPACE_JUMP_BOOTS))
      },
      exits: {
        'Triclops Pit': (items: PrimeItemCollection) => items.canLayBombs(),
        'Magmoor Transport North': () => true
      }
    },
    {
      name: 'Triclops Pit',
      locations: {
        [PrimeLocation.TRICLOPS_PIT]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [PrimeLocation.STORAGE_CAVERN]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Monitor Station': () => true,
        'Lava Lake': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Monitor Station',
      locations: {
        [PrimeLocation.TRANSPORT_TUNNEL_A]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Shore Tunnel': () => true,
        'Warrior Shrine': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const wsReqs = settings.tricks.warriorShrineWithoutBoost || items.canBoost();
          return wsReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Magmoor Transport West': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        }
      },
    },
    {
      name: 'Warrior Shrine',
      locations: {
        [PrimeLocation.WARRIOR_SHRINE]: (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Fiery Shores (Warrior Shrine Tunnel)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const bombReqs = settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL || items.canLayBombs();
          return bombReqs && items.canLayPowerBombs();
        },
        'Monitor Station': () => true
      }
    },
    {
      name: 'Fiery Shores (Warrior Shrine Tunnel)',
      locations: {
        [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]: () => true,
      },
      exits: {
        'Fiery Shores (Shore Tunnel Side)': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Shore Tunnel',
      locations: {},
      exits: {
        'Shore Tunnel (Lava Pit)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW || items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return items.canLayPowerBombs() && sjReqs;
        },
        'Fiery Shores (Shore Tunnel Side)': () => true,
        'Monitor Station': () => true
      }
    },
    {
      name: 'Shore Tunnel (Lava Pit)',
      locations: {
        [PrimeLocation.SHORE_TUNNEL]: () => true
      },
      exits: {
        'Shore Tunnel': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
          items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.tricks.shoreTunnelEscapeWithoutSpaceJump && items.canLayBombs())
      }
    },
    {
      name: 'Fiery Shores (Shore Tunnel Side)',
      exits: {
        'Fiery Shores (Tallon Elevator Side)': (items: PrimeItemCollection) => items.canLayBombs() || items.has(PrimeItem.GRAPPLE_BEAM),
        'Shore Tunnel': () => true
      }
    },
    {
      name: 'Fiery Shores (Tallon Elevator Side)',
      locations: {
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Fiery Shores (Shore Tunnel Side)': (items: PrimeItemCollection) => items.canLayBombs() || items.has(PrimeItem.GRAPPLE_BEAM),
        'Magmoor Transport East': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Twin Fires',
      exits: {
        'Geothermal Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Magmoor Transport East': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.tricks.crossTwinFiresTunnelSuitless) {
            return items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.hasCount(PrimeItem.ENERGY_TANK, 2);
          }

          const spiderReqs = settings.tricks.crossTwinFiresTunnelWithoutSpider || items.canSpider();
          return spiderReqs && items.hasSuit(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Geothermal Core',
      exits: {
        'Plasma Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const plasmaReqs = settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW || items.has(PrimeItem.PLASMA_BEAM);
          const grappleSpiderReqs = settings.tricks.plasmaProcessingItemWithoutGrappleSpider || (items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM));
          return plasmaReqs && grappleSpiderReqs && items.canLayBombs() && items.canBoost() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.ICE_BEAM);
        },
        'Magmoor Workstation': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Twin Fires': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Plasma Processing',
      locations: {
        [PrimeLocation.PLASMA_PROCESSING]: () => true
      },
      exits: {
        'Geothermal Core': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM)
      }
    },
    {
      name: 'Magmoor Workstation',
      locations: {
        [PrimeLocation.MAGMOOR_WORKSTATION]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return thermalReqs && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SCAN_VISOR);
        }
      },
      exits: {
        'Magmoor Transport South (Phendrana)': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Magmoor Transport South (Mines)': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Geothermal Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        // OOB only
        'Plasma Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.plasmaProcessingFromMagmoorWorkstationOob && items.canWallcrawl(settings) && items.has(PrimeItem.ICE_BEAM);
        }
      }
    },
    {
      name: 'Magmoor Transport North',
      exits: {
        'Chozo Transport North': () => true,
        'Lava Lake': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.hasSuit(settings)
      }
    },
    {
      name: 'Magmoor Transport West',
      exits: {
        'Phendrana Transport North': () => true,
        'Monitor Station': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const suitReqsMinimum = items.hasSuit(settings) || (settings.tricks.suitlessMagmoorRunMinimal && items.hasCount(PrimeItem.ENERGY_TANK, 3) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          const suitReqs = items.hasSuit(settings) || (settings.tricks.suitlessMagmoorRun && items.hasCount(PrimeItem.ENERGY_TANK, 5) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return (suitReqsMinimum || suitReqs) && (canBoost || items.canLayBombs());
        }
      }
    },
    {
      name: 'Magmoor Transport East',
      exits: {
        'Tallon Transport West': () => true,
        'Fiery Shores (Tallon Elevator Side)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const suitReqsMinimum = items.hasSuit(settings) || (settings.tricks.suitlessMagmoorRunMinimal && items.hasCount(PrimeItem.ENERGY_TANK, 3) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          const suitReqs = items.hasSuit(settings) || (settings.tricks.suitlessMagmoorRun && items.hasCount(PrimeItem.ENERGY_TANK, 5) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          const grappleMorphReq = settings.tricks.fieryShoresAccessWithoutMorphGrapple || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.GRAPPLE_BEAM));
          return grappleMorphReq && (suitReqsMinimum || suitReqs);
        },
        'Twin Fires': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.tricks.crossTwinFiresTunnelSuitless) {
            return items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.hasCount(PrimeItem.ENERGY_TANK, 2);
          }

          const spiderReqs = settings.tricks.crossTwinFiresTunnelWithoutSpider || items.canSpider();
          return spiderReqs && items.hasSuit(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Magmoor Transport South (Mines)',
      exits: {
        'Mines Transport West': () => true,
        'Magmoor Workstation': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Magmoor Transport South (Phendrana)',
      exits: {
        'Phendrana Transport South': () => true,
        'Magmoor Workstation': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
  ];

  return regions;
};

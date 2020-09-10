import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';
import { Elevator } from '../../../enums/elevator';

export function magmoorCaverns(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Lava Lake',
      locations: {
        [PrimeLocation.LAVA_LAKE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.tricks.lavaLakeItemSuitless) {
            return items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          }

          return items.hasMissiles() && (settings.tricks.lavaLakeItemOnlyMissiles || items.has(PrimeItem.GRAPPLE_BEAM)
            || items.has(PrimeItem.SPACE_JUMP_BOOTS))
        }
      },
      exits: {
        'Triclops Pit': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.tricks.lavaLakeItemSuitless) {
            return items.hasSuit(settings) && items.canLayBombs();
          }

          return items.canLayBombs();
        },
        [Elevator.MAGMOOR_NORTH]: () => true
      }
    },
    {
      name: 'Triclops Pit',
      locations: {
        [PrimeLocation.TRICLOPS_PIT]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const missileReqs = (settings.tricks.triclopsPitItemWithCharge && items.has(PrimeItem.CHARGE_BEAM)) || items.hasMissiles();
          const sjReqs = settings.tricks.triclopsPitItemWithoutSpaceJump || items.has(PrimeItem.SPACE_JUMP_BOOTS);
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);

          return missileReqs && sjReqs && xrayReqs;
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
        'Triclops Pit': () => true,
        'Shore Tunnel': () => true,
        'Warrior Shrine': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.tricks.warriorShrineMinimumReqs) {
            return true;
          }

          const boostReqs = settings.tricks.warriorShrineWithoutBoost || items.canBoost();
          return boostReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [Elevator.MAGMOOR_WEST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        }
      },
    },
    {
      name: 'Warrior Shrine',
      locations: {
        [PrimeLocation.WARRIOR_SHRINE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.warriorShrineMinimumReqs || items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Fiery Shores (Warrior Shrine Tunnel)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return items.canLayPowerBombs();
          }

          return items.canLayBombs() && items.canLayPowerBombs();
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
          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return items.canLayPowerBombs();
          }

          return items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
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
        [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.canLayBombs() || (items.has(PrimeItem.SPACE_JUMP_BOOTS) && settings.tricks.fieryShoresItemSj)
      },
      exits: {
        'Fiery Shores (Shore Tunnel Side)': (items: PrimeItemCollection) => items.canLayBombs() || items.has(PrimeItem.GRAPPLE_BEAM),
        [Elevator.MAGMOOR_EAST]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Twin Fires',
      exits: {
        'Geothermal Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [Elevator.MAGMOOR_EAST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
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
          const baseReqs = items.canLayBombs() && items.canBoost() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.ICE_BEAM);
          const grappleSpiderReqs = settings.tricks.plasmaProcessingItemWithoutGrappleSpider || (items.canSpider() && items.has(PrimeItem.GRAPPLE_BEAM));

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return grappleSpiderReqs && baseReqs;
          }

          return items.has(PrimeItem.PLASMA_BEAM) && grappleSpiderReqs && baseReqs;
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
          const morphAndSpaceOrBombs = items.canLayBombs() || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          return thermalReqs && morphAndSpaceOrBombs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SCAN_VISOR);
        }
      },
      exits: {
        [Elevator.MAGMOOR_SOUTH_PHENDRANA]: (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [Elevator.MAGMOOR_SOUTH_MINES]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Geothermal Core': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        // OOB only
        'Plasma Processing': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = settings.tricks.plasmaProcessingFromMagmoorWorkstationOob && items.canWallcrawl(settings) && items.has(PrimeItem.ICE_BEAM);

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return baseReqs;
          }

          return items.has(PrimeItem.PLASMA_BEAM) && baseReqs;
        }
      }
    },
    {
      name: Elevator.MAGMOOR_NORTH,
      exits: {
        [Elevator.CHOZO_NORTH]: () => true,
        'Lava Lake': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.lavaLakeItemSuitless || items.hasSuit(settings)
      }
    },
    {
      name: Elevator.MAGMOOR_WEST,
      exits: {
        [Elevator.PHENDRANA_NORTH]: () => true,
        // Suitless Magmoor check
        [Elevator.MAGMOOR_EAST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          let minimumEnergyTanks: number;

          if (!(settings.tricks.suitlessMagmoorRun || settings.tricks.suitlessMagmoorRunMinimal)) {
            return false;
          } else if (settings.tricks.suitlessMagmoorRunMinimal) {
            minimumEnergyTanks = items.has(PrimeItem.SPACE_JUMP_BOOTS) ? 3 : 4;
          } else {
            // suitlessMagmoorRun
            minimumEnergyTanks = items.has(PrimeItem.SPACE_JUMP_BOOTS) ? 5 : 6;
          }

          return items.canLayBombs() && !items.hasSuit(settings) && items.hasCount(PrimeItem.ENERGY_TANK, minimumEnergyTanks);
        },
        'Monitor Station': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return items.hasSuit(settings) && (canBoost || items.canLayBombs());
        }
      }
    },
    {
      name: Elevator.MAGMOOR_EAST,
      exits: {
        [Elevator.TALLON_WEST]: () => true,
        // Suitless Magmoor check
        [Elevator.MAGMOOR_WEST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          let minimumEnergyTanks: number;

          if (!(settings.tricks.suitlessMagmoorRun || settings.tricks.suitlessMagmoorRunMinimal)) {
            return false;
          } else if (settings.tricks.suitlessMagmoorRunMinimal) {
            minimumEnergyTanks = items.has(PrimeItem.SPACE_JUMP_BOOTS) ? 3 : 4;
          } else {
            // suitlessMagmoorRun
            minimumEnergyTanks = items.has(PrimeItem.SPACE_JUMP_BOOTS) ? 5 : 6;
          }

          return items.canLayBombs() && !items.hasSuit(settings) && items.hasCount(PrimeItem.ENERGY_TANK, minimumEnergyTanks);
        },
        'Fiery Shores (Tallon Elevator Side)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleMorphReq = settings.tricks.fieryShoresAccessWithoutMorphGrapple || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.GRAPPLE_BEAM));
          return grappleMorphReq && items.hasSuit(settings);
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
      name: Elevator.MAGMOOR_SOUTH_MINES,
      exits: {
        [Elevator.MINES_WEST]: () => true,
        'Magmoor Workstation': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = (items.hasSuit(settings) || settings.tricks.lateMagmoorNoHeatProtection) && items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return baseReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: Elevator.MAGMOOR_SOUTH_PHENDRANA,
      exits: {
        [Elevator.PHENDRANA_SOUTH]: () => true,
        'Magmoor Workstation': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = (items.hasSuit(settings) || settings.tricks.lateMagmoorNoHeatProtection) && items.has(PrimeItem.WAVE_BEAM);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return baseReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
  ];

  return regions;
};

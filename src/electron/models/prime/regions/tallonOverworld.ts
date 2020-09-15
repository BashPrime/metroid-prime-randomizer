import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';
import { Elevator } from '../../../enums/elevator';

export function tallonOverworld(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Landing Site',
      locations: {
        [PrimeLocation.LANDING_SITE]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Alcove': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const normalReqs = items.canBoost() && items.canLayBombs();

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return settings.tricks.alcoveNoItems || normalReqs || items.has(PrimeItem.SPACE_JUMP_BOOTS);
          }

          return items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Tallon Canyon': () => true,
        'Artifact Temple': (items: PrimeItemCollection) => items.hasMissiles(),
        'Frigate Crash Site': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Alcove',
      locations: {
        [PrimeLocation.ALCOVE]: () => true
      },
      exits: {
        'Landing Site': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.alcoveNoItems || items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Artifact Temple',
      locations: {
        [PrimeLocation.ARTIFACT_TEMPLE]: () => true
      },
      exits: {
        'Landing Site': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Frigate Crash Site',
      locations: {
        [PrimeLocation.FRIGATE_CRASH_SITE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const normalReqs = items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.GRAVITY_SUIT);
          const scanReqs = settings.tricks.frigateCrashSiteItemOnlyScanVisor && items.has(PrimeItem.SCAN_VISOR);
          const gravitylessReqs = settings.tricks.frigateCrashSiteItemWithoutGravitySuit && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.GRAPPLE_BEAM))
          return scanReqs || gravitylessReqs || normalReqs;
        }
      },
      exits: {
        'Landing Site': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL),
        'Cargo Freight Lift to Deck Gamma': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          const gravityReqs = settings.tricks.crashedFrigateGammaElevatorWithoutGravity || items.has(PrimeItem.GRAVITY_SUIT);
          return items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.ICE_BEAM) && thermalReqs
            && gravityReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        // Only an exit if climb frigate crash site is true
        'Overgrown Cavern': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.climbFrigateCrashSite && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Tallon Canyon',
      exits: {
        'Landing Site': () => true,
        'Root Cave': (items: PrimeItemCollection) => items.hasMissiles(),
        [Elevator.TALLON_NORTH]: () => true
      }
    },
    {
      name: 'Root Cave',
      locations: {
        [PrimeLocation.TRANSPORT_TUNNEL_B]: () => true,
        [PrimeLocation.ROOT_CAVE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = items.has(PrimeItem.GRAPPLE_BEAM) || settings.tricks.rootCaveArborChamberWithoutGrapple;
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && grappleReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [PrimeLocation.ARBOR_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = items.has(PrimeItem.GRAPPLE_BEAM) || settings.tricks.rootCaveArborChamberWithoutGrapple
          const plasmaReqs = (settings.tricks.arborChamberWithoutPlasma && items.canLayBombs())
            || items.has(PrimeItem.PLASMA_BEAM);
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && grappleReqs && plasmaReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Tallon Canyon': (items: PrimeItemCollection) => items.hasMissiles(),
        [Elevator.TALLON_WEST]: () => true
      }
    },
    {
      name: 'Overgrown Cavern',
      locations: {
        [PrimeLocation.OVERGROWN_CAVERN]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Frigate Crash Site': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM),
        [Elevator.TALLON_EAST]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM);
          const sjReqs = (items.has(PrimeItem.SPACE_JUMP_BOOTS) || settings.tricks.tallonTransportTunnelCMinimumReqs);
          return baseReqs && sjReqs;
        }
      }
    },
    {
      name: 'Cargo Freight Lift to Deck Gamma',
      locations: {
        [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]: (items: PrimeItemCollection) => items.hasMissiles() || items.has(PrimeItem.CHARGE_BEAM)
      },
      exits: {
        'Biohazard Containment': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          return items.has(PrimeItem.GRAVITY_SUIT) && thermalReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        },
        'Frigate Crash Site': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Biohazard Containment',
      locations: {
        [PrimeLocation.BIOHAZARD_CONTAINMENT]: (items: PrimeItemCollection) => items.canFireSuperMissiles()
      },
      exits: {
        'Hydro Access Tunnel': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const thermalReqs = settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR);
          const gravityReqs = items.has(PrimeItem.GRAVITY_SUIT) || (settings.tricks.hydroAccessTunnelWithoutGravity);

          return thermalReqs && gravityReqs && items.has(PrimeItem.WAVE_BEAM)
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Cargo Freight Lift to Deck Gamma': (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Hydro Access Tunnel',
      locations: {
        [PrimeLocation.HYDRO_ACCESS_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return (items.canLayBombs() && items.has(PrimeItem.GRAVITY_SUIT))
            || (settings.tricks.hydroAccessTunnelWithoutGravity && items.canBoost());
        }
      },
      exits: {
        'Great Tree Hall (Lower)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const gravityReqs = (items.canLayBombs() && items.has(PrimeItem.GRAVITY_SUIT))
            || (settings.tricks.hydroAccessTunnelWithoutGravity && items.canBoost());

          return gravityReqs && items.has(PrimeItem.ICE_BEAM);
        },
        'Biohazard Containment': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const gravityReqs = (items.canLayBombs() && items.has(PrimeItem.GRAVITY_SUIT))
            || (settings.tricks.hydroAccessTunnelWithoutGravity && items.canBoost());

          return gravityReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      }
    },
    {
      name: 'Great Tree Hall (Upper)',
      locations: {
        [PrimeLocation.GREAT_TREE_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const xrayReqs = settings.tricks.removeXrayReqs || items.has(PrimeItem.XRAY_VISOR);
          return xrayReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Life Grove Tunnel': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canSpider() && items.has(PrimeItem.ICE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [Elevator.TALLON_SOUTH_CHOZO]: (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        // Only with bars skip
        'Great Tree Hall (Lower)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.greatTreeHallBarsSkip && items.canLayBombs()
      }
    },
    {
      name: 'Great Tree Hall (Lower)',
      exits: {
        'Hydro Access Tunnel': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const gravityReqs = items.has(PrimeItem.GRAVITY_SUIT) || settings.tricks.hydroAccessTunnelWithoutGravity;
          const baseReqs = gravityReqs && items.has(PrimeItem.ICE_BEAM);

          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return baseReqs;
          }

          return (settings.tricks.removeThermalReqs || items.has(PrimeItem.THERMAL_VISOR)) && baseReqs;
        },
        'Great Tree Hall (Upper)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = items.canBoost() || (settings.tricks.greatTreeHallBarsSkip && items.canLayBombs());
          return boostReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        [Elevator.TALLON_SOUTH_MINES]: (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Life Grove Tunnel',
      locations: {
        [PrimeLocation.LIFE_GROVE_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs() && items.canBoost()
      },
      exits: {
        'Life Grove': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = items.canBoost() || settings.tricks.lifeGroveTunnelHpbj;
          return boostReqs && items.canLayBombs();
        },
        'Great Tree Hall (Upper)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostReqs = items.canBoost() || settings.tricks.lifeGroveTunnelHpbj;
          return boostReqs && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM);
        }
      }
    },
    {
      name: 'Life Grove',
      locations: {
        [PrimeLocation.LIFE_GROVE_START]: () => true,
        [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spinnerDirectReqs = items.canBoost()
            || (settings.tricks.lifeGroveSpinnerWithoutBoostBall && items.canLayBombs()); // need bombs to prevent softlocking
          return items.canLayPowerBombs() && spinnerDirectReqs;
        }
      },
      exits: {
        'Life Grove Tunnel': (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: Elevator.TALLON_NORTH,
      exits: {
        [Elevator.CHOZO_WEST]: () => true,
        'Tallon Canyon': () => true
      }
    },
    {
      name: Elevator.TALLON_EAST,
      exits: {
        [Elevator.CHOZO_EAST]: () => true,
        'Overgrown Cavern': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM);
          const sjReqs = (items.has(PrimeItem.SPACE_JUMP_BOOTS) || settings.tricks.tallonTransportTunnelCMinimumReqs);
          return baseReqs && sjReqs;
        }
      }
    },
    {
      name: Elevator.TALLON_WEST,
      exits: {
        [Elevator.MAGMOOR_EAST]: () => true,
        'Root Cave': () => true
      }
    },
    {
      name: Elevator.TALLON_SOUTH_CHOZO,
      exits: {
        [Elevator.CHOZO_SOUTH]: () => true,
        'Great Tree Hall (Upper)': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: Elevator.TALLON_SOUTH_MINES,
      exits: {
        [Elevator.MINES_EAST]: () => true,
        'Great Tree Hall (Lower)': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    }
  ];

  return regions;
};

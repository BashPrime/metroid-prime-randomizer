import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PointOfNoReturnItems } from '../../../enums/pointOfNoReturnItems';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';
import { Elevator } from '../../../enums/elevator';

export function chozoRuins(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Main Plaza',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.canBoost()
          || (settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS)),
        [PrimeLocation.MAIN_PLAZA_TREE]: (items: PrimeItemCollection) => items.canFireSuperMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Ruined Nursery': () => true,
        'Ruined Shrine (Outer)': (items: PrimeItemCollection) => items.hasMissiles(),
        'Ruined Fountain': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Main Plaza Locked Door Ledge': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Main Plaza Grapple Ledge': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => settings.tricks.mainPlazaItemsOnlySpaceJump
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        // OOB rooms
        'Training Chamber': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.trainingChamberAndAccessOobWallcrawl && items.canWallcrawl(settings) && items.canLayBombs();
        },
        'Training Chamber Access': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.trainingChamberAndAccessOobWallcrawl && items.canWallcrawl(settings) && items.canLayBombs();
        },
        [Elevator.CHOZO_WEST]: () => true
      }
    },
    {
      name: 'Main Plaza Locked Door Ledge',
      locations: {
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: () => true
      },
      exits: {
        'Main Plaza': () => true
      }
    },
    {
      name: 'Main Plaza Grapple Ledge',
      locations: {
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: () => true
      },
      exits: {
        'Main Plaza': () => true
      }
    },
    {
      name: 'Ruined Nursery',
      locations: {
        [PrimeLocation.RUINED_NURSERY]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return items.canLayBombs() || (settings.tricks.ruinedNurseryWithoutBombs && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS));
        }
      },
      exits: {
        'Ruined Gallery': () => true,
        'Main Plaza': () => true
      }
    },
    {
      name: 'Ruined Gallery',
      locations: {
        [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: (items: PrimeItemCollection) => items.hasMissiles(),
        [PrimeLocation.RUINED_GALLERY_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        }
      },
      exits: {
        'Hive Totem': () => true,
        'Ruined Nursery': () => true
      }
    },
    {
      name: 'Hive Totem',
      locations: {
        [PrimeLocation.HIVE_TOTEM]: () => true,
      },
      exits: {
        'Transport Access North': (items: PrimeItemCollection) => items.hasMissiles(),
        'Ruined Gallery': () => true
      }
    },
    {
      name: 'Transport Access North',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS_NORTH]: () => true
      },
      exits: {
        [Elevator.CHOZO_NORTH]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Hive Totem': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Vault',
      locations: {
        [PrimeLocation.VAULT]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Main Plaza Locked Door Ledge': () => true,
        [Elevator.CHOZO_NORTH]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Ruined Shrine (Outer)',
      locations: {
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spaceJumpReqs = settings.tricks.upperRuinedShrineTowerOfLightFewerAccessReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return spaceJumpReqs || items.canBoost();
        }
      },
      exits: {
        'Ruined Shrine (Pit)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return true;
          }

          return items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Tower of Light': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostSpiderReqs = (items.canBoost() && items.canSpider())
            || (settings.tricks.upperRuinedShrineTowerOfLightFewerAccessReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          return boostSpiderReqs && items.has(PrimeItem.WAVE_BEAM);
        },
        'Main Plaza': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Ruined Shrine (Pit)',
      locations: {
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: () => true,
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const powerBombReqs = settings.tricks.destroyBombCoversWithPowerBombs && items.canLayPowerBombs();
          return items.canLayBombs() || powerBombReqs;
        }
      },
      exits: {
        'Ruined Shrine (Outer)': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => (settings.tricks.climbTowerOfLightWithoutMissiles || items.hasMissileCount(8)) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.TOWER_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const gravityReqs = items.has(PrimeItem.GRAVITY_SUIT) || settings.tricks.towerChamberNoGravity;
          return gravityReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Ruined Shrine (Outer)': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Ruined Fountain',
      locations: {
        [PrimeLocation.RUINED_FOUNTAIN]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const bombsReqs = items.canLayBombs() || (settings.tricks.ruinedFountainItemFlaahgraSkip && items.has(PrimeItem.SPACE_JUMP_BOOTS));
          return bombsReqs && items.canSpider();
        }
      },
      exits: {
        'Arboretum': (items: PrimeItemCollection) => items.hasMissiles(),
        'Magma Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return (settings.tricks.crossMagmaPoolSuitless && items.hasCount(PrimeItem.ENERGY_TANK, 2)) || items.hasSuit(settings);
        },
        'Main Plaza': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Magma Pool',
      locations: {
        [PrimeLocation.MAGMA_POOL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const infiniteSpeedReqs = !settings.tricks.crossMagmaPoolSuitless && settings.tricks.magmaPoolItemWithIS && items.canInfiniteSpeed(); // need to have the suit requirement
          const grappleReqs = ((settings.tricks.crossMagmaPoolWithoutGrapple || settings.tricks.crossMagmaPoolSuitless) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.has(PrimeItem.GRAPPLE_BEAM);
          return (grappleReqs && items.canLayPowerBombs()) || infiniteSpeedReqs;
        }
      },
      exits: {
        'Training Chamber Access': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = ((settings.tricks.crossMagmaPoolWithoutGrapple || settings.tricks.crossMagmaPoolSuitless) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReqs && items.has(PrimeItem.WAVE_BEAM);
        },
        'Ruined Fountain': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Training Chamber Access',
      locations: {
        [PrimeLocation.TRAINING_CHAMBER_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Training Chamber': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Magma Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReqs = ((settings.tricks.crossMagmaPoolWithoutGrapple || settings.tricks.crossMagmaPoolSuitless) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || items.has(PrimeItem.GRAPPLE_BEAM);
          const suitReqs = (settings.tricks.crossMagmaPoolSuitless && items.hasCount(PrimeItem.ENERGY_TANK, 2)) || items.hasSuit(settings);
          return grappleReqs && suitReqs && items.has(PrimeItem.WAVE_BEAM);
        },
      }
    },
    {
      name: 'Training Chamber',
      locations: {
        [PrimeLocation.TRAINING_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostSpiderReqs = (settings.tricks.trainingChamberAndAccessOobWallcrawl && items.has(PrimeItem.SPACE_JUMP_BOOTS))
            || (items.canBoost() && items.canSpider());
          return items.canLayBombs() && boostSpiderReqs;
        }
      },
      exits: {
        'Training Chamber Access': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Main Plaza': (items: PrimeItemCollection) => items.canLayBombs() && items.canBoost(),
        'Main Plaza Grapple Ledge': (items: PrimeItemCollection) => items.canLayBombs() && items.canBoost() && items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Arboretum',
      exits: {
        'Gathering Hall': (items: PrimeItemCollection) => items.hasMissiles(),
        'Sunchamber': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const scanReqs = items.has(PrimeItem.SCAN_VISOR) || settings.tricks.arboretumPuzzleSkip;
          return scanReqs && items.hasMissiles() && items.canLayBombs();
        },
        'Ruined Fountain': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Sunchamber',
      locations: {
        [PrimeLocation.SUNCHAMBER_FLAAHGRA]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.SUNCHAMBER_GHOSTS]: (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.canFireSuperMissiles()
      },
      exits: {
        [Elevator.CHOZO_NORTH]: (items: PrimeItemCollection) => items.canLayBombs(),
        'Arboretum': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs() && items.canSpider()
          && items.canFireSuperMissiles()
      }
    },
    {
      name: 'Gathering Hall',
      locations: {
        [PrimeLocation.GATHERING_HALL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const powerBombReqs = settings.tricks.destroyBombCoversWithPowerBombs && items.canLayPowerBombs();
          return (items.canLayBombs() || powerBombReqs) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Watery Hall Access': () => true,
        'Energy Core': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Arboretum': (items: PrimeItemCollection) => items.hasMissiles(),
        // OOB only
        'Reflecting Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) =>
          settings.tricks.iceBeamBeforeFlaahgraOobWallcrawl && items.canWallcrawl(settings)
      }
    },
    {
      name: 'Watery Hall Access',
      locations: {
        [PrimeLocation.WATERY_HALL_ACCESS]: (items: PrimeItemCollection) => items.hasMissiles()
      },
      exits: {
        'Watery Hall': (items: PrimeItemCollection) => items.hasMissiles(),
        'Gathering Hall': () => true
      }
    },
    {
      name: 'Watery Hall',
      locations: {
        [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: (items: PrimeItemCollection) => items.has(PrimeItem.SCAN_VISOR),
        [PrimeLocation.WATERY_HALL_UNDERWATER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const bombsReqs = items.canLayBombs() || settings.tricks.wateryHallUnderwaterFlaahgraSkip;
          const gravityReqs = items.has(PrimeItem.GRAVITY_SUIT) || settings.tricks.wateryHallUnderwaterSlopeJump;
          return bombsReqs && gravityReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        }
      },
      exits: {
        'Dynamo': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const powerBombReqs = settings.tricks.destroyBombCoversWithPowerBombs && items.canLayPowerBombs();
          return items.hasMissiles() && (items.canLayBombs() || powerBombReqs) && items.has(PrimeItem.SCAN_VISOR);
        },
        'Watery Hall Access': (items: PrimeItemCollection) => items.hasMissiles(),
      }
    },
    {
      name: 'Dynamo',
      locations: {
        [PrimeLocation.DYNAMO_LOWER]: (items: PrimeItemCollection) => items.hasMissiles(),
        [PrimeLocation.DYNAMO_SPIDER_TRACK]: (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Watery Hall': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombsOrPowerBombs(),
      }
    },
    {
      name: 'Energy Core',
      exits: {
        'Burn Dome': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          if (settings.pointOfNoReturnItems === PointOfNoReturnItems.ALLOW_ALL) {
            return items.has(PrimeItem.MORPH_BALL);
          }

          return items.canLayBombs();
        },
        'Furnace (Spider Track and Tunnel)': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Burn Dome',
      locations: {
        [PrimeLocation.BURN_DOME_I_DRONE]: () => true,
        [PrimeLocation.BURN_DOME_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const powerBombReqs = settings.tricks.destroyBombCoversWithPowerBombs && items.canLayPowerBombs();
          return items.canLayBombs() || powerBombReqs;
        }
      },
      exits: {
        'Energy Core': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Furnace (Spider Track and Tunnel)',
      locations: {
        [PrimeLocation.FURNACE_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Furnace (Main Room)': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const boostOrBombsReqs = items.canLayBombs() || (settings.tricks.boostThroughBombTunnels && items.canBoost());
          const spiderReqs = items.canSpider() || settings.tricks.furnaceAccessWithoutSpider;
          return spiderReqs && boostOrBombsReqs;
        },
        'Energy Core': () => true
      }
    },
    {
      name: 'Furnace (Main Room)',
      locations: {
        [PrimeLocation.FURNACE_SPIDER_TRACKS]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const normalReqs = items.canLayPowerBombs() && items.canBoost() && items.canSpider();
          const hbjReqs = settings.tricks.furnaceSpiderTrackItemHBJ && items.canSpider();
          const spaceJumpReqs = settings.tricks.furnaceSpiderTrackItemSpaceJumpBombs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return items.canLayBombs() && (normalReqs || hbjReqs || spaceJumpReqs);
        }
      },
      exits: {
        'Crossway': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM),
        'Hall of the Elders': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Furnace (Spider Track and Tunnel)': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Crossway',
      locations: {
        [PrimeLocation.CROSSWAY]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const fewerReqs = settings.tricks.crosswayItemFewerReqs && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          const normalReqs = items.canBoost() && items.canSpider() && items.canFireSuperMissiles() && items.has(PrimeItem.SCAN_VISOR);
          return fewerReqs || normalReqs;
        }
      },
      exits: {
        'Hall of the Elders': (items: PrimeItemCollection) => (items.canBoost() && items.hasMissiles())
          || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)),
        'Furnace (Main Room)': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Hall of the Elders',
      locations: {
        [PrimeLocation.HALL_OF_THE_ELDERS]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const infiniteSpeedReqs = settings.tricks.hallOfTheEldersItemsWithIS && items.canInfiniteSpeed()
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          const spiderReqs = items.canSpider() || settings.tricks.hallOfTheEldersBombSlotsWithoutSpider;
          return (items.canLayBombs() && spiderReqs && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || infiniteSpeedReqs;
        },
        [PrimeLocation.ELDER_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const infiniteSpeedReqs = settings.tricks.hallOfTheEldersItemsWithIS && items.canInfiniteSpeed()
            && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          const spiderReqs = items.canSpider() || settings.tricks.hallOfTheEldersBombSlotsWithoutSpider;
          return (items.canLayBombs() && spiderReqs && items.has(PrimeItem.ICE_BEAM)
            && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) || infiniteSpeedReqs;
        },
      },
      exits: {
        'Reflecting Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = items.canSpider() || settings.tricks.hallOfTheEldersBombSlotsWithoutSpider;
          const waveReqs = items.has(PrimeItem.WAVE_BEAM) || settings.tricks.reflectingPoolAccessWithoutWaveBeam;
          return items.canLayBombs() && spiderReqs && waveReqs && items.has(PrimeItem.SPACE_JUMP_BOOTS);
        },
        'Crossway': (items: PrimeItemCollection) => (items.canBoost() && items.hasMissiles())
          || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)),
        'Energy Core': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Reflecting Pool',
      exits: {
        'Antechamber': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const baseReqs = items.canBoost() && items.canLayBombs() && items.hasMissiles();

          if (settings.pointOfNoReturnItems !== PointOfNoReturnItems.DO_NOT_ALLOW) {
            return baseReqs;
          }

          return baseReqs && items.has(PrimeItem.ICE_BEAM);
        },
        [Elevator.CHOZO_EAST]: (items: PrimeItemCollection) => {
          return items.canBoost() && items.canLayBombs() && items.hasMissiles();
        },
        [Elevator.CHOZO_SOUTH]: (items: PrimeItemCollection) => items.canBoost() && items.canLayBombs() && items.has(PrimeItem.ICE_BEAM),
        'Hall of the Elders': (items: PrimeItemCollection) => items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Antechamber',
      locations: {
        [PrimeLocation.ANTECHAMBER]: () => true,
      },
      exits: {
        'Reflecting Pool': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: Elevator.CHOZO_WEST,
      exits: {
        [Elevator.TALLON_NORTH]: () => true,
        'Main Plaza': () => true
      }
    },
    {
      name: Elevator.CHOZO_NORTH,
      exits: {
        [Elevator.MAGMOOR_NORTH]: () => true,
        'Transport Access North': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs(),
        'Vault': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Sunchamber': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.canFireSuperMissiles()
      }
    },
    {
      name: Elevator.CHOZO_EAST,
      exits: {
        [Elevator.TALLON_EAST]: () => true,
        'Reflecting Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return items.hasMissiles() && (canBoost || items.canLayBombs());
        }
      }
    },
    {
      name: Elevator.CHOZO_SOUTH,
      exits: {
        [Elevator.TALLON_SOUTH_CHOZO]: () => true,
        'Reflecting Pool': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    }
  ];

  return regions;
};

import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function chozoRuins(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Main Plaza',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: (items: PrimeItemCollection) => items.canBoost() || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => (settings.tricks.mainPlazaItemsOnlySpaceJump || items.has(PrimeItem.GRAPPLE_BEAM))
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.MAIN_PLAZA_TREE]: (items: PrimeItemCollection) => items.canFireSuperMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Ruined Nursery': () => true,
        'Ruined Fountain': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Main Plaza Locked Door Ledge': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjOnlyReqs = settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return sjOnlyReqs || (items.hasMissiles() && items.has(PrimeItem.MORPH_BALL));
        },
        'Chozo Transport West': () => true
      }
    },
    {
      name: 'Main Plaza Locked Door Ledge',
      locations: {
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: () => true
      },
      exits: {
        'Main Plaza': () => true
        // Vault door is locked
      }
    },
    {
      name: 'Ruined Nursery',
      locations: {
        [PrimeLocation.RUINED_NURSERY]: (items: PrimeItemCollection) => items.canLayBombs()
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
        'Chozo Transport North': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
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
        'Chozo Transport North': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Ruined Shrine (Outer)',
      locations: {
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: (items: PrimeItemCollection) => items.canBoost()
      },
      exits: {
        'Ruined Shrine (Pit)': () => true,
        'Tower of Light': (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM),
        'Main Plaza': (items: PrimeItemCollection) => items.hasMissiles()
      }
    },
    {
      name: 'Ruined Shrine (Pit)',
      locations: {
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: () => true,
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombsOrPowerBombs()
      },
      exits: {
        'Ruined Shrine (Outer)': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS)
      }
    },
    {
      name: 'Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: (items: PrimeItemCollection) => items.hasMissileCount(8) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.TOWER_CHAMBER]: (items: PrimeItemCollection) => items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Ruined Shrine (Outer)': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Ruined Fountain',
      locations: {
        [PrimeLocation.RUINED_FOUNTAIN]: (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider()
      },
      exits: {
        'Magma Pool': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.hasSuit(settings),
        'Main Plaza': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Magma Pool',
      locations: {
        [PrimeLocation.MAGMA_POOL]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.has(PrimeItem.GRAPPLE_BEAM)
      },
      exits: {
        'Training Chamber Access': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.WAVE_BEAM),
        'Ruined Fountain': (items: PrimeItemCollection) => items.has(PrimeItem.GRAPPLE_BEAM)
      }
    },
    {
      name: 'Training Chamber Access',
      locations: {
        [PrimeLocation.TRAINING_CHAMBER_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL)
      },
      exits: {
        'Training Chamber': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => items.hasSuit(settings) && items.has(PrimeItem.WAVE_BEAM),
        'Magma Pool': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Training Chamber',
      locations: {
        [PrimeLocation.TRAINING_CHAMBER]: (items: PrimeItemCollection) => items.canLayBombs() && items.canBoost() && items.canSpider()
      },
      exits: {
        'Training Chamber Access': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Main Plaza': (items: PrimeItemCollection) => items.canLayBombs() && items.canBoost()
      }
    },
    {
      name: 'Arboretum',
      exits: {
        'Gathering Hall': (items: PrimeItemCollection) => items.hasMissiles(),
        'Sunchamber': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs(),
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
        'Chozo Transport North': (items: PrimeItemCollection) => items.canLayBombs(),
        'Arboretum': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs() && items.canSpider()
          && items.canFireSuperMissiles()
      }
    },
    {
      name: 'Gathering Hall',
      locations: {
        [PrimeLocation.GATHERING_HALL]: (items: PrimeItemCollection) => items.canLayBombsOrPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Watery Hall Access': () => true,
        'Energy Core': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Arboretum': (items: PrimeItemCollection) => items.hasMissiles()
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
        [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: () => true,
        [PrimeLocation.WATERY_HALL_UNDERWATER]: (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      },
      exits: {
        'Dynamo': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombsOrPowerBombs(),
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
        'Burn Dome': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Furnace (Spider Track and Tunnel)': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Burn Dome',
      locations: {
        [PrimeLocation.BURN_DOME_I_DRONE]: () => true,
        [PrimeLocation.BURN_DOME_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombsOrPowerBombs()
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
        'Furnace (Main Room)': (items: PrimeItemCollection) => items.canSpider() && items.canLayBombs(),
        'Energy Core': () => true
      }
    },
    {
      name: 'Furnace (Main Room)',
      locations: {
        [PrimeLocation.FURNACE_SPIDER_TRACKS]: (items: PrimeItemCollection) => items.canLayPowerBombs() && items.canLayBombs()
          && items.canBoost() && items.canSpider()
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
        [PrimeLocation.CROSSWAY]: (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.canFireSuperMissiles()
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
        [PrimeLocation.HALL_OF_THE_ELDERS]: (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.has(PrimeItem.ICE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.ELDER_CHAMBER]: (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.has(PrimeItem.ICE_BEAM)
          && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS),
      },
      exits: {
        'Reflecting Pool': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Crossway': (items: PrimeItemCollection) => (items.canBoost() && items.hasMissiles())
          || (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.ICE_BEAM)),
        'Energy Core': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Reflecting Pool',
      exits: {
        'Antechamber': (items: PrimeItemCollection) => items.canBoost() && items.hasMissiles(),
        'Chozo Transport East': (items: PrimeItemCollection) => items.canBoost() && items.hasMissiles() && items.canLayBombs(),
        'Chozo Transport South': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.ICE_BEAM),
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
      name: 'Chozo Transport West',
      exits: {
        'Tallon Transport North': () => true,
        'Main Plaza': () => true
      }
    },
    {
      name: 'Chozo Transport North',
      exits: {
        'Magmoor Transport North': () => true,
        'Transport Access North': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs(),
        'Vault': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Sunchamber': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.canFireSuperMissiles()
      }
    },
    {
      name: 'Chozo Transport East',
      exits: {
        'Tallon Transport East': () => true,
        'Reflecting Pool': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs()
      }
    },
    {
      name: 'Chozo Transport South',
      exits: {
        'Tallon Transport South (Chozo)': () => true,
        'Reflecting Pool': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    }
  ];

  return regions;
};

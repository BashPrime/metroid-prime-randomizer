import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function chozoRuins(settings: PrimeRandomizerSettings): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Chozo West',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: () => true,
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: () => true,
        [PrimeLocation.MAIN_PLAZA_TREE]: () => true,
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: () => true,
        [PrimeLocation.RUINED_NURSERY]: () => true,
        [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: () => true,
        [PrimeLocation.RUINED_GALLERY_TUNNEL]: () => true,
        [PrimeLocation.HIVE_TOTEM]: () => true,
        [PrimeLocation.TRANSPORT_ACCESS_NORTH]: () => true
      },
      exits: {
        'Tallon North': () => true,
        'Chozo Ruined Shrine': () => true,
        'Chozo Sun Tower': () => true
      }
    },
    {
      name: 'Chozo Ruined Shrine',
      locations: {
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: () => true,
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: () => true,
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: () => true
      },
      exits: {
        'Chozo West': () => true,
        'Chozo Tower of Light': () => true
      }
    },
    {
      name: 'Chozo Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: () => true,
        [PrimeLocation.TOWER_CHAMBER]: () => true
      },
      exits: {
        'Chozo Ruined Shrine': () => true,
      }
    },
    {
      name: 'Chozo Ruined Fountain',
      locations: {
        [PrimeLocation.RUINED_FOUNTAIN]: () => true        
      },
      exits: {
        'Chozo West': () => true,
        'Chozo Central': () => true,
        'Chozo Training Area': () => true
      }
    },
    {
      name: 'Chozo Training Area',
      locations: {
        [PrimeLocation.MAGMA_POOL]: () => true,    
        [PrimeLocation.TRAINING_CHAMBER]: () => true,
        [PrimeLocation.TRAINING_CHAMBER_ACCESS]: () => true
      },
      exits: {
        'Chozo Ruined Fountain': () => true,
        'Chozo West': () => true
      }
    },
    {
      name: 'Chozo Central',
      locations: {
        [PrimeLocation.WATERY_HALL_ACCESS]: () => true,
        [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: () => true,
        [PrimeLocation.WATERY_HALL_UNDERWATER]: () => true,
        [PrimeLocation.GATHERING_HALL]: () => true,
        [PrimeLocation.BURN_DOME_I_DRONE]: () => true,
        [PrimeLocation.BURN_DOME_TUNNEL]: () => true,
        [PrimeLocation.FURNACE_TUNNEL]: () => true
      },
      exits: {
        'Chozo Ruined Fountain': () => true,
        'Chozo Dynamo': () => true,
        'Chozo Furnace': () => true
      }
    },
    {
      name: 'Chozo Dynamo',
      locations: {
        [PrimeLocation.DYNAMO_LOWER]: () => true,
        [PrimeLocation.DYNAMO_SPIDER_TRACK]: () => true,
      },
      exits: {
        'Chozo Central': () => true
      }
    },
    {
      name: 'Chozo Sun Tower',
      locations: {
        [PrimeLocation.VAULT]: () => true
      },
      exits: {
        'Chozo West': () => true,
        'Chozo Sunchamber': () => true,
        'Magmoor Lava Lake': () => true
      }
    },
    {
      name: 'Chozo Sunchamber',
      locations: {
        [PrimeLocation.SUNCHAMBER_FLAAHGRA]: () => true,
        [PrimeLocation.SUNCHAMBER_GHOSTS]: () => true,
      },
      exits: {
        'Chozo Sun Tower': () => true,
        'Chozo Central': () => true
      }
    },
    {
      name: 'Chozo Furnace',
      locations: {
        [PrimeLocation.FURNACE_SPIDER_TRACKS]: () => true
      },
      exits: {
        'Chozo Central': () => true,
        'Chozo Hall of the Elders': () => true
      }
    },
    {
      name: 'Chozo Hall of the Elders',
      locations: {
        [PrimeLocation.CROSSWAY]: () => true,
        [PrimeLocation.HALL_OF_THE_ELDERS]: () => true,
        [PrimeLocation.ELDER_CHAMBER]: () => true
      },
      exits: {
        'Chozo Furnace': () => true,
        'Chozo Reflecting Pool': () => true
      }
    },
    {
      name: 'Chozo Reflecting Pool',
      locations: {
        [PrimeLocation.CROSSWAY]: () => true,
        [PrimeLocation.HALL_OF_THE_ELDERS]: () => true,
        [PrimeLocation.ELDER_CHAMBER]: () => true
      },
      exits: {
        'Chozo Hall of the Elders': () => true,
        'Chozo Antechamber': () => true,
        'Tallon Overgrown Cavern': () => true,
        'Tallon South Upper': () => true
      }
    },
    {
      name: 'Chozo Antechamber',
      locations: {
        [PrimeLocation.ANTECHAMBER]: () => true
      },
      exits: {
        'Chozo Reflecting Pool': () => true
      }
    }
  ];

  return regions;
};

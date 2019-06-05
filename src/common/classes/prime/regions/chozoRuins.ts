import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';

export function chozoRuins(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Chozo Main Plaza',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: () => true,
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: () => true,
        [PrimeLocation.MAIN_PLAZA_TREE]: () => true,
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: () => true,
        [PrimeLocation.RUINED_FOUNTAIN]: () => true,
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: () => true,
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: () => true,
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: () => true,
        [PrimeLocation.VAULT]: () => true,
        [PrimeLocation.TRAINING_CHAMBER]: () => true,
        [PrimeLocation.RUINED_NURSERY]: () => true,
        [PrimeLocation.TRAINING_CHAMBER_ACCESS]: () => true,
        [PrimeLocation.MAGMA_POOL]: () => true,
        [PrimeLocation.TOWER_OF_LIGHT]: () => true,
        [PrimeLocation.TOWER_CHAMBER]: () => true,
        [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: () => true,
        [PrimeLocation.RUINED_GALLERY_TUNNEL]: () => true,
        [PrimeLocation.TRANSPORT_ACCESS_NORTH]: () => true,
        [PrimeLocation.GATHERING_HALL]: () => true,
        [PrimeLocation.HIVE_TOTEM]: () => true,
        [PrimeLocation.SUNCHAMBER_FLAAHGRA]: () => true,
        [PrimeLocation.SUNCHAMBER_GHOSTS]: () => true,
        [PrimeLocation.WATERY_HALL_ACCESS]: () => true,
        [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: () => true,
        [PrimeLocation.WATERY_HALL_UNDERWATER]: () => true,
        [PrimeLocation.DYNAMO_LOWER]: () => true,
        [PrimeLocation.DYNAMO_SPIDER_TRACK]: () => true,
        [PrimeLocation.BURN_DOME_TUNNEL]: () => true,
        [PrimeLocation.BURN_DOME_I_DRONE]: () => true,
        [PrimeLocation.FURNACE_SPIDER_TRACKS]: () => true,
        [PrimeLocation.FURNACE_TUNNEL]: () => true,
        [PrimeLocation.HALL_OF_THE_ELDERS]: () => true,
        [PrimeLocation.CROSSWAY]: () => true,
        [PrimeLocation.ELDER_CHAMBER]: () => true,
        [PrimeLocation.ANTECHAMBER]: () => true
      },
      exits: {
        'Tallon North': () => true,
        'Chozo Ruined Shrine': (items: PrimeItemCollection) => items.hasMissiles()
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
        'Chozo Main Plaza': () => true,
        'Chozo Tower of Light': (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Chozo Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: () => true,
        [PrimeLocation.TOWER_CHAMBER]: () => true
      },
      exits: {
        'Chozo Ruined Shrine': () => true
      }
    }
  ];

  return regions;
};

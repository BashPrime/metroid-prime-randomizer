import { Region } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { Location } from '../../location';
import { PrimeItemCollection } from '../itemCollection';

export function chozoRuins(): Region[] {
  const regions = [
    new Region({
      name: 'Chozo Main Plaza',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: new Location(PrimeLocation.MAIN_PLAZA_HALF_PIPE, 0),
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: new Location(PrimeLocation.ALCOVE, 1),
        [PrimeLocation.MAIN_PLAZA_TREE]: new Location(PrimeLocation.FRIGATE_CRASH_SITE, 2),
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: new Location(PrimeLocation.MAIN_PLAZA_LOCKED_DOOR, 3),
        // [PrimeLocation.RUINED_FOUNTAIN]: new Location(PrimeLocation.RUINED_FOUNTAIN, 4),
        // [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: new Location(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE, 5),
        // [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: new Location(PrimeLocation.RUINED_SHRINE_HALF_PIPE, 6),
        // [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: new Location(PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL, 7),
        [PrimeLocation.VAULT]: new Location(PrimeLocation.VAULT, 8),
        // [PrimeLocation.TRAINING_CHAMBER]: new Location(PrimeLocation.TRAINING_CHAMBER, 9),
        [PrimeLocation.RUINED_NURSERY]: new Location(PrimeLocation.RUINED_NURSERY, 10),
        // [PrimeLocation.TRAINING_CHAMBER_ACCESS]: new Location(PrimeLocation.TRAINING_CHAMBER_ACCESS, 11),
        // [PrimeLocation.MAGMA_POOL]: new Location(PrimeLocation.MAGMA_POOL, 12),
        // [PrimeLocation.TOWER_OF_LIGHT]: new Location(PrimeLocation.TOWER_OF_LIGHT, 13),
        // [PrimeLocation.TOWER_CHAMBER]: new Location(PrimeLocation.TOWER_CHAMBER, 14),
        [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: new Location(PrimeLocation.RUINED_GALLERY_MISSILE_WALL, 15),
        [PrimeLocation.RUINED_GALLERY_TUNNEL]: new Location(PrimeLocation.RUINED_GALLERY_TUNNEL, 16),
        [PrimeLocation.TRANSPORT_ACCESS_NORTH]: new Location(PrimeLocation.TRANSPORT_ACCESS_NORTH, 17),
        // [PrimeLocation.GATHERING_HALL]: new Location(PrimeLocation.GATHERING_HALL, 18),
        [PrimeLocation.HIVE_TOTEM]: new Location(PrimeLocation.HIVE_TOTEM, 19),
        // [PrimeLocation.SUNCHAMBER_FLAAHGRA]: new Location(PrimeLocation.SUNCHAMBER_FLAAHGRA, 20),
        // [PrimeLocation.SUNCHAMBER_GHOSTS]: new Location(PrimeLocation.SUNCHAMBER_GHOSTS, 21),
        // [PrimeLocation.WATERY_HALL_ACCESS]: new Location(PrimeLocation.WATERY_HALL_ACCESS, 22),
        // [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: new Location(PrimeLocation.WATERY_HALL_SCAN_PUZZLE, 23),
        // [PrimeLocation.WATERY_HALL_UNDERWATER]: new Location(PrimeLocation.WATERY_HALL_UNDERWATER, 24),
        // [PrimeLocation.DYNAMO_LOWER]: new Location(PrimeLocation.DYNAMO_LOWER, 25),
        // [PrimeLocation.DYNAMO_SPIDER_TRACK]: new Location(PrimeLocation.DYNAMO_SPIDER_TRACK, 26),
        // [PrimeLocation.BURN_DOME_TUNNEL]: new Location(PrimeLocation.BURN_DOME_TUNNEL, 27),
        // [PrimeLocation.BURN_DOME_I_DRONE]: new Location(PrimeLocation.BURN_DOME_I_DRONE, 28),
        // [PrimeLocation.FURNACE_SPIDER_TRACKS]: new Location(PrimeLocation.FURNACE_SPIDER_TRACKS, 29),
        // [PrimeLocation.FURNACE_TUNNEL]: new Location(PrimeLocation.FURNACE_TUNNEL, 30),
        // [PrimeLocation.HALL_OF_THE_ELDERS]: new Location(PrimeLocation.HALL_OF_THE_ELDERS, 31),
        // [PrimeLocation.CROSSWAY]: new Location(PrimeLocation.CROSSWAY, 32),
        // [PrimeLocation.ELDER_CHAMBER]: new Location(PrimeLocation.ELDER_CHAMBER, 33),
        // [PrimeLocation.ANTECHAMBER]: new Location(PrimeLocation.ANTECHAMBER, 34)
      },
      exits: {
        'Tallon North': () => true,
        'Chozo Ruined Shrine': (items: PrimeItemCollection) => items.hasMissiles()
      }
    }),
    new Region({
      name: 'Chozo Ruined Shrine',
      locations: {
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: new Location(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE, 5),
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: new Location(PrimeLocation.RUINED_SHRINE_HALF_PIPE, 6),
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: new Location(PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL, 7)
      },
      exits: {
        'Chozo Main Plaza': () => true,
        'Chozo Tower of Light': (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM)
      }
    }),
    new Region({
      name: 'Chozo Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: new Location(PrimeLocation.TOWER_OF_LIGHT, 13),
        [PrimeLocation.TOWER_CHAMBER]: new Location(PrimeLocation.TOWER_CHAMBER, 14)
      },
      exits: {
        'Chozo Ruined Shrine': () => true
      }
    })
  ];

  return regions;
};

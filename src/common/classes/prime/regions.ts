import { Region } from '../region';
import { Location } from '../location';
import { PrimeLocation } from '../../enums/primeLocation';
import { primeItems } from './items';
import { PrimeItem } from '../../enums/primeItem';
import { ItemCollection } from '../itemCollection';

export function primeRegions() {
  return {
    'Tallon Overworld': tallonOverworld(),
    'Chozo Ruins': chozoRuins(),
    'Magmoor Caverns': magmoorCaverns(),
    'Phendrana Drifts': phendranaDrifts(),
    'Phazon Mines': phazonMines()
  };
}

export function tallonOverworld() {
  const tallon = new Region({
    name: 'Tallon Overworld',
    locations: {
      [PrimeLocation.LANDING_SITE]: new Location(PrimeLocation.LANDING_SITE, 58),
      [PrimeLocation.ALCOVE]: new Location(PrimeLocation.ALCOVE, 59),
      [PrimeLocation.FRIGATE_CRASH_SITE]: new Location(PrimeLocation.FRIGATE_CRASH_SITE, 60),
      [PrimeLocation.OVERGROWN_CAVERN]: new Location(PrimeLocation.OVERGROWN_CAVERN, 61),
      [PrimeLocation.ROOT_CAVE]: new Location(PrimeLocation.ROOT_CAVE, 62),
      [PrimeLocation.ARTIFACT_TEMPLE]: new Location(PrimeLocation.ARTIFACT_TEMPLE, 63),
      [PrimeLocation.TRANSPORT_TUNNEL_B]: new Location(PrimeLocation.TRANSPORT_TUNNEL_B, 64),
      [PrimeLocation.ARBOR_CHAMBER]: new Location(PrimeLocation.ARBOR_CHAMBER, 65),
      [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA]: new Location(PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA, 66),
      [PrimeLocation.BIOHAZARD_CONTAINMENT]: new Location(PrimeLocation.BIOHAZARD_CONTAINMENT, 67),
      [PrimeLocation.HYDRO_ACCESS_TUNNEL]: new Location(PrimeLocation.HYDRO_ACCESS_TUNNEL, 68),
      [PrimeLocation.GREAT_TREE_CHAMBER]: new Location(PrimeLocation.GREAT_TREE_CHAMBER, 69),
      [PrimeLocation.LIFE_GROVE_TUNNEL]: new Location(PrimeLocation.LIFE_GROVE_TUNNEL, 70),
      [PrimeLocation.LIFE_GROVE_START]: new Location(PrimeLocation.LIFE_GROVE_START, 71),
      [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER]: new Location(PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER, 72)
    }
  });

  return tallon;
};

export function chozoRuins() {
  const chozo = new Region({
    name: 'Chozo Ruins',
    locations: {
      [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: new Location(PrimeLocation.MAIN_PLAZA_HALF_PIPE, 0),
      [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: new Location(PrimeLocation.ALCOVE, 1),
      [PrimeLocation.MAIN_PLAZA_TREE]: new Location(PrimeLocation.FRIGATE_CRASH_SITE, 2),
      [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: new Location(PrimeLocation.MAIN_PLAZA_LOCKED_DOOR, 3),
      [PrimeLocation.RUINED_FOUNTAIN]: new Location(PrimeLocation.RUINED_FOUNTAIN, 4),
      [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: new Location(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE, 5),
      [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: new Location(PrimeLocation.RUINED_SHRINE_HALF_PIPE, 6),
      [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: new Location(PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL, 7),
      [PrimeLocation.VAULT]: new Location(PrimeLocation.VAULT, 8),
      [PrimeLocation.TRAINING_CHAMBER]: new Location(PrimeLocation.TRAINING_CHAMBER, 9),
      [PrimeLocation.RUINED_NURSERY]: new Location(PrimeLocation.RUINED_NURSERY, 10),
      [PrimeLocation.TRAINING_CHAMBER_ACCESS]: new Location(PrimeLocation.TRAINING_CHAMBER_ACCESS, 11),
      [PrimeLocation.MAGMA_POOL]: new Location(PrimeLocation.MAGMA_POOL, 12),
      [PrimeLocation.TOWER_OF_LIGHT]: new Location(PrimeLocation.TOWER_OF_LIGHT, 13),
      [PrimeLocation.TOWER_CHAMBER]: new Location(PrimeLocation.TOWER_CHAMBER, 14),
      [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: new Location(PrimeLocation.RUINED_GALLERY_MISSILE_WALL, 15),
      [PrimeLocation.RUINED_GALLERY_TUNNEL]: new Location(PrimeLocation.RUINED_GALLERY_TUNNEL, 16),
      [PrimeLocation.TRANSPORT_ACCESS_NORTH]: new Location(PrimeLocation.TRANSPORT_ACCESS_NORTH, 17),
      [PrimeLocation.GATHERING_HALL]: new Location(PrimeLocation.GATHERING_HALL, 18),
      [PrimeLocation.HIVE_TOTEM]: new Location(PrimeLocation.HIVE_TOTEM, 19),
      [PrimeLocation.SUNCHAMBER_FLAAHGRA]: new Location(PrimeLocation.SUNCHAMBER_FLAAHGRA, 20),
      [PrimeLocation.SUNCHAMBER_GHOSTS]: new Location(PrimeLocation.SUNCHAMBER_GHOSTS, 21),
      [PrimeLocation.WATERY_HALL_ACCESS]: new Location(PrimeLocation.WATERY_HALL_ACCESS, 22),
      [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: new Location(PrimeLocation.WATERY_HALL_SCAN_PUZZLE, 23),
      [PrimeLocation.WATERY_HALL_UNDERWATER]: new Location(PrimeLocation.WATERY_HALL_UNDERWATER, 24),
      [PrimeLocation.DYNAMO_LOWER]: new Location(PrimeLocation.DYNAMO_LOWER, 25),
      [PrimeLocation.DYNAMO_SPIDER_TRACK]: new Location(PrimeLocation.DYNAMO_SPIDER_TRACK, 26),
      [PrimeLocation.BURN_DOME_TUNNEL]: new Location(PrimeLocation.BURN_DOME_TUNNEL, 27),
      [PrimeLocation.BURN_DOME_I_DRONE]: new Location(PrimeLocation.BURN_DOME_I_DRONE, 28),
      [PrimeLocation.FURNACE_SPIDER_TRACKS]: new Location(PrimeLocation.FURNACE_SPIDER_TRACKS, 29),
      [PrimeLocation.FURNACE_TUNNEL]: new Location(PrimeLocation.FURNACE_TUNNEL, 30),
      [PrimeLocation.HALL_OF_THE_ELDERS]: new Location(PrimeLocation.HALL_OF_THE_ELDERS, 31),
      [PrimeLocation.CROSSWAY]: new Location(PrimeLocation.CROSSWAY, 32),
      [PrimeLocation.ELDER_CHAMBER]: new Location(PrimeLocation.ELDER_CHAMBER, 33),
      [PrimeLocation.ANTECHAMBER]: new Location(PrimeLocation.ANTECHAMBER, 34)
    }
  });

  return chozo;
};

export function magmoorCaverns() {
  const magmoor = new Region({
    name: 'Magmoor Caverns',
    locations: {
      [PrimeLocation.LAVA_LAKE]: new Location(PrimeLocation.LAVA_LAKE, 90),
      [PrimeLocation.TRICLOPS_PIT]: new Location(PrimeLocation.TRICLOPS_PIT, 91),
      [PrimeLocation.STORAGE_CAVERN]: new Location(PrimeLocation.STORAGE_CAVERN, 92),
      [PrimeLocation.TRANSPORT_TUNNEL_A]: new Location(PrimeLocation.TRANSPORT_TUNNEL_A, 93),
      [PrimeLocation.WARRIOR_SHRINE]: new Location(PrimeLocation.WARRIOR_SHRINE, 94),
      [PrimeLocation.SHORE_TUNNEL]: new Location(PrimeLocation.SHORE_TUNNEL, 95),
      [PrimeLocation.FIERY_SHORES_MORPH_TRACK]: new Location(PrimeLocation.FIERY_SHORES_MORPH_TRACK, 96),
      [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL]: new Location(PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL, 97),
      [PrimeLocation.PLASMA_PROCESSING]: new Location(PrimeLocation.PLASMA_PROCESSING, 98),
      [PrimeLocation.MAGMOOR_WORKSTATION]: new Location(PrimeLocation.MAGMOOR_WORKSTATION, 99)
    }
  });

  magmoor.setAccessItems([
    new ItemCollection([
      primeItems.variaSuit,
      primeItems.missileExpansion,
      primeItems.morphBall,
      primeItems.morphBallBomb
    ]),
    new ItemCollection([
      primeItems.variaSuit,
      primeItems.missileExpansion,
      primeItems.morphBall,
      primeItems.grappleBeam
    ])
  ]);

  return magmoor;
};

export function phendranaDrifts() {
  const phendrana = new Region({
    name: 'Phendrana Drifts',
    locations: {
      [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE]: new Location(PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE, 35),
      [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK]: new Location(PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK, 36),
      [PrimeLocation.CHOZO_ICE_TEMPLE]: new Location(PrimeLocation.CHOZO_ICE_TEMPLE, 37),
      [PrimeLocation.ICE_RUINS_WEST]: new Location(PrimeLocation.ICE_RUINS_WEST, 38),
      [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]: new Location(PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE, 39),
      [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]: new Location(PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK, 40),
      [PrimeLocation.CHAPEL_OF_THE_ELDERS]: new Location(PrimeLocation.CHAPEL_OF_THE_ELDERS, 41),
      [PrimeLocation.RUINED_COURTYARD]: new Location(PrimeLocation.RUINED_COURTYARD, 42),
      [PrimeLocation.PHENDRANA_CANYON]: new Location(PrimeLocation.PHENDRANA_CANYON, 43),
      [PrimeLocation.QUARANTINE_CAVE]: new Location(PrimeLocation.QUARANTINE_CAVE, 44),
      [PrimeLocation.RESEARCH_LAB_HYDRA]: new Location(PrimeLocation.RESEARCH_LAB_HYDRA, 45),
      [PrimeLocation.QUARANTINE_MONITOR]: new Location(PrimeLocation.QUARANTINE_MONITOR, 46),
      [PrimeLocation.OBSERVATORY]: new Location(PrimeLocation.OBSERVATORY, 47),
      [PrimeLocation.TRANSPORT_ACCESS]: new Location(PrimeLocation.TRANSPORT_ACCESS, 48),
      [PrimeLocation.CONTROL_TOWER]: new Location(PrimeLocation.CONTROL_TOWER, 49),
      [PrimeLocation.RESEARCH_CORE]: new Location(PrimeLocation.RESEARCH_CORE, 50),
      [PrimeLocation.FROST_CAVE]: new Location(PrimeLocation.FROST_CAVE, 51),
      [PrimeLocation.RESEARCH_LAB_AETHER_TANK]: new Location(PrimeLocation.RESEARCH_LAB_AETHER_TANK, 52),
      [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]: new Location(PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK, 53),
      [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: new Location(PrimeLocation.GRAVITY_CHAMBER_UNDERWATER, 54),
      [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]: new Location(PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE, 55),
      [PrimeLocation.STORAGE_CAVE]: new Location(PrimeLocation.STORAGE_CAVE, 56),
      [PrimeLocation.SECURITY_CAVE]: new Location(PrimeLocation.SECURITY_CAVE, 57)
    }
  });

  phendrana.setAccessItems([
    new ItemCollection([
      primeItems.variaSuit,
      primeItems.missileExpansion,
      primeItems.morphBall,
      primeItems.morphBallBomb,
    ]),
    new ItemCollection([
      primeItems.variaSuit,
      primeItems.spaceJumpBoots,
      primeItems.waveBeam,
      primeItems.missileExpansion,
      primeItems.morphBall
    ])
  ]);

  return phendrana;
};

export function phazonMines() {
  const mines = new Region({
    name: 'Phazon Mines',
    locations: {
      [PrimeLocation.MAIN_QUARRY]: new Location(PrimeLocation.MAIN_QUARRY, 73),
      [PrimeLocation.SECURITY_ACCESS_A]: new Location(PrimeLocation.SECURITY_ACCESS_A, 74),
      [PrimeLocation.STORAGE_DEPOT_B]: new Location(PrimeLocation.STORAGE_DEPOT_B, 75),
      [PrimeLocation.STORAGE_DEPOT_A]: new Location(PrimeLocation.STORAGE_DEPOT_A, 76),
      [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: new Location(PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE, 77),
      [PrimeLocation.ELITE_RESEARCH_LASER]: new Location(PrimeLocation.ELITE_RESEARCH_LASER, 78),
      [PrimeLocation.ELITE_CONTROL_ACCESS]: new Location(PrimeLocation.ELITE_CONTROL_ACCESS, 79),
      [PrimeLocation.VENTILATION_SHAFT]: new Location(PrimeLocation.VENTILATION_SHAFT, 80),
      [PrimeLocation.PHAZON_PROCESSING_CENTER]: new Location(PrimeLocation.PHAZON_PROCESSING_CENTER, 81),
      [PrimeLocation.PROCESSING_CENTER_ACCESS]: new Location(PrimeLocation.PROCESSING_CENTER_ACCESS, 82),
      [PrimeLocation.ELITE_QUARTERS]: new Location(PrimeLocation.ELITE_QUARTERS, 83),
      [PrimeLocation.CENTRAL_DYNAMO]: new Location(PrimeLocation.CENTRAL_DYNAMO, 84),
      [PrimeLocation.METROID_QUARANTINE_B]: new Location(PrimeLocation.METROID_QUARANTINE_B, 85),
      [PrimeLocation.METROID_QUARANTINE_A]: new Location(PrimeLocation.METROID_QUARANTINE_A, 86),
      [PrimeLocation.FUNGAL_HALL_B]: new Location(PrimeLocation.FUNGAL_HALL_B, 87),
      [PrimeLocation.PHAZON_MINING_TUNNEL]: new Location(PrimeLocation.PHAZON_MINING_TUNNEL, 88),
      [PrimeLocation.FUNGAL_HALL_ACCESS]: new Location(PrimeLocation.FUNGAL_HALL_ACCESS, 89)
    }
  });

  mines.setAccessItems([
    // Tallon
    new ItemCollection([
      primeItems.waveBeam,
      primeItems.iceBeam,
      primeItems.gravitySuit,
      primeItems.thermalVisor,
      primeItems.spaceJumpBoots,
      primeItems.missileExpansion,
      primeItems.morphBall,
      primeItems.morphBallBomb
    ]),
    // Magmoor
    new ItemCollection([
      primeItems.waveBeam,
      primeItems.iceBeam,
      primeItems.spiderBall,
      primeItems.spaceJumpBoots,
      primeItems.missileExpansion,
      primeItems.morphBall,
      primeItems.morphBallBomb,
      primeItems.powerBomb
    ]),
  ]);

  return mines;
};

import { Region } from '../region';
import { Location } from '../location';
import { PrimeLocation } from '../../enums/primeLocation';
import { primeItems } from './items';
import { PrimeItem } from '../../enums/primeItem';

export default function primeRegions() {
  return {
    'Magmoor Caverns': magmoorCaverns(),
    'Phazon Mines': phazonMines()
  };
}

export function magmoorCaverns() {
  return new Region({
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
    },
    accessItems: []
  });
};

export function phazonMines() {
  return new Region({
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
    },
    accessItems: []
  });
};

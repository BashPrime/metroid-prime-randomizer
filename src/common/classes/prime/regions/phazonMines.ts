import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';

export function phazonMines(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Mines Upper',
      locations: {
        [PrimeLocation.MAIN_QUARRY]: () => true,
        [PrimeLocation.SECURITY_ACCESS_A]: () => true,
        [PrimeLocation.STORAGE_DEPOT_A]: () => true,
        [PrimeLocation.STORAGE_DEPOT_B]: () => true,
        [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: () => true,
        [PrimeLocation.ELITE_RESEARCH_LASER]: () => true
      },
      exits: {
      }
    },
    {
      name: 'Mines Lower',
      locations: {
        [PrimeLocation.ELITE_CONTROL_ACCESS]: () => true,
        [PrimeLocation.VENTILATION_SHAFT]: () => true,
        [PrimeLocation.PHAZON_PROCESSING_CENTER]: () => true,
        [PrimeLocation.CENTRAL_DYNAMO]: () => true,
        [PrimeLocation.METROID_QUARANTINE_A]: () => true
      },
      exits: {
      }
    },
    {
      name: 'Mines Depths',
      locations: {
        [PrimeLocation.FUNGAL_HALL_ACCESS]: () => true,
        [PrimeLocation.METROID_QUARANTINE_B]: () => true,
        [PrimeLocation.PHAZON_MINING_TUNNEL]: () => true,
        [PrimeLocation.FUNGAL_HALL_B]: () => true,
        [PrimeLocation.ELITE_QUARTERS]: () => true,
        [PrimeLocation.PROCESSING_CENTER_ACCESS]: () => true
      },
      exits: {
      }
    }
  ];

  return regions;
};

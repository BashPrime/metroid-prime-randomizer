import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function phazonMines(settings: PrimeRandomizerSettings): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Mines Upper',
      locations: {
        [PrimeLocation.MAIN_QUARRY]: () => true,
        [PrimeLocation.SECURITY_ACCESS_A]: () => true,
        [PrimeLocation.STORAGE_DEPOT_A]: () => true
      },
      exits: {
        'Mines Elite Research': () => true,
        'Tallon South Lower': () => true
      }
    },
    {
      name: 'Mines Elite Research',
      locations: {
        [PrimeLocation.ELITE_RESEARCH_PHAZON_ELITE]: () => true,
        [PrimeLocation.ELITE_RESEARCH_LASER]: () => true
      },
      exits: {
        'Mines Upper': () => true,
        'Mines Ore Processing': () => true
      }
    },
    {
      name: 'Mines Ore Processing',
      locations: {
        [PrimeLocation.STORAGE_DEPOT_B]: () => true
      },
      exits: {
        'Mines Upper': () => true,
        'Mines Central': () => true
        // Don't add Elite Research unless trick is enabled
      }
    },
    {
      name: 'Mines Central',
      locations: {
        [PrimeLocation.ELITE_CONTROL_ACCESS]: () => true,
        [PrimeLocation.PHAZON_PROCESSING_CENTER]: () => true
      },
      exits: {
        'Mines Ore Processing': () => true,
        'Mines Lower': () => true,
        'Magmoor Second Half': () => true
        // Don't add Mines Depths as the exit is initially locked
      }
    },
    {
      name: 'Mines Lower',
      locations: {
        [PrimeLocation.VENTILATION_SHAFT]: () => true,
        [PrimeLocation.CENTRAL_DYNAMO]: () => true,
        [PrimeLocation.METROID_QUARANTINE_A]: () => true
      },
      exits: {
        'Mines Central': () => true,
        'Mines Depths': () => true
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
        'Mines Lower': () => true,
        'Mines Central': () => true
      }
    }
  ];

  return regions;
};

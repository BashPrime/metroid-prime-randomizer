import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function phendranaDrifts(settings: PrimeRandomizerSettings): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Phendrana Shorelines',
      locations: {
        [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE]: () => true,
        [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK]: () => true,
        [PrimeLocation.ICE_RUINS_WEST]: () => true,
        [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE]: () => true,
        [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK]: () => true,
        [PrimeLocation.PHENDRANA_CANYON]: () => true,
      },
      exits: {
        'Phendrana Chozo Ice Temple': () => true,
        'Phendrana Courtyard': () => true,
        'Magmoor First Half': () => true
      }
    },
    {
      name: 'Phendrana Chozo Ice Temple',
      locations: {
        [PrimeLocation.CHOZO_ICE_TEMPLE]: () => true,
        [PrimeLocation.CHAPEL_OF_THE_ELDERS]: () => true
      },
      exits: {
        'Phendrana Shorelines': () => true
      }
    },
    {
      name: 'Phendrana Courtyard',
      locations: {
        [PrimeLocation.RUINED_COURTYARD]: () => true
      },
      exits: {
        'Phendrana Shorelines': () => true,
        'Phendrana Labs First Half': () => true,
        'Phendrana Quarantine Cave': () => true
      }
    },
    {
      name: 'Phendrana Labs First Half',
      locations: {
        [PrimeLocation.RESEARCH_LAB_HYDRA]: () => true,
        [PrimeLocation.OBSERVATORY]: () => true
      },
      exits: {
        'Phendrana Courtyard': () => true,
        'Phendrana Labs Second Half': () => true
      }
    },
    {
      name: 'Phendrana Labs Second Half',
      locations: {
        [PrimeLocation.CONTROL_TOWER]: () => true,
        [PrimeLocation.RESEARCH_CORE]: () => true,
        [PrimeLocation.RESEARCH_LAB_AETHER_TANK]: () => true,
        [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]: () => true
      },
      exits: {
        'Phendrana Labs First Half': () => true,
        'Phendrana Depths': () => true
      }
    },
    {
      name: 'Phendrana Quarantine Cave',
      locations: {
        [PrimeLocation.QUARANTINE_CAVE]: () => true,
        [PrimeLocation.QUARANTINE_MONITOR]: () => true,
      },
      exits: {
        'Phendrana Courtyard': () => true,
        'Phendrana Transport Magmoor South': () => true
      }
    },
    {
      name: 'Phendrana Transport Magmoor South',
      locations: {
      },
      exits: {
        'Phendrana Quarantine Cave': () => true,
        'Phendrana Depths': () => true,
        'Magmoor Second Half': () => true
      }
    },
    {
      name: 'Phendrana Depths',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS]: () => true,
        [PrimeLocation.FROST_CAVE]: () => true,
        [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: () => true,
        [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]: () => true,
        [PrimeLocation.STORAGE_CAVE]: () => true,
        [PrimeLocation.SECURITY_CAVE]: () => true
      },
      exits: {
        'Phendrana Transport Magmoor South': () => true,
        'Phendrana Labs Second Half': () => true
      }
    }
  ];

  return regions;
};

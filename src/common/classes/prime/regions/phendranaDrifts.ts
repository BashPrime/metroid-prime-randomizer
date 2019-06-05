import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';

export function phendranaDrifts(): RegionObject[] {
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
      name: 'Phendrana Mid',
      locations: {
        [PrimeLocation.RUINED_COURTYARD]: () => true,
        [PrimeLocation.RESEARCH_LAB_HYDRA]: () => true,
        [PrimeLocation.OBSERVATORY]: () => true,
        [PrimeLocation.CONTROL_TOWER]: () => true,
        [PrimeLocation.RESEARCH_CORE]: () => true,
        [PrimeLocation.RESEARCH_LAB_AETHER_TANK]: () => true,
        [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK]: () => true
      },
      exits: {
      }
    },
    {
      name: 'Phendrana Quarantine Cave',
      locations: {
        [PrimeLocation.QUARANTINE_CAVE]: () => true,
        [PrimeLocation.QUARANTINE_MONITOR]: () => true,
      },
      exits: {
      }
    },
    {
      name: 'Phendrana Deep',
      locations: {
        [PrimeLocation.TRANSPORT_ACCESS]: () => true,
        [PrimeLocation.FROST_CAVE]: () => true,
        [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER]: () => true,
        [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE]: () => true,
        [PrimeLocation.STORAGE_CAVE]: () => true,
        [PrimeLocation.SECURITY_CAVE]: () => true
      },
      exits: {
      }
    }
  ];

  return regions;
};

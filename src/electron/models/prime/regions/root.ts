import { RegionObject } from '../../region';

export function root() {
  const regions: RegionObject[] = [
    {
      name: 'Root',
      exits: {
        'Landing Site': () => true
      }
    }
  ];

  return regions;
};

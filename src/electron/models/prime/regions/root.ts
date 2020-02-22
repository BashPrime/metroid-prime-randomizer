import { RegionObject } from '../../region';

export function root() {
  const regions: RegionObject[] = [
    {
      name: 'Root',
      exits: {
        'Tallon North': () => true
      }
    }
  ];

  return regions;
};

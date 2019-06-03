import { magmoorCaverns } from '../../../../src/common/classes/prime/regions/magmoorCaverns';
import { PrimeItemCollection } from '../../../../src/common/classes/prime/itemCollection';
import { primeItems } from '../../../../src/common/classes/prime/items';

import { expect } from 'chai';
import 'mocha';

describe('Magmoor Caverns region', () => {
  it('should fill Fiery Shores (Morph Track)', () => {
    const magmoorFieryShoresRegion = magmoorCaverns().getRegionByKey('Magmoor Fiery Shores');
    const items = new PrimeItemCollection([primeItems.morphBall, primeItems.morphBallBomb]);
    const res = magmoorFieryShoresRegion.getLocations()['Fiery Shores (Morph Track)'](items);

    expect(res).to.equal(true);
  });
});

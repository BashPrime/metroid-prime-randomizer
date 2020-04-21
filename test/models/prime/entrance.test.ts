import { expect } from 'chai';
import 'mocha';

import { setUpWorld } from '../../utils';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { ENTRANCE_SEPARATOR } from '../../../src/common/constants';

describe('Entrance', () => {
  it('getOpposite() returns a valid entrance', () => {
    const world = setUpWorld(new PrimeRandomizerSettings());
    const expected = world.getRegionByKey('Tallon Canyon').getExit('Tallon Canyon' + ENTRANCE_SEPARATOR + 'Landing Site');
    const actual = world.getRegionByKey('Landing Site').getExit('Landing Site' + ENTRANCE_SEPARATOR + 'Tallon Canyon').getOpposite();

    expect(actual).to.deep.equal(expected);
  });
});
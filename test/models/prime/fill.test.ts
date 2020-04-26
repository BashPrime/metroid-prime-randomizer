import { expect } from 'chai';
import 'mocha';

import { setUpWorld }from '../../utils';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { PointOfNoReturnItems } from '../../../src/electron/enums/pointOfNoReturnItems';
import { PrimeLocation } from '../../../src/electron/enums/primeLocation';
import { PrimeItem } from '../../../src/electron/enums/primeItem';
import { PrimeItemCollection } from '../../../src/electron/models/prime/itemCollection';
import { primeItems } from '../../../src/electron/models/prime/items';

describe('Fill', () => {
  it('should fill Alcove (PONR: Allow All)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_ALL
    }));

    const alcove = world.getLocationByKey(PrimeLocation.ALCOVE);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.BOOST_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB]
    ]);
    const assumedItemsAfter = new PrimeItemCollection([
      ...assumedItems.toArray(),
      primeItems[PrimeItem.SPACE_JUMP_BOOTS]
    ]);

    expect(alcove.itemRule(assumedItems, world.getSettings())).to.be.true;
  });

  it('should fill Alcove (PONR: Allow Visible)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_VISIBLE
    }));

    const alcove = world.getLocationByKey(PrimeLocation.ALCOVE);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.BOOST_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB]
    ]);

    expect(alcove.itemRule(assumedItems, world.getSettings())).to.be.true;
  });

  it('should fill Alcove (PONR: Do Not Allow)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.DO_NOT_ALLOW
    }));

    const alcove = world.getLocationByKey(PrimeLocation.ALCOVE);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SPACE_JUMP_BOOTS]
    ]);

    expect(alcove.itemRule(assumedItems, world.getSettings())).to.be.true;
  });
});

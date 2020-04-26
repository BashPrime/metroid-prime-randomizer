import { setUpWorld } from '../../utils';
import { primeItems } from '../../../src/electron/models/prime/items';
import { expect } from 'chai';
import 'mocha';
import { PrimeRandomizerSettings } from '../../../src/electron/models/prime/randomizerSettings';
import { PrimeWorld } from '../../../src/electron/models/prime/world';
import { PrimeItemCollection } from '../../../src/electron/models/prime/itemCollection';
import { PrimeLocation } from '../../../src/electron/enums/primeLocation';
import { ENTRANCE_SEPARATOR } from '../../../src/common/constants';
import { PrimeItem } from '../../../src/electron/enums/primeItem';

describe('Tricks', () => {
  it('should handle Alcove with No Items', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      tricks: {
        alcoveNoItems: true
      }
    }));
    const items = new PrimeItemCollection([]);
    const exit = world.getRegionByKey('Landing Site').getExit('Landing Site' + ENTRANCE_SEPARATOR + 'Alcove');

    expect(exit.accessRule(items, world.getSettings())).to.be.true;
  });

  it('should handle Arbor Chamber without Plasma Beam', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      tricks: {
        arborChamberWithoutPlasma: true
      }
    }));
    const items = new PrimeItemCollection([
      primeItems[PrimeItem.MISSILE_LAUNCHER],
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.XRAY_VISOR],
      primeItems[PrimeItem.GRAPPLE_BEAM]
    ]);
    const location = world.getLocationByKey(PrimeLocation.ARBOR_CHAMBER);

    expect(location.itemRule(items, world.getSettings())).to.be.true;
  });

  it('should handle Climb Frigate Crash Site', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      tricks: {
        climbFrigateCrashSite: true
      }
    }));
    const items = new PrimeItemCollection([
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.ICE_BEAM]
    ]);
    const exit = world.getRegionByKey('Frigate Crash Site').getExit('Frigate Crash Site' + ENTRANCE_SEPARATOR + 'Overgrown Cavern');

    expect(exit.accessRule(items, world.getSettings())).to.be.true;
  });
});

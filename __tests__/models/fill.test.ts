import { setUpWorld } from '../utils';
import { PrimeRandomizerSettings } from '../../src/electron/models/prime/randomizerSettings';
import { PointOfNoReturnItems } from '../../src/electron/enums/pointOfNoReturnItems';
import { PrimeLocation } from '../../src/electron/enums/primeLocation';
import { PrimeItem } from '../../src/electron/enums/primeItem';
import { PrimeItemCollection } from '../../src/electron/models/prime/itemCollection';
import { primeItems } from '../../src/electron/models/prime/items';

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

    expect(alcove.itemRule(assumedItems, world.getSettings())).toBe(true);
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

    expect(alcove.itemRule(assumedItems, world.getSettings())).toBe(true);
  });

  it('should fill Alcove (PONR: Do Not Allow)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.DO_NOT_ALLOW
    }));

    const alcove = world.getLocationByKey(PrimeLocation.ALCOVE);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SPACE_JUMP_BOOTS]
    ]);

    expect(alcove.itemRule(assumedItems, world.getSettings())).toBe(true);
  });

  it('should fill lower mines (PONR: Allow All)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_ALL,
      tricks: {
        removeXrayReqs: true
      }
    }));
    const startingRegion = world.getRegionByKey('Phazon Mines West (Phazon Processing Center)');
    const region = world.getRegionByKey('Fungal Hall Access');

    const location = world.getLocationByKey(PrimeLocation.FUNGAL_HALL_ACCESS);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SCAN_VISOR],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.GRAPPLE_BEAM],
      primeItems[PrimeItem.VARIA_SUIT],
      primeItems[PrimeItem.WAVE_BEAM],
      primeItems[PrimeItem.ICE_BEAM],
      primeItems[PrimeItem.PLASMA_BEAM],
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB],
      primeItems[PrimeItem.SPIDER_BALL],
      primeItems[PrimeItem.POWER_BOMB]
    ]);

    const results = world.searchRegions(assumedItems, startingRegion, region);

    expect(results.getVisitedRegion(region)).toBeDefined();
    expect(location.itemRule(assumedItems, world.getSettings())).toBe(true);
  });

  it('should NOT fill lower mines without X-Ray Visor equipped (PONR: Do Not Allow)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_ALL,
      tricks: {
        removeXrayReqs: true
      }
    }));
    const startingRegion = world.getRegionByKey('Phazon Mines West (Phazon Processing Center)');
    const region = world.getRegionByKey('Fungal Hall Access');

    const location = world.getLocationByKey(PrimeLocation.FUNGAL_HALL_ACCESS);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SCAN_VISOR],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.GRAPPLE_BEAM],
      primeItems[PrimeItem.VARIA_SUIT],
      primeItems[PrimeItem.WAVE_BEAM],
      primeItems[PrimeItem.ICE_BEAM],
      primeItems[PrimeItem.PLASMA_BEAM],
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB],
      primeItems[PrimeItem.SPIDER_BALL],
      primeItems[PrimeItem.POWER_BOMB]
    ]);

    const results = world.searchRegions(assumedItems, startingRegion, region);
    const backwardsSearch = world.searchRegions(assumedItems, region, startingRegion);

    expect(results.getVisitedRegion(region)).toBeDefined();
    expect(backwardsSearch.getVisitedRegion(startingRegion)).not.toBeDefined();
    expect(location.itemRule(assumedItems, world.getSettings())).toBe(true);
  });

  it('should fill lower mines with X-Ray Visor equipped (PONR: Do Not Allow, lower mines PONR NOT forced)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_ALL,
      tricks: {
        removeXrayReqs: true
      }
    }));
    const startingRegion = world.getRegionByKey('Phazon Mines West (Phazon Processing Center)');
    const region = world.getRegionByKey('Fungal Hall Access');

    const location = world.getLocationByKey(PrimeLocation.FUNGAL_HALL_ACCESS);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SCAN_VISOR],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.GRAPPLE_BEAM],
      primeItems[PrimeItem.VARIA_SUIT],
      primeItems[PrimeItem.WAVE_BEAM],
      primeItems[PrimeItem.ICE_BEAM],
      primeItems[PrimeItem.PLASMA_BEAM],
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB],
      primeItems[PrimeItem.SPIDER_BALL],
      primeItems[PrimeItem.POWER_BOMB],
      primeItems[PrimeItem.XRAY_VISOR]
    ]);

    const results = world.searchRegions(assumedItems, startingRegion, region);
    const ponrSearch = world.searchRegions(assumedItems, region, startingRegion);

    expect(results.getVisitedRegion(region)).toBeDefined();
    expect(ponrSearch.getVisitedRegion(startingRegion)).toBeDefined();
    expect(location.itemRule(assumedItems, world.getSettings())).toBe(true);
  });

  it('should fill lower mines with X-Ray Visor equipped (PONR: Do Not Allow, lower mines PONR forced)', () => {
    const world = setUpWorld(new PrimeRandomizerSettings({
      pointOfNoReturnItems: PointOfNoReturnItems.ALLOW_ALL,
      tricks: {
        forcePONRLogicForLowerMines: true,
        removeXrayReqs: true
      }
    }));
    const startingRegion = world.getRegionByKey('Phazon Mines West (Phazon Processing Center)');
    const region = world.getRegionByKey('Fungal Hall Access');

    const location = world.getLocationByKey(PrimeLocation.FUNGAL_HALL_ACCESS);
    const assumedItems = new PrimeItemCollection([
      primeItems[PrimeItem.SCAN_VISOR],
      primeItems[PrimeItem.SPACE_JUMP_BOOTS],
      primeItems[PrimeItem.GRAPPLE_BEAM],
      primeItems[PrimeItem.VARIA_SUIT],
      primeItems[PrimeItem.WAVE_BEAM],
      primeItems[PrimeItem.ICE_BEAM],
      primeItems[PrimeItem.PLASMA_BEAM],
      primeItems[PrimeItem.MORPH_BALL],
      primeItems[PrimeItem.MORPH_BALL_BOMB],
      primeItems[PrimeItem.SPIDER_BALL],
      primeItems[PrimeItem.POWER_BOMB],
      primeItems[PrimeItem.XRAY_VISOR]
    ]);

    const results = world.searchRegions(assumedItems, startingRegion, region);
    const ponrSearch = world.searchRegions(assumedItems, region, startingRegion);

    expect(results.getVisitedRegion(region)).toBeDefined();
    expect(ponrSearch.getVisitedRegion(startingRegion)).not.toBeDefined();
    expect(location.itemRule(assumedItems, world.getSettings())).toBe(true);
  });
});

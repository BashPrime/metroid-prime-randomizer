import { World } from '../world';
import { Region } from '../region';
import { Location } from '../location';
import { Entrance } from '../entrance';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { root } from './regions/root';
import { tallonOverworld } from './regions/tallonOverworld';
import { RegionCollection } from '../regionCollection';
import { LocationCollection } from '../locationCollection';

export class PrimeWorld extends World {
  protected settings: PrimeRandomizerSettings;

  constructor(settings: PrimeRandomizerSettings) {
    super(settings);
  }

  loadRegions(): void {
    const rawRegions = [
      ...root(),
      ...tallonOverworld(this.settings)
    ];
    const regions: Region[] = [];

    // Iterate through raw region data and construct appropriate classes
    for (const region of rawRegions) {
      const newRegion = new Region(region.name);
      newRegion.setWorld(this);

      // Set region locations
      if (region.locations) {
        const newLocations: Location[] = [];

        for (const locationKey of Object.keys(region.locations)) {
          const newLocation = new Location(locationKey);
          newLocation.setParentRegion(newRegion);
          newLocation.accessRule = region.locations[locationKey];

          newLocations.push(newLocation);
        }

        newRegion.setLocations(new LocationCollection(newLocations));
      }

      // Set region exits
      if (region.exits) {
        const newExits: Entrance[] = [];

        for (const exitKey of Object.keys(region.exits)) {
          const exitName = newRegion.getName() + ' --> ' + exitKey;
          const newExit = new Entrance(exitName, newRegion);
          newExit.accessRule = region.exits[exitKey];

          newExit.setConnectedRegionKey(exitKey);
          // newExit.canFill = region.locations[exitKey];

          newExits.push(newExit);
        }

        newRegion.setExits(newExits);
      }

      // Region is set, add to array
      regions.push(newRegion);
    }

    this.setRegions(new RegionCollection(regions));
  }
}

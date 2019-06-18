import { World } from '../world';
import { Region } from '../region';
import { Location } from '../location';
import { Entrance } from '../entrance';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { RegionCollection } from '../regionCollection';
import { LocationCollection } from '../locationCollection';
import { root } from './regions/root';
import { tallonOverworld } from './regions/tallonOverworld';
import { chozoRuins } from './regions/chozoRuins';
import { magmoorCaverns } from './regions/magmoorCaverns';
import { phendranaDrifts } from './regions/phendranaDrifts';
import { phazonMines } from './regions/phazonMines';


export class PrimeWorld extends World {
  protected settings: PrimeRandomizerSettings;

  constructor(settings: PrimeRandomizerSettings) {
    super(settings);
  }

  loadRegions(): void {
    const rawRegions = [
      ...root(),
      ...tallonOverworld(),
      ...chozoRuins(),
      ...magmoorCaverns(),
      ...phendranaDrifts(),
      ...phazonMines()
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
          newLocation.itemRule = region.locations[locationKey];

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
          newExit.setConnectedRegionKey(exitKey);
          newExit.accessRule = region.exits[exitKey];

          newExits.push(newExit);
        }

        newRegion.setExits(newExits);
      }

      // Region is set, add to array
      regions.push(newRegion);
    }

    this.setRegions(new RegionCollection(regions));
  }

  getSettings(): PrimeRandomizerSettings {
    return this.settings;
  }

  setSettings(settings: PrimeRandomizerSettings) {
    this.settings = settings;
  }
}

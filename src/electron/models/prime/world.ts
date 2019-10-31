import { World } from '../world';
import { Region } from '../region';
import { Location } from '../location';
import { Entrance } from '../entrance';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { RegionCollection } from '../regionCollection';
import { PrimeItemCollection } from './itemCollection';
import { LocationCollection } from '../locationCollection';
import { root } from './regions/root';
import { tallonOverworld } from './regions/tallonOverworld';
import { chozoRuins } from './regions/chozoRuins';
import { magmoorCaverns } from './regions/magmoorCaverns';
import { phendranaDrifts } from './regions/phendranaDrifts';
import { phazonMines } from './regions/phazonMines';

/**
 * Logical representation of the Metroid Prime game world.
 */
export class PrimeWorld extends World {
  protected settings: PrimeRandomizerSettings;

  constructor(settings: PrimeRandomizerSettings) {
    super(settings);
  }

  /**
   * Loads the Metroid Prime regions into the world instance.
   */
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

  /**
   * Returns the settings used for generating this world instance.
   */
  getSettings(): PrimeRandomizerSettings {
    return this.settings;
  }

  /**
   * Sets the settings configuration object for this world instance.
   * @param settings Configuration object for generating a PrimeWorld instance.
   */
  setSettings(settings: PrimeRandomizerSettings) {
    this.settings = settings;
  }

  /**
   * Searches the world instance and returns a collection of every logically reachable item that has not been obtained yet.
   * @param collectedItems The assumed item collection the player has already obtained.
   */
  collectItems(collectedItems?: PrimeItemCollection): PrimeItemCollection {
    let myItems = collectedItems !== undefined ? collectedItems : new PrimeItemCollection([]);

    // Get all available item locations
    const filledItemLocations = this.getLocations().filter(location => location.hasItem());
    let newItems = new PrimeItemCollection([]);

    do {
      // Get reachable regions using current items
      this.searchRegions(myItems);

      const searchLocations = new LocationCollection(filledItemLocations.toArray().filter(location => {
        return location.canFill(myItems, this.settings);
      }));

      const foundItems = new PrimeItemCollection(searchLocations.getItems().toArray());

      const precollected = myItems.diff(foundItems);
      newItems = foundItems.diff(myItems);
      myItems = foundItems.merge(precollected);
    } while (newItems.size() > 0);

    return myItems;
  }
}

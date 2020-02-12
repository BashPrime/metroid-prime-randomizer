import * as crypto from 'crypto';

import { World } from '../world';
import { Region } from '../region';
import { Location } from '../location';
import { Entrance } from '../entrance';
import { PrimeRandomizerSettings } from './randomizerSettings';
import { RegionCollection } from '../regionCollection';
import { PrimeItemCollection } from './itemCollection';
import { LocationCollection } from '../locationCollection';
import { LayoutString } from './layoutString';
import { primeLocations } from './locations';
import { PrimeLocation } from '../../enums/primeLocation';
import { root } from './regions/root';
import { tallonOverworld } from './regions/tallonOverworld';
import { chozoRuins } from './regions/chozoRuins';
import { magmoorCaverns } from './regions/magmoorCaverns';
import { phendranaDrifts } from './regions/phendranaDrifts';
import { phazonMines } from './regions/phazonMines';
import { Elevator, elevatorTableBase, endgameTeleporters, StartingArea, getLandingSiteArea } from './entranceShuffle';
import { ENTRANCE_SEPARATOR } from '../../constants';
import { MersenneTwister } from '../../mersenneTwister';
import * as Utilities from '../../utilities';
import * as namesJson from '../../data/names.json';


/**
 * Logical representation of the Metroid Prime game world.
 */
export class PrimeWorld extends World {
  /**
   * The settings configuration used to generate this world.
   */
  protected settings: PrimeRandomizerSettings;
  /**
   * Used for quick/easy reference to the starting area set when generating this world.
   * Default is always Landing Site.
   */
  protected startingArea: StartingArea = getLandingSiteArea();
  /**
   * The elevator table used when generating this world. Used for convenient/quick reference when generating the patcher layout.
   * This field is intentionally in an undefined state and considered the default layout by the patcher when undefined.
   */
  protected elevatorLayout: Elevator[] = undefined;

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
          const exitName = newRegion.getName() + ENTRANCE_SEPARATOR + exitKey;
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
   * Returns the starting area used for this world instance.
   */
  getStartingArea(): StartingArea {
    return this.startingArea;
  }

  /**
   * Sets the starting area for this world.
   * @param startingArea The starting area to set for this world.
   */
  setStartingArea(startingArea: StartingArea) {
    this.startingArea = startingArea;
  }

  /**
   * Returns the elevator layout used for this world instance.
   */
  getElevatorLayout(): Elevator[] {
    return this.elevatorLayout;
  }

  /**
   * Sets the elevator layout for this world.
   * @param elevators The elevator layout being set
   */
  setElevatorLayout(elevators: Elevator[]) {
    this.elevatorLayout = elevators;
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

  /**
   * Changes the starting point of the game to the provided area.
   * @param area The area we're switching the starting point to.
   */
  applyStartingArea(area: StartingArea): void {
    const rootRegion = this.getRootRegion();

    // Disconnect root region from all exit(s)
    for (const exit of rootRegion.getExits()) {
      exit.disconnect();
      exit.disconnectFromParent();
    }

    // Create new entrance and connect it to root and the actual region we're starting in
    const newRootExit = new Entrance(rootRegion.getName() + ENTRANCE_SEPARATOR + area.region, rootRegion);
    newRootExit.accessRule = () => true;
    newRootExit.connectToParent(rootRegion);
    newRootExit.connect(this.getRegionByKey(area.region));

    // Set the starting area field for this world
    this.startingArea = area;
  }

  /**
   * Changes the world's elevator layout to match the provided elevator layout.
   * @param newLayout The elevator layout to apply to the world.
   */
  applyElevatorLayout(newLayout: Elevator[]): void {
    const oldLayout: Elevator[] = this.elevatorLayout ? this.elevatorLayout : elevatorTableBase;

    const elevators = newLayout.map(elevator => {
      const elevatorMap = elevator as any;
      // Get matching destination from the matching id from the old layout
      elevatorMap.oldDestination = oldLayout.find(dest => dest.id === oldLayout.find(item => item.id === elevator.id).destination).name;
      elevatorMap.newDestination = newLayout.find(item => item.id === elevator.destination).name;
      return elevatorMap;
    });

    for (const elevator of elevators) {
      const sourceRegion = this.getRegionByKey(elevator.name);
      const currentExit = sourceRegion.getExit(elevator.name + ENTRANCE_SEPARATOR + elevator.oldDestination);

      // Build new exit object with new destination region, while keeping the old exit's access rule
      const newExit = new Entrance(elevator.name + ENTRANCE_SEPARATOR + elevator.newDestination, sourceRegion);
      newExit.accessRule = currentExit.accessRule;

      // Disconnect old exit from parent and destination
      currentExit.disconnect();
      currentExit.disconnectFromParent();

      // Connect new exit to parent and destination
      newExit.connectToParent(sourceRegion);
      newExit.connect(this.getRegionByKey(elevator.newDestination));
    }

    // Save the layout array to the world for later reference
    this.setElevatorLayout(newLayout);
  }

  /**
  * Returns an encoded layout string to be used for the randomprime patcher.
  */
  getRandomprimePatcherLayoutString(): string {
    const itemLayout: number[] = [];
    let elevatorLayout: number[] = undefined; // If undefined, encode_layout() uses default elevator layout
    const patcherLocations = primeLocations.map(location => location.name);
    const locations = this.getLocations().toArray().sort((a, b) => {
      const aIndex = patcherLocations.indexOf(a.getName() as PrimeLocation);
      const bIndex = patcherLocations.indexOf(b.getName() as PrimeLocation);

      if (aIndex < bIndex) return -1;
      else if (aIndex > bIndex) return 1;
      return 0;
    });

    // Build item layout using patcher ID
    for (let location of locations) {
      itemLayout.push(location.getItem().getPatcherId());
    }

    // If elevators field exists, build array and use for the layout encode function
    if (this.elevatorLayout) {
      elevatorLayout = this.elevatorLayout.concat(endgameTeleporters).sort((a, b) => {
        if (a.id < b.id) return -1;
        else if (a.id > b.id) return 1;
        return 0;
      }).map(elevator => elevator.destination);

      // Starting area is the last index of the elevator layout array
      elevatorLayout.push(this.startingArea.id);
    }

    return new LayoutString().encode_layout(itemLayout, elevatorLayout);
  }

  /**
   * Generates a string array representation of the world's layout sha256, with user-friendly words.
   * @param length The length of the generated hash array
   */
  getLayoutHash(length = 4): string[] {
    const layoutHash: string [] = [];
    // Using the randomprime layout sha256 hash as the seed for easier debugging/verification
    const sha256 = crypto.createHash('sha256').update(this.getRandomprimePatcherLayoutString()).digest('hex');
    const rng = new MersenneTwister(Utilities.parseSafeIntegerFromSha256(sha256));

    for (let i = 0; i < length; i++) {
      const index = Utilities.getRandomInt(0, namesJson.length, rng);
      layoutHash.push(namesJson[index]);
    }

    return layoutHash;
  }
}

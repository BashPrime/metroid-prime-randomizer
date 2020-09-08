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
import { ENTRANCE_SEPARATOR } from '../../../common/constants';
import { MersenneTwister } from '../../mersenneTwister';
import * as Utilities from '../../utilities';
import * as namesJson from '../../data/names.json';
import { ItemType, ItemPriority } from './items';
import { ItemMap, mapToItemPool } from './itemPool';

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
  /**
   * The collection of items that will already be in the player's inventory when starting the game.
   */
  protected startingItems: ItemMap;
  /**
   * This flag is used to set the starting items popup flag in the patcher.
   */
  protected showStartingItems: boolean = false;

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

  getStartingItems(): ItemMap {
    return this.startingItems;
  }

  setStartingItems(startingItems: ItemMap): void {
    this.startingItems = startingItems;
  }

  getShowStartingItems(): boolean {
    return this.showStartingItems;
  }

  setShowStartingItems(showStartingItems: boolean): void {
    this.showStartingItems = showStartingItems;
  }

  /**
   * Searches the world instance and returns a collection of every logically reachable item that has not been obtained yet.
   * @param collectedItems The assumed item collection the player has already obtained.
   */
  collectItems(collectedItems?: PrimeItemCollection): PrimeItemCollection {
    let myItems = collectedItems !== undefined ? collectedItems : new PrimeItemCollection([]);

    // If the world has starting items, add to myItems
    if (this.getStartingItems()) {
      const startingItemsArray = mapToItemPool(this.getStartingItems());
      myItems = myItems.merge(new PrimeItemCollection(startingItemsArray));
    }

    let newItems = new PrimeItemCollection([]);
    let lastRegionVisited: Region;

    do {
      // Get reachable regions using current items
      const searchResults = this.searchRegions(myItems, lastRegionVisited);

      // Save last visited region; the search in the next iteration of the loop will start there
      const wrapperLastRegionVisited = searchResults.getLastVisitedRegion();

      if (wrapperLastRegionVisited) {
        lastRegionVisited = wrapperLastRegionVisited.region;
      }

      const filledItemLocations = searchResults.getLocations().filter(location => location.hasItem());

      const searchLocations = new LocationCollection(filledItemLocations.filter(location => {
        const visitedRegion = searchResults.getVisitedRegion(location.getParentRegion());

        // Can't get the item, no point running the additional checks.
        if (!location.itemRule(myItems, this.settings)) {
          return false;
        }

        // If we can obtain the item, can we exit?
        const locationExit = visitedRegion.entryPoint
          ? visitedRegion.entryPoint.getOpposite()
          : null;

        return !locationExit || locationExit.accessRule(new PrimeItemCollection([...myItems.toArray(), location.getItem()]), this.settings);
      }));

      const foundItems = new PrimeItemCollection(searchLocations.getItems().toArray());

      const precollected = myItems.diff(foundItems);
      newItems = foundItems.diff(myItems);
      myItems = foundItems.merge(precollected);
    } while (newItems.size() > 0);

    return myItems;
  }

  /**
   * Traverses the game world and returns the order of items collected.
   *
   * This function is similar to collectItems(), but instead explores the world and returns the order of items it obtains.
   */
  getPlaythrough(): object[] {
    const playthrough = [];
    let myItems = new PrimeItemCollection([]);

    // Set up starting items and append to myItems if there are any
    let startingItems: PrimeItemCollection;
    if (this.getStartingItems()) {
      startingItems = new PrimeItemCollection(mapToItemPool(this.getStartingItems()));
      myItems = myItems.merge(startingItems);

      // Make the starting items the first in the item sphere
      playthrough.push({ ['Starting Items']: startingItems.toArray().map(item => item.getName()) });
    }

    let myLocations = new LocationCollection([]);
    let newLocations = new LocationCollection([]);

    // Get all item locations filled with items
    const filledItemLocations = this.getLocations().filter(location => location.hasItem());

    do {
      const itemLocationSphere = {};

      // Get reachable regions using current items
      const searchResults = this.searchRegions(myItems);

      // Get all locations we can reach with our current items
      const searchLocations = new LocationCollection(filledItemLocations.toArray().filter(location => {
        /*
         * Two checks:
         *
         * 1. Can we get the item in the location?
         * 2. After getting the item, can we leave the region from where we entered? (assuming the connection is two-way)
         * This is to validate checks such as Ventilation Shaft.
         *
         */
        const visitedRegion = searchResults.getVisitedRegion(location.getParentRegion());

        /*
         * In terms of filling the item sphere, we're interested in the new locations
         *
         * Our criteria for filling the location sphere is as follows:
         * - The item has an item priority of Progression or higher
         *   OR
         * - The item is an Item or Artifact type
         */
        const item = location.getItem();
        let hasHighEnoughItemPriority: boolean;
        let isCorrectItemType: boolean;

        switch (item.getPriority()) {
          case ItemPriority.PROGRESSION:
          case ItemPriority.ARTIFACTS:
            hasHighEnoughItemPriority = true;
            break;
          default:
            hasHighEnoughItemPriority = false;
        }

        switch (item.getType()) {
          case ItemType.ITEM:
          case ItemType.ARTIFACT:
            isCorrectItemType = true;
            break;
          default:
            isCorrectItemType = false;
        }

        // This is the first check, to see if we can reach the location and get to the item (and if the item should be displayed in the playthrough)
        const canGetItemInLocation = visitedRegion && (hasHighEnoughItemPriority || isCorrectItemType) && location.itemRule(myItems, this.settings);

        // No point in continuing the checks if the location isn't worth getting
        if (!canGetItemInLocation) {
          return false;
        }

        // If we can get the item, run a search starting at the location's parent region to check if we can safely leave after obtaining the item.
        const searchResultsWithObtainedItem = this.searchRegions(new PrimeItemCollection([...myItems.toArray(), location.getItem()]), location.getParentRegion());

        // Get the region we came from to enter the current location's parent region
        const entryPointRegion = visitedRegion.entryPoint ? visitedRegion.entryPoint.getParentRegion() : null;

        return !entryPointRegion || searchResultsWithObtainedItem.getVisitedRegion(entryPointRegion);
      }));

      // Update myItems state (this includes any items previously reached)
      myItems = new PrimeItemCollection(searchLocations.getItems().toArray());

      // Don't lose starting items if they exist
      if (startingItems) {
        myItems = myItems.merge(startingItems);
      }

      // First, get the old (already visited locations) out of the search locations
      const oldLocations = myLocations.diff(searchLocations);
      // Next, get the new locations out of the search locations
      newLocations = searchLocations.diff(myLocations);
      // Last, to maintain the search state, update myLocations by merging search and oldLocations
      myLocations = searchLocations.merge(oldLocations);

      for (let location of newLocations.toArray()) {
        itemLocationSphere[location.getName()] = location.getItem().getName();
      }

      // If the item location sphere has entries in it, push to the playthrough array
      if (Object.keys(itemLocationSphere).length) {
        playthrough.push(itemLocationSphere);
      }
    } while (newLocations.size() > 0);

    return playthrough;
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
    this.setStartingArea(area);
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
    const itemLayout: string[] = [];
    let elevatorLayout: string[] = undefined; // If undefined, encode_layout() uses default elevator layout
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
      itemLayout.push(location.getItem().getPatcherId().toString());
    }

    // Handle elevators array for the layout encode function
    const elevators = this.elevatorLayout ? this.elevatorLayout : elevatorTableBase;
    elevatorLayout = elevators.concat(endgameTeleporters).sort((a, b) => {
      if (a.id < b.id) return -1;
      else if (a.id > b.id) return 1;
      return 0;
    }).map(elevator => elevator.destination.toString());

    // Starting area is the last index of the elevator layout array
    elevatorLayout.push(this.startingArea.id.toString());

    return new LayoutString().encode_layout(itemLayout, elevatorLayout);
  }

  /**
   * Generates a string array representation of the world's layout sha256, with user-friendly words.
   * @param length The length of the generated hash array
   */
  getLayoutHash(length = 4): string[] {
    const layoutHash: string[] = [];
    // Using the randomprime layout sha256 hash as the seed for easier debugging/verification
    const sha256 = crypto.createHash('sha256').update(this.getRandomprimePatcherLayoutString()).digest('hex');
    const rng = new MersenneTwister(Utilities.parseSafeIntegerFromSha256(sha256));

    for (let i = 0; i < length; i++) {
      const index = Utilities.getRandomInt(0, namesJson.length - 1, rng);
      layoutHash.push(namesJson[index]);
    }

    return layoutHash;
  }
}

import {Region} from './Region';
import {Location} from './Location';
import {PrimeItemName} from './ItemType';
import {ItemCollection} from './collection/ItemCollection';
import {LocationCollection} from './collection/LocationCollection';

import {TallonOverworld} from './region/TallonOverworld';
import {ChozoRuins} from './region/ChozoRuins';
import {MagmoorCaverns} from './region/MagmoorCaverns';
import {PhendranaDrifts} from './region/PhendranaDrifts';
import {PhazonMines} from './region/PhazonMines';

import {LayoutString} from './LayoutString';

import {RandomizerMode} from './enums/RandomizerMode';
import {RandomizerLogic} from './enums/RandomizerLogic';

export class World {
  protected mode: string;
  protected logic: string;
  protected difficulty: string;
  protected goal: string;
  protected regions: Array<Region>;
  protected locations: Array<Location>;
  protected collectableLocations: Array<Location>;

  constructor(mode: string = RandomizerMode.STANDARD, logic: string = RandomizerLogic.NO_GLITCHES, difficulty: string = 'Normal') {
    this.mode = mode;
    this.logic = logic;
    this.difficulty = difficulty;

    this.regions = [
      new TallonOverworld(),
      new ChozoRuins(),
      new MagmoorCaverns(),
      new PhendranaDrifts(),
      new PhazonMines()
    ];

    this.locations = [];

    for (const region of this.regions) {
      region.init(logic);

      region.getLocations().forEach((value: Location, key: string) => {
        this.locations.push(value);
      });
    }
  }

  public getMode(): string {
    return this.mode;
  }

  public getLogic(): string {
    return this.logic;
  }

  public getDifficulty(): string {
    return this.difficulty;
  }

  public getGoal(): string {
    return this.goal;
  }

  public getRegions(): Array<Region> {
    return this.regions;
  }

  public getLocations(): Array<Location> {
    return this.locations;
  }

  public getEmptyLocations(): Array<Location> {
    return this.locations.filter(location => !location.hasItem());
  }

  public getUpgradeLocations(): Array<Location> {
    return this.locations.filter(location => location.isMajorItemLocation());
  }

  public collectItems(collectedItems?: ItemCollection): ItemCollection {
    let myItems: ItemCollection = collectedItems !== undefined ? collectedItems : new ItemCollection();

    // Get all non-artifact items
    const availableLocations = this.getLocations().filter(location => {
      return location.hasItem() && location.getItem().getName().indexOf('Artifact') < 0;
    });

    let newItems: ItemCollection = new ItemCollection();
    do {
      const searchLocations = new LocationCollection(availableLocations.filter(location => {
        return location.canFillItem(undefined, myItems) && location.canEscape(location.getItem(), myItems);
      }));

      const foundItems = searchLocations.getItems();

      const precollected = myItems.diff(foundItems);
      newItems = foundItems.diff(myItems);
      myItems = foundItems.merge(precollected);
    } while (newItems.size() > 0);

    return myItems;
  }

  public generateLayout(): string {
    const itemLayout: Array<number> = [];
    const itemLayoutMap: Map<string, number> = new Map<string, number>();
    itemLayoutMap.set(PrimeItemName.MISSILE_LAUNCHER, 0);
    itemLayoutMap.set(PrimeItemName.MISSILE_EXPANSION, 0);
    itemLayoutMap.set(PrimeItemName.ENERGY_TANK, 1);
    itemLayoutMap.set(PrimeItemName.THERMAL_VISOR, 2);
    itemLayoutMap.set(PrimeItemName.XRAY_VISOR, 3);
    itemLayoutMap.set(PrimeItemName.VARIA_SUIT, 4);
    itemLayoutMap.set(PrimeItemName.GRAVITY_SUIT, 5);
    itemLayoutMap.set(PrimeItemName.PHAZON_SUIT, 6);
    itemLayoutMap.set(PrimeItemName.MORPH_BALL, 7);
    itemLayoutMap.set(PrimeItemName.BOOST_BALL, 8);
    itemLayoutMap.set(PrimeItemName.SPIDER_BALL, 9);
    itemLayoutMap.set(PrimeItemName.MORPH_BALL_BOMB, 10);
    itemLayoutMap.set(PrimeItemName.POWER_BOMB_EXPANSION, 11);
    itemLayoutMap.set(PrimeItemName.POWER_BOMB, 12);
    itemLayoutMap.set(PrimeItemName.CHARGE_BEAM, 13);
    itemLayoutMap.set(PrimeItemName.SPACE_JUMP_BOOTS, 14);
    itemLayoutMap.set(PrimeItemName.GRAPPLE_BEAM, 15);
    itemLayoutMap.set(PrimeItemName.SUPER_MISSILE, 16);
    itemLayoutMap.set(PrimeItemName.WAVEBUSTER, 17);
    itemLayoutMap.set(PrimeItemName.ICE_SPREADER, 18);
    itemLayoutMap.set(PrimeItemName.FLAMETHROWER, 19);
    itemLayoutMap.set(PrimeItemName.WAVE_BEAM, 20);
    itemLayoutMap.set(PrimeItemName.ICE_BEAM, 21);
    itemLayoutMap.set(PrimeItemName.PLASMA_BEAM, 22);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_LIFEGIVER, 23);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_WILD, 24);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_WORLD, 25);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_SUN, 26);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_ELDER, 27);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_SPIRIT, 28);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_TRUTH, 29);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_CHOZO, 30);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_WARRIOR, 31);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_NEWBORN, 32);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_NATURE, 33);
    itemLayoutMap.set(PrimeItemName.ARTIFACT_OF_STRENGTH, 34);

    const regionOrder = [1, 3, 0, 4, 2];

    for (const regionIndex of regionOrder) {
      this.regions[regionIndex].getLocations().forEach((value: Location, key: string) => {
        itemLayout.push(itemLayoutMap.get(value.getItem().getName()));
      });
    }

    const layoutString = new LayoutString();

    return layoutString.encode_pickup_layout(itemLayout);
  }
}

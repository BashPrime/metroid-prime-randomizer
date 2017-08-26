import {Filler} from '../Filler';
import {ItemCollection} from '../collection/ItemCollection';
import {LocationCollection} from '../collection/LocationCollection';
import {Item} from '../Item';
import {Location} from '../Location';
import {PrimeItemName} from '../ItemType';
import {RandomizerMode} from '../enums/RandomizerMode';
import {RandomizerLogic} from '../enums/RandomizerLogic';

export class RandomAssumed extends Filler {
  fill(priorityItems: Array<Item>, upgrades: Array<Item>, artifacts: Array<Item>, expansions: Array<Item>): void {
    let randomizedLocations: Array<Location>;
    let energyTanks: Array<Item>;
    switch (this.world.getMode()) {
      case RandomizerMode.MAJORS:
        randomizedLocations = this.shuffleLocations([...this.world.getUpgradeLocations()]);
        energyTanks = expansions.filter(item => item.getName() === PrimeItemName.ENERGY_TANK);
        expansions = expansions.filter(item => item.getName() !== PrimeItemName.ENERGY_TANK);
        break;

      case RandomizerMode.STANDARD:
      default:
        randomizedLocations = this.shuffleLocations([...this.world.getEmptyLocations()]);
    }

    switch (this.world.getLogic()) {
      case RandomizerLogic.NAIVE:
        this.fastFillItemsInLocations(priorityItems, randomizedLocations);
        randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
        this.fastFillItemsInLocations(upgrades, randomizedLocations);
        break;
      default:
        this.fillItemsInLocations(new ItemCollection(this.shuffleItems(priorityItems)), new LocationCollection(randomizedLocations));
        randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
        this.fillItemsInLocations(new ItemCollection(this.shuffleItems(upgrades)), new LocationCollection(randomizedLocations));
    }

    if (this.world.getMode() === RandomizerMode.MAJORS) {
      randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
      this.fastFillItemsInLocations(energyTanks, randomizedLocations);

      randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
      this.fastFillItemsInLocations(artifacts, randomizedLocations);

      randomizedLocations = this.shuffleLocations([...this.world.getEmptyLocations()]);
    }

    else {
      randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
      this.fastFillItemsInLocations(artifacts, randomizedLocations);
    }

    randomizedLocations = new LocationCollection(randomizedLocations).getEmptyLocations().toArray();

    this.fastFillItemsInLocations(expansions, randomizedLocations);
  }

  fillItemsInLocations(fillItems: ItemCollection, locations: LocationCollection, baseAssumedItems: ItemCollection = new ItemCollection()): void {
    let remainingFillItems = new ItemCollection([...fillItems.toArray()]);

    if (remainingFillItems.size() > locations.getEmptyLocations().size()) {
      throw new RangeError('There are more items to fill than available locations');
    }

    for (let item of fillItems.toArray()) {
      baseAssumedItems.add(remainingFillItems.removeItem(item.getName()));

      let assumedItems = this.world.collectItems(remainingFillItems);

      let fillableLocations = new LocationCollection(locations.toArray().filter(location => {
        return !location.hasItem() && location.canFillItem(item, assumedItems) && location.canEscape(item, assumedItems);
      }));

      if (fillableLocations.size() == 0) {
        throw new RangeError('No available locations to fill item: ' + item.getName());
      }

      let fillLocation = fillableLocations.get(0);

      fillLocation.setItem(item);
    }
  }
}

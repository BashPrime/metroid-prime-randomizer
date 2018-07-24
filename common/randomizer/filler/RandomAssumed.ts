import {Filler} from '../Filler';
import {ItemCollection} from '../collection/ItemCollection';
import {LocationCollection} from '../collection/LocationCollection';
import {Item} from '../Item';
import {Location} from '../Location';
import {PrimeItem} from '../enums/PrimeItem';
import {RandomizerMode} from '../enums/RandomizerMode';
import {RandomizerLogic} from '../enums/RandomizerLogic';

export class RandomAssumed extends Filler {
  fill(fillItems: Item[], fastFill?: boolean, forceAllLocations?: boolean): void {
    // Shuffle items and locations before filling
    const shuffledItems = this.shuffleItems(fillItems);
    let shuffledLocations;

    // Only use major item locations if the force flag is not set and the mode is Major Items
    if (!forceAllLocations && this.world.getMode() === RandomizerMode.MAJOR_ITEMS) {
      shuffledLocations = this.shuffleLocations([...this.world.getUpgradeLocations()]);
    } else {
      shuffledLocations = this.shuffleLocations([...this.world.getEmptyLocations()]);
    }

    // Use logic-based fill if fast fill flag isn't set
    if (!fastFill) {
      this.fillItemsInLocations(new ItemCollection(shuffledItems), new LocationCollection(shuffledLocations));
    } else {
      this.fastFillItemsInLocations(shuffledItems, shuffledLocations);
    }
  }

  fillItemsInLocations(fillItems: ItemCollection,
                       locations: LocationCollection,
                       baseAssumedItems: ItemCollection = new ItemCollection()): void {
    const remainingFillItems = new ItemCollection([...fillItems.toArray()]);

    if (remainingFillItems.size() > locations.getEmptyLocations().size()) {
      throw new RangeError('There are more items to fill than available locations');
    }

    for (const item of fillItems.toArray()) {
      baseAssumedItems.add(remainingFillItems.removeItem(item.getName()));

      const assumedItems = this.world.collectItems(remainingFillItems);

      const fillableLocations = new LocationCollection(locations.toArray().filter(location => {
        return !location.hasItem() && location.canFillItem(item, assumedItems) && location.canEscape(item, assumedItems);
      }));

      if (fillableLocations.size() === 0) {
        throw new RangeError('No available locations to fill item: ' + item.getName());
      }

      const fillLocation = fillableLocations.get(0);

      fillLocation.setItem(item);
    }
  }
}

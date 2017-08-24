import { Filler } from '../Filler';
import { ItemCollection } from '../collection/ItemCollection';
import { LocationCollection } from '../collection/LocationCollection';
import { Item } from '../Item';

export class RandomAssumed extends Filler {
    fill(artifacts: Array<Item>, priorityItems: Array<Item>, luxuryItems: Array<Item>, expansions: Array<Item>): void {
        let randomizedLocations = this.shuffleLocations([...this.world.getEmptyLocations()]);

        this.fillItemsInLocations(new ItemCollection(this.shuffleItems(priorityItems)), new LocationCollection(randomizedLocations));

        randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());

        this.fillItemsInLocations(new ItemCollection(this.shuffleItems(luxuryItems)), new LocationCollection(randomizedLocations));

        randomizedLocations = this.shuffleLocations(new LocationCollection(randomizedLocations).getEmptyLocations().toArray());
        
        this.fastFillItemsInLocations(artifacts, randomizedLocations);

        randomizedLocations = new LocationCollection(randomizedLocations).getEmptyLocations().toArray();

        this.fastFillItemsInLocations(expansions, randomizedLocations);
    }

    fillItemsInLocations(fillItems: ItemCollection, locations: LocationCollection, baseAssumedItems: ItemCollection = new ItemCollection()): void {
        let remainingFillItems = new ItemCollection([...fillItems.toArray()]);

        if (remainingFillItems.size() > locations.getEmptyLocations().size()) {
            throw new RangeError("There are more items to fill than available locations");
        }

        for (let item of fillItems.toArray()) {
            baseAssumedItems.add(remainingFillItems.removeItem(item.getName()));
            
            let assumedItems = this.world.collectItems(remainingFillItems);

            let fillableLocations = new LocationCollection(locations.toArray().filter(location => {
                return !location.hasItem() && location.canFillItem(item, assumedItems) && location.canEscape(item, assumedItems);
            }));

            if (fillableLocations.size() == 0) {
                throw new RangeError("No available locations to fill item: " + item.getName());
            }

            let fillLocation = fillableLocations.get(0);

            fillLocation.setItem(item);
        }
    }
}
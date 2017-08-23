import { Filler } from '../Filler';
import { ItemCollection } from '../collection/ItemCollection';
import { LocationCollection } from '../collection/LocationCollection';
import { Item } from '../Item';

export class RandomAssumed extends Filler {
    fill(artifacts: Array<Item>, priorityItems: Array<Item>, luxuryItems: Array<Item>, expansions: Array<Item>): void {
        let randomizedLocations = this.shuffleLocations([...this.world.getLocations()]);

        this.fillItemsInLocations(new ItemCollection(priorityItems.concat(luxuryItems)), new LocationCollection(randomizedLocations));
        
        this.fastFillItemsInLocations(artifacts, randomizedLocations);

        this.fastFillItemsInLocations(expansions, randomizedLocations);

        // for (let i = 0; i < 15; i++) {
        //     if (!randomizedLocations[i].hasItem())
        //         break;
        //     console.log("Location " + randomizedLocations[i].getName() + " has item " + randomizedLocations[i].getItem().getName());
        // }

        // let worldLocations = this.world.getLocations();
        // let emptyLocationCount = new LocationCollection(worldLocations).getEmptyLocations().size();
        // console.log("Empty location count is: " + emptyLocationCount);
        // for (let i = 0; i < worldLocations.length; i++) {
        //     if (!worldLocations[i].hasItem())
        //         break;
        //     console.log("Location " + worldLocations[i].getName() + " has item " + worldLocations[i].getItem().getName());
        // }
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
                return !location.hasItem() && location.canFillItem(item, assumedItems);
            }));

            if (fillableLocations.size() == 0) {
                throw new RangeError("No available locations to fill item: " + item.getName());
            }

            let fillLocation = fillableLocations.get(0);

            fillLocation.setItem(item);
        }
    }
}
import { Filler } from '../Filler';
import { Item } from '../Item';

export class RandomAssumed extends Filler {
    fill(artifacts: Array<Item>, priorityItems: Array<Item>, luxuryItems: Array<Item>, expansions: Array<Item>): void {
        let randomizedLocations = this.shuffleLocations(this.world.getLocations());
        
        this.fastFillItemsInLocations(artifacts, randomizedLocations);

        for (let i = 0; i < 15; i++) {
            if (!randomizedLocations[i].hasItem())
                break;
            console.log("Location " + randomizedLocations[i].getName() + " has item " + randomizedLocations[i].getItem().getName());
        }
    }
}
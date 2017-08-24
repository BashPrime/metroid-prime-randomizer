import { World } from './World';
import { Item } from './Item';
import { Location } from './Location';
import { MersenneTwister } from './MersenneTwister';
import { RandomAssumed } from './filler/RandomAssumed';

export abstract class Filler {
    world: World;
    rng: MersenneTwister;

    constructor(world: World, rng: MersenneTwister) {
        this.world = world;
        this.rng = rng;
    }

    abstract fill(artifacts: Array<Item>, priorityItems: Array<Item>, luxuryItems: Array<Item>, expansions: Array<Item>): void;

    fastFillItemsInLocations(fillItems: Array<Item>, locations: Array<Location>): void {
        for (let location of locations) {
            if (location.hasItem())
                continue;
            let item = fillItems.pop();
            if (!item)
                break;
            location.setItem(item);
        }
    }

    shuffleItems(items: Array<Item>): Array<Item> {
        return this.shuffleInPlace(items);
    }

    shuffleLocations(locations: Array<Location>): Array<Location> {
        return this.shuffleInPlace(locations);
    }

    shuffleInPlace<T>(array: T[]): T[] {
        // if it's 1 or 0 items, just return
        if (array.length <= 1) return array;

        // For each index in array
        for (let i = 0; i < array.length; i++) {

            // choose a random not-yet-placed item to place there
            // must be an item AFTER the current item, because the stuff
            // before has all already been placed
            const randomChoiceIndex = this.getRandom(i, array.length - 1);

            // place our random choice in the spot by swapping
            [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
        }

        return array;
    }

    getRandom(floor:number, ceiling:number) {
        return Math.floor(this.rng.random() * (ceiling - floor + 1)) + floor;
    }
}
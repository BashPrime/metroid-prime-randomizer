import { MersenneTwister } from '../mersenneTwister';

export abstract class Collection<T> {
    protected abstract items: T[];

    toArray(): T[] {
        return this.items;
    }

    size(): number {
        return this.items.length;
    }

    pop(): T {
        return this.items.shift();
    }

    push(newItem: T) {
        this.items.push(newItem);
    }

    abstract remove(item: T): T;
    abstract shuffle(rng: MersenneTwister);
    abstract filter(fn);
    abstract has(key: string): boolean;
    abstract diff(otherItems);
    abstract merge(otherItems);
}
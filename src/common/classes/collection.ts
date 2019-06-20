export abstract class Collection<T> {
    protected abstract items: T[];

    toArray(): T[] {
        return this.items;
    }

    size(): number {
        return this.items.length;
    }

    abstract filter(fn);
    abstract has(key: string): boolean;
    abstract diff(otherItems);
    abstract merge(otherItems);
}
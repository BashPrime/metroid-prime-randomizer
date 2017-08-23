import { Region } from './Region';
import { Location } from './Location';
import { ItemCollection } from './collection/ItemCollection';
import { LocationCollection } from './collection/LocationCollection';

import { TallonOverworld } from './region/TallonOverworld';
import { ChozoRuins } from './region/ChozoRuins';
import { MagmoorCaverns } from './region/MagmoorCaverns';
import { PhendranaDrifts } from './region/PhendranaDrifts';
import { PhazonMines } from './region/PhazonMines';

export class World {
    protected mode: string;
    protected logic: string;
    protected difficulty: string;
    protected regions: Array<Region>;
    protected locations: Array<Location>;
    protected collectableLocations: Array<Location>;

    constructor(mode: string = "Standard", logic: string = "NoGlitches", difficulty: string = "Normal") {
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

        for(let region of this.regions) {
            region.init(logic);

            region.getLocations().forEach((value: Location, key: string) => {
                this.locations.push(value);
            });
        }
    }

    public getRegions(): Array<Region> {
        return this.regions;
    }

    public getLocations(): Array<Location> {
        return this.locations;
    }

    public collectItems(collectedItems?: ItemCollection): ItemCollection {
        let myItems: ItemCollection = collectedItems !== undefined ? collectedItems : new ItemCollection();

        // Get all non-artifact items
        let availableLocations = this.getLocations().filter(location => {
            return location.hasItem() && location.getItem().getName().indexOf("Artifact") < 0;
        });

        let newItems: ItemCollection = new ItemCollection();
        do {
            let searchLocations = new LocationCollection(availableLocations.filter(location => {
                return location.canFillItem(undefined, myItems) && location.canEscape(undefined, myItems);
            }));

            let foundItems = searchLocations.getItems();

            let precollected = myItems.diff(foundItems);
            newItems = foundItems.diff(myItems);
            myItems = foundItems.merge(precollected);
        } while (newItems.size() > 0);

        return myItems;
    }
}
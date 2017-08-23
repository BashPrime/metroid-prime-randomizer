import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItemName } from '../ItemType';

export class PhendranaDrifts extends Region {
    constructor() {
        super();
        this.locations = new Map<string, Location>([
            ["Phendrana Shorelines (Behind Ice)", new Location("Phendrana Shorelines (Behind Ice)", "f7285979.mrea", 0x0002016E)],
            ["Phendrana Shorelines (Spider Track)", new Location("Phendrana Shorelines (Spider Track)", "f7285979.mrea", 0x00020176)],
            ["Chozo Ice Temple", new Location("Chozo Ice Temple", "6655f51e.mrea", 0x00080257)],
            ["Ice Ruins West", new Location("Ice Ruins West", "b33a0620.mrea", 0x000928ED)],
            ["Ice Ruins East (Behind Ice)", new Location("Ice Ruins East (Behind Ice)", "dafcc26f.mrea", 0x000A00AB)],
            ["Ice Ruins East (Spider Track)", new Location("Ice Ruins East (Spider Track)", "dafcc26f.mrea", 0x000A0191)],
            ["Chapel of the Elders", new Location("Chapel of the Elders", "40c548e9.mrea", 0x000E0058)],
            ["Ruined Courtyard", new Location("Ruined Courtyard", "1921876d.mrea", 0x000F022C)],
            ["Phendrana Canyon", new Location("Phendrana Canyon", "a20a7455.mrea", 0x001000E1)],
            ["Quarantine Cave", new Location("Quarantine Cave", "70181194.mrea", 0x001801CA)],
            ["Quarantine Monitor", new Location("Quarantine Monitor", "2191a05d.mrea", 0x001B0011)],
            ["Research Lab Hydra", new Location("Research Lab Hydra", "43e4cc25.mrea", 0x00190513)],
            ["Observatory", new Location("Observatory", "3fb4a34e.mrea", 0x001E02F6)],
            ["Control Tower", new Location("Control Tower", "b3c33249.mrea", 0x002704CF)],
            ["Research Lab Aether (Tank)", new Location("Research Lab Aether (Tank)", "21b4bff6.mrea", 0x003303E0)],
            ["Research Lab Aether (Morph Track)", new Location("Research Lab Aether (Morph Track)", "21b4bff6.mrea", 0x00330411)],
            ["Research Core", new Location("Research Core", "a49b2544.mrea", 0x0428011C)],
            ["Transport Access", new Location("Transport Access", "d695b958.mrea", 0x01F00A5)],
            ["Frost Cave", new Location("Frost Cave", "4c6f7773.mrea", 0x00290187)],
            ["Storage Cave", new Location("Storage Cave", "f7c84340.mrea", 0x003600A9)],
            ["Security Cave", new Location("Security Cave", "3c9490e5.mrea", 0x00370019)],
            ["Gravity Chamber (Underwater)", new Location("Gravity Chamber (Underwater)", "49175472.mrea", 0x0035001F)],
            ["Gravity Chamber (Grapple Ledge)", new Location("Gravity Chamber (Grapple Ledge)", "49175472.mrea", 0x0035012C)]
        ]);
    }

    public initNoGlitches(): void {
        this.locations.get("Phendrana Shorelines (Behind Ice)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.PLASMA_BEAM);
        };

        this.locations.get("Phendrana Shorelines (Spider Track)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.canFireSuperMissiles() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.SPIDER_BALL);
        };

        this.locations.get("Chozo Ice Temple").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.PLASMA_BEAM);
        };

        this.locations.get("Ice Ruins West").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.PLASMA_BEAM);
        };

        this.locations.get("Ice Ruins East (Behind Ice)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.PLASMA_BEAM);
        };

        this.locations.get("Ice Ruins East (Spider Track)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.SPIDER_BALL);
        };

        this.locations.get("Chapel of the Elders").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
        };
        this.locations.get("Chapel of the Elders").canEscape = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.WAVE_BEAM) && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || items.canLayBombs());
        };

        this.locations.get("Ruined Courtyard").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM);
        };

        this.locations.get("Phendrana Canyon").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.hasPhendranaReqs();
        };
        // You'll softlock if you destroy the boxes, and don't have space jump or boost
        this.locations.get("Phendrana Canyon").canEscape = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.SPACE_JUMP_BOOTS) || items.has(PrimeItemName.BOOST_BALL);
        };

        this.locations.get("Quarantine Cave").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
                    && items.has(PrimeItemName.THERMAL_VISOR)) || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.THERMAL_VISOR));
        };
        this.locations.get("Quarantine Cave").canEscape = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.SPIDER_BALL) || items.has(PrimeItemName.GRAPPLE_BEAM);
        };

        this.locations.get("Quarantine Monitor").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
                    && items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.GRAPPLE_BEAM)) || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.GRAPPLE_BEAM));
        };

        this.locations.get("Research Lab Hydra").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.canFireSuperMissiles() && items.has(PrimeItemName.THERMAL_VISOR)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.ICE_BEAM)));
        };

        this.locations.get("Observatory").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.ICE_BEAM));
        };

        this.locations.get("Control Tower").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.PLASMA_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.ICE_BEAM)));
        };

        this.locations.get("Research Lab Aether (Tank)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.ICE_BEAM));
        };

        this.locations.get("Research Lab Aether (Morph Track)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.ICE_BEAM));
        };

        this.locations.get("Research Core").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return (items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.ICE_BEAM));
        };
        this.locations.get("Research Core").canEscape = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.ICE_BEAM);
        }

        this.locations.get("Transport Access").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.THERMAL_VISOR) && items.has(PrimeItemName.PLASMA_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
                && items.has(PrimeItemName.SPIDER_BALL))
                || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItemName.ICE_BEAM)));
        };

        this.locations.get("Frost Cave").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.GRAPPLE_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || items.hasBackwardsPhendranaReqs());
        };

        this.locations.get("Storage Cave").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.canLayPowerBombs() && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.PLASMA_BEAM) && items.has(PrimeItemName.GRAPPLE_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
                    && items.has(PrimeItemName.THERMAL_VISOR))
                || items.hasBackwardsPhendranaReqs());
        };

        this.locations.get("Security Cave").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.GRAPPLE_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || items.hasBackwardsPhendranaReqs());
        };

        this.locations.get("Gravity Chamber (Underwater)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.ICE_BEAM)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM))
                || items.hasBackwardsPhendranaReqs());
        };
        this.locations.get("Gravity Chamber (Underwater)").canEscape = function(item: Item, items: ItemCollection): boolean {
            return items.has(PrimeItemName.GRAVITY_SUIT) && (items.has(PrimeItemName.THERMAL_VISOR) || items.hasBackwardsPhendranaReqs());
        }

        this.locations.get("Gravity Chamber (Grapple Ledge)").canFillItem = function(item: Item, items: ItemCollection): boolean {
            return items.canLayPowerBombs() && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.PLASMA_BEAM) && items.has(PrimeItemName.GRAVITY_SUIT)
                && ((items.hasPhendranaReqs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS) && items.has(PrimeItemName.WAVE_BEAM)
                    && items.has(PrimeItemName.THERMAL_VISOR))
                || items.hasBackwardsPhendranaReqs());
        };
    }
}
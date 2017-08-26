import { Location } from './Location';
import { RandomizerLogic } from './enums/RandomizerLogic';

export abstract class Region {
    protected name: string;
    protected locations: Map<string, Location>;

    public init(logic: string = RandomizerLogic.NO_GLITCHES): void {
        switch (logic) {
            case RandomizerLogic.NO_GLITCHES:
            default:
                this.initNoGlitches();
        }
    }

    public abstract initNoGlitches(): void;

    public getLocations(): Map<string, Location> {
        return this.locations;
    }
}
import { Location } from './Location';
import { RandomizerType } from './enums/RandomizerType';

export abstract class Region {
    protected name: string;
    protected locations: Map<string, Location>;

    public init(logic: string = RandomizerType.NO_GLITCHES): void {
        switch (logic) {
            case RandomizerType.NO_GLITCHES:
            default:
                this.initNoGlitches();
        }
    }

    public abstract initNoGlitches(): void;

    public getLocations(): Map<string, Location> {
        return this.locations;
    }
}
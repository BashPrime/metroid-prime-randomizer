import { Location } from './Location';

export abstract class Region {
    protected name: string;
    protected locations: Map<string, Location>;

    public init(logic: string = "NoGlitches"): void {
        switch (logic) {
            case "NoGlitches":
            default:
                this.initNoGlitches();
        }
    }

    public abstract initNoGlitches(): void;
}
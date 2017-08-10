import { Location } from './Location';

export abstract class Region {
    protected name: string;
    protected locations: Map<String, Location>;
}
import { Region } from './Region';
import { Location } from './Location';

export class World {
    protected mode: string;
    protected logic: string;
    protected difficulty: string;
    protected regions: Array<Region>;
    protected locations: Array<Location>;
}
import { Region } from '../Region';
import { Location } from '../Location';

export class MagmoorCaverns extends Region {
    constructor() {
        super();
        this.locations = new Map<string, Location>([
            ["Lava Lake", new Location("Lava Lake", "a4719c6a.mrea", 0x0004287c)],
            ["Triclops Pit", new Location("Triclops Pit", "bad9edbf.mrea", 0x0006010c)],
            ["Storage Cavern", new Location("Storage Cavern", "adef843e.mrea", 0x0008000f)],
            ["Transport Tunnel A", new Location("Transport Tunnel A", "47f2c087.mrea", 0x000a0006)],
            ["Shore Tunnel", new Location("Shore Tunnel", "901040df.mrea", 0x000c0028)],
            ["Fiery Shores (Morph Track)", new Location("Fiery Shores (Morph Track)", "f5ef1862.mrea", 0x000e01da)],
            ["Fiery Shores (Warrior Shrine Tunnel)", new Location("Fiery Shores (Warrior Shrine Tunnel)", "f5ef1862.mrea", 0x000e023f)],
            ["Warrior Shrine", new Location("Warrior Shrine", "89a6cb8d.mrea", 0x000b0037)],
            ["Plasma Processing", new Location("Plasma Processing", "4cc18e5a.mrea", 0x0015001f)],
            ["Magmoor Workstation", new Location("Magmoor Workstation", "8abeb3c3.mrea", 0x0017028e)],
        ]);
    }

    public initNoGlitches(): void {
        
    }
}
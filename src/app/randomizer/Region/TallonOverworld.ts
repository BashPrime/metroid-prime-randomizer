import { Region } from '../Region';
import { Location } from '../Location';

export class TallonOverWorld extends Region {
    constructor() {
        super();
        this.locations = new Map<string, Location>([
            ["Landing Site", new Location("Landing Site", "b2701146.mrea", 0x0000007e)],
            ["Alcove", new Location("Alcove", "c44e7a07.mrea", 0x00040007)],
            ["Root Cave", new Location("Root Cave", "bd8c8625.mrea", 0x000f0032)],
            ["Arbor Chamber", new Location("Arbor Chamber", "24f8aff3.mrea", 0x00140015)],
            ["Transport Tunnel B", new Location("Transport Tunnel B", "c7e821ba.mrea", 0x00130136)],
            ["Frigate Crash Site",  new Location("Frigate Crash Site", "b9abcd56.mrea", 0x000801fb)],
            ["Overgrown Cavern", new Location("Overgrown Cavern", "cea263e3.mrea", 0x000d00c6)],
            ["Cargo Freight Lift to Deck Gamma", new Location("Cargo Freight Lift to Deck Gamma", "37b3afe6.mrea", 0x001b0015)],
            ["Biohazard Containment", new Location("Biohazard Containment", "ac2c58fe.mrea", 0x001e02ec)],
            ["Hydro Access Tunnel", new Location("Hydro Access Tunnel", "ffb4a966.mrea", 0x00230053)],
            ["Great Tree Chamber", new Location("Great Tree Chamber", "c5d6a597.mrea", 0x0025000d)],
            ["Life Grove Tunnel", new Location("Life Grove Tunnel", "b4fbbef5.mrea", 0x00270036)],
            ["Life Grove (Start)", new Location("Life Grove (Start)", "86eb2e02.mrea", 0x002a0021)],
            ["Life Grove (Underwater Spinner)", new Location("Life Grove (Underwater Spinner)", "86eb2e02.mrea", 0x002a0234)],
            ["Artifact Temple", new Location("Artifact Temple", "2398e906.mrea", 0x41001d4)],
        ]);
    }

    public initNoGlitches(): void {
        
    }
}
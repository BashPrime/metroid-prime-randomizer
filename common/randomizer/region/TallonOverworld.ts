import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItem} from '../enums/PrimeItem';

export class TallonOverworld extends Region {
  constructor() {
    super();
    this.name = 'Tallon Overworld';
    this.locations = new Map<string, Location>([
      ['Landing Site', new Location('Landing Site', 'b2701146.mrea', 0x0000007e)],
      ['Alcove', new Location('Alcove', 'c44e7a07.mrea', 0x00040007, true)],
      ['Frigate Crash Site', new Location('Frigate Crash Site', 'b9abcd56.mrea', 0x000801fb)],
      ['Overgrown Cavern', new Location('Overgrown Cavern', 'cea263e3.mrea', 0x000d00c6)],
      ['Root Cave', new Location('Root Cave', 'bd8c8625.mrea', 0x000f0032)],
      ['Artifact Temple', new Location('Artifact Temple', '2398e906.mrea', 0x41001d4, true)],
      ['Transport Tunnel B', new Location('Transport Tunnel B', 'c7e821ba.mrea', 0x00130136)],
      ['Arbor Chamber', new Location('Arbor Chamber', '24f8aff3.mrea', 0x00140015)],
      ['Cargo Freight Lift to Deck Gamma', new Location('Cargo Freight Lift to Deck Gamma', '37b3afe6.mrea', 0x001b0015, true)],
      ['Biohazard Containment', new Location('Biohazard Containment', 'ac2c58fe.mrea', 0x001e02ec)],
      ['Hydro Access Tunnel', new Location('Hydro Access Tunnel', 'ffb4a966.mrea', 0x00230053, true)],
      ['Great Tree Chamber', new Location('Great Tree Chamber', 'c5d6a597.mrea', 0x0025000d)],
      ['Life Grove Tunnel', new Location('Life Grove Tunnel', 'b4fbbef5.mrea', 0x00270036)],
      ['Life Grove (Start)', new Location('Life Grove (Start)', '86eb2e02.mrea', 0x002a0021, true)],
      ['Life Grove (Underwater Spinner)', new Location('Life Grove (Underwater Spinner)', '86eb2e02.mrea', 0x002a0234, true)],
    ]);
  }

  public init(settings: any): void {
    this.locations.get('Landing Site').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get('Alcove').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return settings.dashing // Space Jump first scan dash
        || (settings.dbj && items.canLayBombs()) // DBJ off the ship to the ledge
        || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)) || items.has(PrimeItem.SPACE_JUMP_BOOTS); // glitchless
    };

    this.locations.get('Artifact Temple').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Root Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (items.has(PrimeItem.GRAPPLE_BEAM) || settings.dashing) // allow dashing to skip grapple beam
      && (items.has(PrimeItem.XRAY_VISOR) || !settings.requireVisors); // Require Visors check
    };

    this.locations.get('Arbor Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (items.has(PrimeItem.PLASMA_BEAM) || settings.rootCaveSW) // plasma or wallcrawl from root cave
      && (items.has(PrimeItem.GRAPPLE_BEAM) || settings.dashing) // allow dashing to skip grapple beam
      && (items.has(PrimeItem.XRAY_VISOR) || !settings.requireVisors); // Require Visors check
    };

    this.locations.get('Transport Tunnel B').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Frigate Crash Site').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && (
        settings.dashing // scan dash from the shore
          || (settings.ghettoJumping && !items.has(PrimeItem.GRAVITY_SUIT)) // ghetto jump underwater
          || (items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // developer intended
      );
    };

    this.locations.get('Overgrown Cavern').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasReflectingPoolReqs(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // Through late chozo
      || items.canClimbFrigateCrashSite(settings) && items.has(PrimeItem.MORPH_BALL_BOMB) // FCS Climb
    };

    this.locations.get('Cargo Freight Lift to Deck Gamma').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasCrashedFrigateReqs(settings);
    };

    this.locations.get('Biohazard Containment').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasCrashedFrigateReqs(settings) && items.canFireSuperMissiles();
    };

    this.locations.get('Hydro Access Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasCrashedFrigateReqs(settings) && items.canLayBombs())
      || (settings.barsSkip && items.canLayBombs() && items.hasReflectingPoolReqs(settings) && items.has(PrimeItem.GRAVITY_SUIT)
        && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)); // bars skip
    };

    this.locations.get('Great Tree Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.has(PrimeItem.XRAY_VISOR) || !settings.requireVisors) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };

    this.locations.get('Life Grove Tunnel').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && ((settings.barsSkip && settings.halfPipeBombJumps) || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };

    this.locations.get('Life Grove (Start)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && (settings.halfPipeBombJumps || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };

    this.locations.get('Life Grove (Underwater Spinner)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && ((settings.halfPipeBombJumps && settings.spinnerManip) || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };
  }
}

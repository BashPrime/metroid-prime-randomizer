import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItem } from '../enums/PrimeItem';
import { PrimeLocation } from '../enums/PrimeLocation';

export class TallonOverworld extends Region {
  constructor() {
    super();
    this.name = 'Tallon Overworld';
    this.locations = new Map<string, Location>([
      [PrimeLocation.LANDING_SITE, new Location(PrimeLocation.LANDING_SITE, 'b2701146.mrea', 0x0000007e)],
      [PrimeLocation.ALCOVE, new Location(PrimeLocation.ALCOVE, 'c44e7a07.mrea', 0x00040007, true)],
      [PrimeLocation.FRIGATE_CRASH_SITE, new Location(PrimeLocation.FRIGATE_CRASH_SITE, 'b9abcd56.mrea', 0x000801fb)],
      [PrimeLocation.OVERGROWN_CAVERN, new Location(PrimeLocation.OVERGROWN_CAVERN, 'cea263e3.mrea', 0x000d00c6)],
      [PrimeLocation.ROOT_CAVE, new Location(PrimeLocation.ROOT_CAVE, 'bd8c8625.mrea', 0x000f0032)],
      [PrimeLocation.ARTIFACT_TEMPLE, new Location(PrimeLocation.ARTIFACT_TEMPLE, '2398e906.mrea', 0x41001d4, true)],
      [PrimeLocation.TRANSPORT_TUNNEL_B, new Location(PrimeLocation.TRANSPORT_TUNNEL_B, 'c7e821ba.mrea', 0x00130136)],
      [PrimeLocation.ARBOR_CHAMBER, new Location(PrimeLocation.ARBOR_CHAMBER, '24f8aff3.mrea', 0x00140015)],
      [PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA, new Location(PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA, '37b3afe6.mrea', 0x001b0015, true)],
      [PrimeLocation.BIOHAZARD_CONTAINMENT, new Location(PrimeLocation.BIOHAZARD_CONTAINMENT, 'ac2c58fe.mrea', 0x001e02ec)],
      [PrimeLocation.HYDRO_ACCESS_TUNNEL, new Location(PrimeLocation.HYDRO_ACCESS_TUNNEL, 'ffb4a966.mrea', 0x00230053, true)],
      [PrimeLocation.GREAT_TREE_CHAMBER, new Location(PrimeLocation.GREAT_TREE_CHAMBER, 'c5d6a597.mrea', 0x0025000d)],
      [PrimeLocation.LIFE_GROVE_TUNNEL, new Location(PrimeLocation.LIFE_GROVE_TUNNEL, 'b4fbbef5.mrea', 0x00270036)],
      [PrimeLocation.LIFE_GROVE_START, new Location(PrimeLocation.LIFE_GROVE_START, '86eb2e02.mrea', 0x002a0021, true)],
      [PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER, new Location(PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER, '86eb2e02.mrea', 0x002a0234, true)],
    ]);
  }

  public init(settings: any): void {
    this.locations.get(PrimeLocation.LANDING_SITE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get(PrimeLocation.ALCOVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return settings.dashing // Space Jump first scan dash
        || (settings.standableTerrain && settings.dbj && items.canLayBombs()) // DBJ off the ship to the ledge
        || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)) || items.has(PrimeItem.SPACE_JUMP_BOOTS); // glitchless
    };

    this.locations.get(PrimeLocation.ARTIFACT_TEMPLE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get(PrimeLocation.ROOT_CAVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (items.has(PrimeItem.GRAPPLE_BEAM) || settings.dashing) // allow dashing to skip grapple beam
        && (items.has(PrimeItem.XRAY_VISOR) || !settings.requireVisors); // Require Visors check, invisible platforms
    };

    this.locations.get(PrimeLocation.ARBOR_CHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (items.has(PrimeItem.PLASMA_BEAM) || (settings.rootCaveSW && items.canWallcrawl(settings))) // plasma or wallcrawl from root cave
        && (items.has(PrimeItem.GRAPPLE_BEAM) || settings.dashing) // allow dashing to skip grapple beam
        && (items.has(PrimeItem.XRAY_VISOR) || !settings.requireVisors); // Require Visors check, invisible platforms
    };

    this.locations.get(PrimeLocation.TRANSPORT_TUNNEL_B).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get(PrimeLocation.FRIGATE_CRASH_SITE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && (
        settings.dashing // scan dash from the shore
        || (settings.ghettoJumping && !items.has(PrimeItem.GRAVITY_SUIT)) // ghetto jump underwater
        || (items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // developer intended
      );
    };

    this.locations.get(PrimeLocation.OVERGROWN_CAVERN).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canClimbFrigateCrashSite(settings) // FCS Climb
      || (items.hasReflectingPoolReqs(settings) && items.canLayBombs()); // Through late chozo
    };

    this.locations.get(PrimeLocation.CARGO_FREIGHT_LIFT_TO_DECK_GAMMA).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasCrashedFrigateReqs(settings);
    };

    this.locations.get(PrimeLocation.BIOHAZARD_CONTAINMENT).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasCrashedFrigateReqs(settings) && items.canFireSuperMissiles();
    };

    this.locations.get(PrimeLocation.HYDRO_ACCESS_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasCrashedFrigateReqs(settings) && items.canLayBombs())
        || (settings.barsSkip && items.canLayBombs() && items.hasReflectingPoolReqs(settings) && items.has(PrimeItem.GRAVITY_SUIT)
          && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)); // bars skip
    };

    this.locations.get(PrimeLocation.GREAT_TREE_CHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR)) // invisible platform
        && (
          items.hasReflectingPoolReqs(settings)
          || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
        );
    };

    this.locations.get(PrimeLocation.LIFE_GROVE_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && (settings.halfPipeBombJumps || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };

    this.locations.get(PrimeLocation.LIFE_GROVE_START).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && (settings.halfPipeBombJumps || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };

    this.locations.get(PrimeLocation.LIFE_GROVE_UNDERWATER_SPINNER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
      && (settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL))
      && ((settings.halfPipeBombJumps && settings.spinnersNoBoost) || items.has(PrimeItem.BOOST_BALL))
      && (
        items.hasReflectingPoolReqs(settings)
        || (items.hasCrashedFrigateReqs(settings) && items.canLayBombs() && (settings.barsSkip || items.has(PrimeItem.BOOST_BALL))) // reverse bars skip
      );
    };
  }
}

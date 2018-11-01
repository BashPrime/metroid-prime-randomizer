import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItem } from '../enums/PrimeItem';
import { PrimeLocation } from '../enums/PrimeLocation';

export class MagmoorCaverns extends Region {
  constructor() {
    super();
    this.name = 'Magmoor Caverns';
    this.locations = new Map<string, Location>([
      [PrimeLocation.LAVA_LAKE, new Location(PrimeLocation.LAVA_LAKE, 'a4719c6a.mrea', 0x0004287c, true)],
      [PrimeLocation.TRICLOPS_PIT, new Location(PrimeLocation.TRICLOPS_PIT, 'bad9edbf.mrea', 0x0006010c)],
      [PrimeLocation.STORAGE_CAVERN, new Location(PrimeLocation.STORAGE_CAVERN, 'adef843e.mrea', 0x0008000f)],
      [PrimeLocation.TRANSPORT_TUNNEL_A, new Location(PrimeLocation.TRANSPORT_TUNNEL_A, '47f2c087.mrea', 0x000a0006, true)],
      [PrimeLocation.WARRIOR_SHRINE, new Location(PrimeLocation.WARRIOR_SHRINE, '89a6cb8d.mrea', 0x000b0037, true)],
      [PrimeLocation.SHORE_TUNNEL, new Location(PrimeLocation.SHORE_TUNNEL, '901040df.mrea', 0x000c0028, true)],
      [PrimeLocation.FIERY_SHORES_MORPH_TRACK, new Location(PrimeLocation.FIERY_SHORES_MORPH_TRACK, 'f5ef1862.mrea', 0x000e01da)],
      [PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL, new Location(PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL, 'f5ef1862.mrea', 0x000e023f)],
      [PrimeLocation.PLASMA_PROCESSING, new Location(PrimeLocation.PLASMA_PROCESSING, '4cc18e5a.mrea', 0x0015001f, true)],
      [PrimeLocation.MAGMOOR_WORKSTATION, new Location(PrimeLocation.MAGMOOR_WORKSTATION, '8abeb3c3.mrea', 0x0017028e, true)],
    ]);
  }

  public init(settings: any): void {
    this.locations.get(PrimeLocation.LAVA_LAKE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.hasMissiles() && items.has(PrimeItem.MORPH_BALL)
        && items.has(PrimeItem.SPACE_JUMP_BOOTS) && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR));
    };

    this.locations.get(PrimeLocation.TRICLOPS_PIT).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.hasMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR));
    };

    this.locations.get(PrimeLocation.STORAGE_CAVERN).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get(PrimeLocation.TRANSPORT_TUNNEL_A).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.canLayBombs();
    };

    this.locations.get(PrimeLocation.SHORE_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.canLayPowerBombs();
    };
    this.locations.get(PrimeLocation.SHORE_TUNNEL).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);

      return items.has(PrimeItem.SPACE_JUMP_BOOTS) || (settings.dbj && items.canLayBombs());
    };

    this.locations.get(PrimeLocation.FIERY_SHORES_MORPH_TRACK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && (
        (settings.standableTerrain && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // jump on the morph ball tunnel to reach the item
        || items.canLayBombs() // morph and bomb through the tunnel, developer intended
      );
    };

    this.locations.get(PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings) && items.canLayPowerBombs() && (
        !(settings.noBombsPointOfNoReturnTunnels && settings.shuffleBombs)
        || items.has(PrimeItem.MORPH_BALL_BOMB)
      ) // handle morph ball bombs in this location
        && ((settings.dbj && items.canLayBombs()) || items.has(PrimeItem.SPACE_JUMP_BOOTS))
        && (
          settings.dashing // dash to the door off a puffer/pirate
          || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)) // spinner, bombs to avoid softlocking
        );
    };
    this.locations.get(PrimeLocation.FIERY_SHORES_WARRIOR_SHRINE_TUNNEL).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    this.locations.get(PrimeLocation.WARRIOR_SHRINE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasEarlyMagmoorItemReqs(settings)
        && ((settings.dbj && items.canLayBombs()) || items.has(PrimeItem.SPACE_JUMP_BOOTS))
        && (
          settings.dashing // dash to the door off a puffer/pirate
          || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)) // spinner, bombs to avoid softlocking
        );
    };

    this.locations.get(PrimeLocation.PLASMA_PROCESSING).canFillItem = function (item: Item, items: ItemCollection): boolean {
      // workstation or burning trail wallcrawl
      if (settings.workstationToPlasmaProcessing) {
        return items.hasLateMagmoorItemReqs(settings) && items.canWallcrawl(settings)
        && (items.has(PrimeItem.ICE_BEAM) || (!settings.noVanillaBeams || items.has(PrimeItem.PLASMA_BEAM)));
      }

      return items.hasLateMagmoorItemReqs(settings) && items.has(PrimeItem.ICE_BEAM) && items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)
      && (!settings.noVanillaBeams || items.has(PrimeItem.PLASMA_BEAM)) // require plasma if no vanilla beams is checked
      && (((settings.lJumping || settings.rJumping) && settings.ghettoJumping) || items.has(PrimeItem.GRAPPLE_BEAM)) // skip grapple beam to the spinners
      && ((settings.ghettoJumping && settings.lJumping) || items.has(PrimeItem.SPIDER_BALL)); // ghetto to the bomb slot, spider track platforms
    };
    this.locations.get(PrimeLocation.PLASMA_PROCESSING).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.MAGMOOR_WORKSTATION).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLateMagmoorItemReqs(settings) && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.WAVE_BEAM)
        && (!settings.requireVisors || items.has(PrimeItem.THERMAL_VISOR)); // power conduits
    };
  }
}

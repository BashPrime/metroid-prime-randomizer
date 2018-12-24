import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItem } from '../enums/PrimeItem';
import { PrimeLocation } from '../enums/PrimeLocation';

export class PhendranaDrifts extends Region {
  constructor() {
    super();
    this.name = 'Phendrana Drifts';
    this.locations = new Map<string, Location>([
      [PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE, new Location(PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE, 'f7285979.mrea', 0x0002016E)],
      [PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK, new Location(PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK, 'f7285979.mrea', 0x00020176)],
      [PrimeLocation.CHOZO_ICE_TEMPLE, new Location(PrimeLocation.CHOZO_ICE_TEMPLE, '6655f51e.mrea', 0x00080257, true)],
      [PrimeLocation.ICE_RUINS_WEST, new Location(PrimeLocation.ICE_RUINS_WEST, 'b33a0620.mrea', 0x000928ED)],
      [PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE, new Location(PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE, 'dafcc26f.mrea', 0x000A00AB)],
      [PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK, new Location(PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK, 'dafcc26f.mrea', 0x000A0191)],
      [PrimeLocation.CHAPEL_OF_THE_ELDERS, new Location(PrimeLocation.CHAPEL_OF_THE_ELDERS, '40c548e9.mrea', 0x000E0058, true)],
      [PrimeLocation.RUINED_COURTYARD, new Location(PrimeLocation.RUINED_COURTYARD, '1921876d.mrea', 0x000F022C, true)],
      [PrimeLocation.PHENDRANA_CANYON, new Location(PrimeLocation.PHENDRANA_CANYON, 'a20a7455.mrea', 0x001000E1, true)],
      [PrimeLocation.QUARANTINE_CAVE, new Location(PrimeLocation.QUARANTINE_CAVE, '70181194.mrea', 0x001801CA, true)],
      [PrimeLocation.RESEARCH_LAB_HYDRA, new Location(PrimeLocation.RESEARCH_LAB_HYDRA, '43e4cc25.mrea', 0x00190513)],
      [PrimeLocation.QUARANTINE_MONITOR, new Location(PrimeLocation.QUARANTINE_MONITOR, '2191a05d.mrea', 0x001B0011)],
      [PrimeLocation.OBSERVATORY, new Location(PrimeLocation.OBSERVATORY, '3fb4a34e.mrea', 0x001E02F6, true)],
      [PrimeLocation.TRANSPORT_ACCESS, new Location(PrimeLocation.TRANSPORT_ACCESS, 'd695b958.mrea', 0x01F00A5, true)],
      [PrimeLocation.CONTROL_TOWER, new Location(PrimeLocation.CONTROL_TOWER, 'b3c33249.mrea', 0x002704CF, true)],
      [PrimeLocation.RESEARCH_CORE, new Location(PrimeLocation.RESEARCH_CORE, 'a49b2544.mrea', 0x0428011C, true)],
      [PrimeLocation.FROST_CAVE, new Location(PrimeLocation.FROST_CAVE, '4c6f7773.mrea', 0x00290187)],
      [PrimeLocation.RESEARCH_LAB_AETHER_TANK, new Location(PrimeLocation.RESEARCH_LAB_AETHER_TANK, '21b4bff6.mrea', 0x003303E0, true)],
      [PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK, new Location(PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK, '21b4bff6.mrea', 0x00330411)],
      [PrimeLocation.GRAVITY_CHAMBER_UNDERWATER, new Location(PrimeLocation.GRAVITY_CHAMBER_UNDERWATER, '49175472.mrea', 0x0035001F, true)],
      [PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE, new Location(PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE, '49175472.mrea', 0x0035012C)],
      [PrimeLocation.STORAGE_CAVE, new Location(PrimeLocation.STORAGE_CAVE, 'f7c84340.mrea', 0x003600A9, true)],
      [PrimeLocation.SECURITY_CAVE, new Location(PrimeLocation.SECURITY_CAVE, '3c9490e5.mrea', 0x00370019)]
    ]);
  }

  public init(settings: any): void {
    this.locations.get(PrimeLocation.PHENDRANA_SHORELINES_BEHIND_ICE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && (
        items.has(PrimeItem.PLASMA_BEAM) // developer intended
        || (settings.infiniteSpeedEarlySun && items.has(PrimeItem.WAVE_BEAM) && items.canDoInfiniteSpeed()) // Early Sun IS inbounds
      );
    };

    this.locations.get(PrimeLocation.PHENDRANA_SHORELINES_SPIDER_TRACK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.canFireSuperMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get(PrimeLocation.CHOZO_ICE_TEMPLE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && (
        items.has(PrimeItem.PLASMA_BEAM) // developer intended
        || (settings.infiniteSpeedEarlySun && items.canDoInfiniteSpeed() && ((settings.waveSun && items.canWallcrawl(settings)) || items.has(PrimeItem.WAVE_BEAM))) // Early Sun IS
      );
    };

    this.locations.get(PrimeLocation.ICE_RUINS_WEST).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.ICE_RUINS_EAST_BEHIND_ICE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.ICE_RUINS_EAST_SPIDER_TRACK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get(PrimeLocation.CHAPEL_OF_THE_ELDERS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (!(settings.noVanillaBeams || settings.hideItemIcons) || items.has(PrimeItem.WAVE_BEAM)) // no vanilla beams handling
        && (!(settings.infiniteSpeedEarlySun && settings.waveSun) || items.has(PrimeItem.BOOST_BALL)); // wave/sun IS needs boost ball
    };
    this.locations.get(PrimeLocation.CHAPEL_OF_THE_ELDERS).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.WAVE_BEAM);
    };

    this.locations.get(PrimeLocation.RUINED_COURTYARD).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMidPhendranaAccess(settings) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
        && ((settings.standableTerrain && settings.lJumping) || ((items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)) || items.has(PrimeItem.SPIDER_BALL)));
    };

    this.locations.get(PrimeLocation.PHENDRANA_CANYON).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFrontPhendranaAccess(settings);
    };
    // You'll softlock if you destroy the boxes, and don't have space jump or boost
    this.locations.get(PrimeLocation.PHENDRANA_CANYON).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.BOOST_BALL);
    };

    this.locations.get(PrimeLocation.QUARANTINE_CAVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasQuarantineCaveAccess(settings)
        && (!settings.requireThermal || items.has(PrimeItem.THERMAL_VISOR)); // to see Thardus's weak points
    };
    this.locations.get(PrimeLocation.QUARANTINE_CAVE).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.GRAPPLE_BEAM);
    };

    this.locations.get(PrimeLocation.QUARANTINE_MONITOR).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasQuarantineCaveAccess(settings) && items.has(PrimeItem.SPIDER_BALL)
        && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM))
        && (!settings.requireThermal || items.has(PrimeItem.THERMAL_VISOR)); // for Thardus
    };

    this.locations.get(PrimeLocation.RESEARCH_LAB_HYDRA).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings)
        && items.canFireSuperMissiles();
    };

    this.locations.get(PrimeLocation.OBSERVATORY).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings) && items.canClimbObservatory(settings);
    };

    this.locations.get(PrimeLocation.CONTROL_TOWER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings) && (settings.standableTerrain || items.has(PrimeItem.PLASMA_BEAM))
      && (
        !(settings.noBombsPointOfNoReturnTunnels && settings.shuffleBombs)
        || items.has(PrimeItem.MORPH_BALL_BOMB)
      );
    };

    this.locations.get(PrimeLocation.RESEARCH_LAB_AETHER_TANK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings);
    };

    this.locations.get(PrimeLocation.RESEARCH_LAB_AETHER_MORPH_TRACK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings);
    };

    this.locations.get(PrimeLocation.RESEARCH_CORE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaPirateLabsAccess(settings);
    };

    this.locations.get(PrimeLocation.TRANSPORT_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.FROST_CAVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings) && ((settings.ghettoJumping || !settings.hideItemIcons) || items.has(PrimeItem.GRAVITY_SUIT)) && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM));
    };

    this.locations.get(PrimeLocation.STORAGE_CAVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings) && items.canLayPowerBombs()
        && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM) || settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT)) // traversing frost or hunter cave
        && ((settings.lJumping && settings.standableTerrain) || items.has(PrimeItem.GRAPPLE_BEAM))
        && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.SECURITY_CAVE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings)
        && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM) || settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT)) // traversing frost or hunter cave
        && ((settings.lJumping && settings.standableTerrain) || items.has(PrimeItem.GRAPPLE_BEAM))
        && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get(PrimeLocation.GRAVITY_CHAMBER_UNDERWATER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings)
      && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM) || settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT)) // traversing frost or hunter cave
      && (!settings.noGravitySuitInGravityChamber || items.has(PrimeItem.GRAVITY_SUIT));
    };
    this.locations.get(PrimeLocation.GRAVITY_CHAMBER_UNDERWATER).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT);
    };

    this.locations.get(PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasFarPhendranaAccess(settings)
        && (settings.dashing || items.has(PrimeItem.GRAPPLE_BEAM) || settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT)) // traversing frost or hunter cave
        && (!settings.noGravitySuitInGravityChamber || items.has(PrimeItem.GRAVITY_SUIT))
        && (
          (settings.rJumping && settings.ghettoJumping)
          || (items.has(PrimeItem.GRAPPLE_BEAM) && items.has(PrimeItem.PLASMA_BEAM))
        );
    };
    this.locations.get(PrimeLocation.GRAVITY_CHAMBER_GRAPPLE_LEDGE).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT);
    };
  }
}

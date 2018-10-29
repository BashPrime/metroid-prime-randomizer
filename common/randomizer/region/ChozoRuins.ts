import { Region } from '../Region';
import { Location } from '../Location';
import { Item } from '../Item';
import { ItemCollection } from '../collection/ItemCollection';
import { PrimeItem } from '../enums/PrimeItem';
import { PrimeLocation } from '../enums/PrimeLocation';

export class ChozoRuins extends Region {
  constructor() {
    super();
    this.name = 'Chozo Ruins';
    this.locations = new Map<string, Location>([
      [PrimeLocation.MAIN_PLAZA_HALF_PIPE, new Location(PrimeLocation.MAIN_PLAZA_HALF_PIPE, 'd5cdb809.mrea', 0x0002012C)],
      [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE, new Location(PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE, 'd5cdb809.mrea', 0x00020131)],
      [PrimeLocation.MAIN_PLAZA_TREE, new Location(PrimeLocation.MAIN_PLAZA_TREE, 'd5cdb809.mrea', 0x0002006A)],
      [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR, new Location(PrimeLocation.MAIN_PLAZA_LOCKED_DOOR, 'd5cdb809.mrea', 0x00020156, true)],
      [PrimeLocation.RUINED_FOUNTAIN, new Location(PrimeLocation.RUINED_FOUNTAIN, '165a4de9.mrea', 0x00080076)],
      [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE, new Location(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE, '3c785450.mrea', 0x00090024, true)],
      [PrimeLocation.RUINED_SHRINE_HALF_PIPE, new Location(PrimeLocation.RUINED_SHRINE_HALF_PIPE, '3c785450.mrea', 0x00090068)],
      [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL, new Location(PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL, '3c785450.mrea', 0x0009006D)],
      [PrimeLocation.VAULT, new Location(PrimeLocation.VAULT, 'ef069019.mrea', 0x000B003D)],
      [PrimeLocation.TRAINING_CHAMBER, new Location(PrimeLocation.TRAINING_CHAMBER, '3f04f304.mrea', 0x000C0026, true)],
      [PrimeLocation.RUINED_NURSERY, new Location(PrimeLocation.RUINED_NURSERY, 'c2576e4d.mrea', 0x00100062)],
      [PrimeLocation.TRAINING_CHAMBER_ACCESS, new Location(PrimeLocation.TRAINING_CHAMBER_ACCESS, '18d186bb.mrea', 0x001400ED)],
      [PrimeLocation.MAGMA_POOL, new Location(PrimeLocation.MAGMA_POOL, '491bfaba.mrea', 0x001400ED)],
      [PrimeLocation.TOWER_OF_LIGHT, new Location(PrimeLocation.TOWER_OF_LIGHT, '0d72f1f7.mrea', 0x00150335, true)],
      [PrimeLocation.TOWER_CHAMBER, new Location(PrimeLocation.TOWER_CHAMBER, '11bd63b7.mrea', 0x001B0019, true)],
      [PrimeLocation.RUINED_GALLERY_MISSILE_WALL, new Location(PrimeLocation.RUINED_GALLERY_MISSILE_WALL, 'e34fd92b.mrea', 0x001C0024)],
      [PrimeLocation.RUINED_GALLERY_TUNNEL, new Location(PrimeLocation.RUINED_GALLERY_TUNNEL, 'e34fd92b.mrea', 0x001C0054)],
      [PrimeLocation.TRANSPORT_ACCESS_NORTH, new Location(PrimeLocation.TRANSPORT_ACCESS_NORTH, '3ad2120f.mrea', 0x001E0172, true)],
      [PrimeLocation.GATHERING_HALL, new Location(PrimeLocation.GATHERING_HALL, '47e73bc5.mrea', 0x00200057)],
      [PrimeLocation.HIVE_TOTEM, new Location(PrimeLocation.HIVE_TOTEM, 'c8309df6.mrea', 0x002401DC, true)],
      [PrimeLocation.SUNCHAMBER_FLAAHGRA, new Location(PrimeLocation.SUNCHAMBER_FLAAHGRA, '9a0a03eb.mrea', 0x002528EE, true)],
      [PrimeLocation.SUNCHAMBER_GHOSTS, new Location(PrimeLocation.SUNCHAMBER_GHOSTS, '9a0a03eb.mrea', 0x18252F7D, true)],
      [PrimeLocation.WATERY_HALL_ACCESS, new Location(PrimeLocation.WATERY_HALL_ACCESS, 'eeec837d.mrea', 0x00260008)],
      [PrimeLocation.WATERY_HALL_SCAN_PUZZLE, new Location(PrimeLocation.WATERY_HALL_SCAN_PUZZLE, '492cbf4a.mrea', 0x00290085, true)],
      [PrimeLocation.WATERY_HALL_UNDERWATER, new Location(PrimeLocation.WATERY_HALL_UNDERWATER, '492cbf4a.mrea', 0x002927E6)],
      [PrimeLocation.DYNAMO_LOWER, new Location(PrimeLocation.DYNAMO_LOWER, '04d6c285.mrea', 0x002D0022)],
      [PrimeLocation.DYNAMO_SPIDER_TRACK, new Location(PrimeLocation.DYNAMO_SPIDER_TRACK, '04d6c285.mrea', 0x002D00AD)],
      [PrimeLocation.BURN_DOME_TUNNEL, new Location(PrimeLocation.BURN_DOME_TUNNEL, '4148f7b0.mrea', 0x00300036)],
      [PrimeLocation.BURN_DOME_I_DRONE, new Location(PrimeLocation.BURN_DOME_I_DRONE, '4148f7b0.mrea', 0x0030278A, true)],
      [PrimeLocation.FURNACE_SPIDER_TRACKS, new Location(PrimeLocation.FURNACE_SPIDER_TRACKS, '2e318473.mrea', 0x0031005E)],
      [PrimeLocation.FURNACE_TUNNEL, new Location(PrimeLocation.FURNACE_TUNNEL, '2e318473.mrea', 0x0031000A, true)],
      [PrimeLocation.HALL_OF_THE_ELDERS, new Location(PrimeLocation.HALL_OF_THE_ELDERS, 'fb54a0cb.mrea', 0x003402DE, true)],
      [PrimeLocation.CROSSWAY, new Location(PrimeLocation.CROSSWAY, '13fff119.mrea', 0x003502C8)],
      [PrimeLocation.ELDER_CHAMBER, new Location(PrimeLocation.ELDER_CHAMBER, 'e1981efc.mrea', 0x00390003, true)],
      [PrimeLocation.ANTECHAMBER, new Location(PrimeLocation.ANTECHAMBER, 'afefe677.mrea', 0x003D0003, true)]
    ]);
  }

  public init(settings: any): void {
    this.locations.get(PrimeLocation.MAIN_PLAZA_HALF_PIPE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.BOOST_BALL)) // developer intended
      || ((settings.ghettoJumping || settings.standableTerrain) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // ghetto or space jump off of the topmost standable portion of ramp
      || (settings.halfPipeBombJumps && items.canLayBombs()); // hpbj to item
    };

    this.locations.get(PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFloatyJump(settings) // floaty jump
      || (settings.standableTerrain && items.has(PrimeItem.GRAPPLE_BEAM)) // Jump from Main Plaza tree and grapple
      || (settings.standableTerrain && settings.dashing && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // dash from tree
      || (items.hasMissiles() && items.canLayBombs() && items.hasAnySuit() && items.has(PrimeItem.GRAPPLE_BEAM)
        && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.WAVE_BEAM)); // developer intended through Magma Pool and Training Chamber
    };

    this.locations.get(PrimeLocation.MAIN_PLAZA_TREE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (settings.trainingChamberOOB && items.canFloatyJump(settings)) // oob + floaty jump
      || (items.canFireSuperMissiles() && (!settings.requireVisors || items.has(PrimeItem.XRAY_VISOR))); // developer intended
    };

    this.locations.get(PrimeLocation.MAIN_PLAZA_LOCKED_DOOR).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMissiles() && items.has(PrimeItem.MORPH_BALL)) // developer intended
      || (settings.lJumping && items.has(PrimeItem.SPACE_JUMP_BOOTS));
    };

    this.locations.get(PrimeLocation.RUINED_FOUNTAIN).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasMissiles() && items.canLayBombs() && items.has(PrimeItem.SPIDER_BALL)) // Defeat Flaahgra
      || (settings.standableTerrain && settings.lJumping && items.has(PrimeItem.MORPH_BALL)
        && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SPIDER_BALL)); // abuse collision to get to item without defeating Flaahgra
    };

    this.locations.get(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };
    this.locations.get(PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);

      return (settings.standableTerrain && settings.dashing) || items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get(PrimeLocation.RUINED_SHRINE_HALF_PIPE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && (
        items.has(PrimeItem.BOOST_BALL) // developer intended
        || ((settings.standableTerrain || settings.ghettoJumping) && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // space jump from branch or ghetto from half pipe
        || (settings.halfPipeBombJumps && items.has(PrimeItem.MORPH_BALL_BOMB)) // half pipe bomb jump
      );
    };

    this.locations.get(PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get(PrimeLocation.VAULT).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get(PrimeLocation.TRAINING_CHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      if (settings.trainingChamberOOB) {
        return items.canWallcrawl(settings) && items.has(PrimeItem.MORPH_BALL_BOMB); // bombs required for ceiling warp
      }

      return items.canCrossMagmaPool(settings) && items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM)
      && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPIDER_BALL); // developer intended route
    };
    this.locations.get(PrimeLocation.TRAINING_CHAMBER).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);

      if (settings.trainingChamberOOB) {
        return (items.has(PrimeItem.WAVE_BEAM) && items.canCrossMagmaPool(settings)) // leave through wave door
          || (items.canLayBombs() && items.has(PrimeItem.BOOST_BALL)); // leave through tunnel opened by bomb slot
      }

      return true; // Since items needed for access are sufficient to escape when done inbounds
    };

    this.locations.get(PrimeLocation.TRAINING_CHAMBER_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      if (settings.trainingChamberOOB) {
        return items.canWallcrawl(settings) && items.has(PrimeItem.MORPH_BALL_BOMB); // bombs required for ceiling warp
      }

      return items.canCrossMagmaPool(settings) && items.canLayBombs() && items.has(PrimeItem.WAVE_BEAM); // developer intended route
    };
    this.locations.get(PrimeLocation.TRAINING_CHAMBER_ACCESS).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);

      if (settings.trainingChamberOOB) {
        return (items.has(PrimeItem.WAVE_BEAM) && items.canCrossMagmaPool(settings)); // leave through wave door
      }

      return true; // Since items needed for access are sufficient to escape when done inbounds
    };

    this.locations.get(PrimeLocation.MAGMA_POOL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canCrossMagmaPool(settings) && items.canLayPowerBombs();
    };

    this.locations.get(PrimeLocation.TOWER_OF_LIGHT).canFillItem = function (item: Item, items: ItemCollection): boolean {
      // 36 missiles/8 missile expansions are needed in a glitchless setting.
      return items.canAccessTowerOfLight(settings) && ((settings.dashing && settings.standableTerrain) || items.hasMissileCount(40 / 5));
    };

    this.locations.get(PrimeLocation.TOWER_CHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canAccessTowerOfLight(settings) && (settings.ghettoJumping || items.has(PrimeItem.GRAVITY_SUIT)); // gravity or underwater ghetto
    };

    this.locations.get(PrimeLocation.RUINED_NURSERY).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get(PrimeLocation.RUINED_GALLERY_MISSILE_WALL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get(PrimeLocation.RUINED_GALLERY_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get(PrimeLocation.TRANSPORT_ACCESS_NORTH).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get(PrimeLocation.GATHERING_HALL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && (
        (settings.dbj && settings.canLayBombs()) // dbj to the item
        || (items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.canLayBombsOrPowerBombs()) // developer intended

      );
    };

    this.locations.get(PrimeLocation.HIVE_TOTEM).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return true; // First developer intended item, has no requirements
    };

    this.locations.get(PrimeLocation.SUNCHAMBER_FLAAHGRA).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get(PrimeLocation.SUNCHAMBER_GHOSTS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && (
        settings.earlyWild // Early Wild IBJ
        || (items.canFireSuperMissiles() && items.has(PrimeItem.SPIDER_BALL)) // developer intended Sun Tower climb
      );
    };

    this.locations.get(PrimeLocation.WATERY_HALL_ACCESS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get(PrimeLocation.WATERY_HALL_SCAN_PUZZLE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL);
    };

    this.locations.get(PrimeLocation.WATERY_HALL_UNDERWATER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && (
        settings.ghettoJumping // ghetto jump off side underwater
        || items.has(PrimeItem.GRAVITY_SUIT) // developer intended
      );
    };

    this.locations.get(PrimeLocation.DYNAMO_LOWER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get(PrimeLocation.DYNAMO_SPIDER_TRACK).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs() && (
        items.canFloatyJump(settings) || items.has(PrimeItem.SPIDER_BALL)
      );
    };

    // Require bombs in burn dome if the no bombs setting is checked, and bombs are shuffled.
    // If bombs are not shuffled, they will be in burn dome, so we need to relax the bomb requirement.
    this.locations.get(PrimeLocation.BURN_DOME_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs() && (
        !(settings.noBombsPointOfNoReturnTunnels && settings.shuffleBombs)
        || items.has(PrimeItem.MORPH_BALL_BOMB)
      );
    };
    this.locations.get(PrimeLocation.BURN_DOME_TUNNEL).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    // Require bombs in burn dome if the no bombs setting is checked and bombs are shuffled.
    // If bombs are not shuffled, they will be in burn dome, so we need to relax the bomb requirement.
    this.locations.get(PrimeLocation.BURN_DOME_I_DRONE).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItem.MORPH_BALL) && (
        !(settings.noBombsPointOfNoReturnTunnels && settings.shuffleBombs)
        || items.has(PrimeItem.MORPH_BALL_BOMB)
      );
    };
    this.locations.get(PrimeLocation.BURN_DOME_I_DRONE).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    this.locations.get(PrimeLocation.FURNACE_SPIDER_TRACKS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && (
        items.canFloatyJump(settings) // floaty jump
        || (settings.standableTerrain && settings.dbj && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.SPIDER_BALL))) // DBJ to item
        || (items.canLayPowerBombs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPIDER_BALL)) // developer intended
      );
    };

    this.locations.get(PrimeLocation.FURNACE_TUNNEL).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get(PrimeLocation.HALL_OF_THE_ELDERS).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLateChozoReqs(settings) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && (
        (settings.standableTerrain && settings.infiniteSpeedHote && items.has(PrimeItem.BOOST_BALL)) // secretize Hote and get infinite speed
        || ((settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL)) && items.has(PrimeItem.ICE_BEAM)) // developer intended
      );
    };

    this.locations.get(PrimeLocation.CROSSWAY).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLateChozoReqs(settings) && (
        (settings.standableTerrain && settings.lJumping && items.has(PrimeItem.SPACE_JUMP_BOOTS)) // L jump and ledge clip into tunnel
        || (items.canLayBombs() && items.canFireSuperMissiles() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPIDER_BALL)) // developer intended
      )
    };

    this.locations.get(PrimeLocation.ELDER_CHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasLateChozoReqs(settings) && items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && (
        (settings.infiniteSpeedHote && items.has(PrimeItem.BOOST_BALL)) // secretize Hote and get infinite speed
        || ((settings.standableTerrain || items.has(PrimeItem.SPIDER_BALL)) && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)) // developer intended
      );
    };

    this.locations.get(PrimeLocation.ANTECHAMBER).canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasReflectingPoolReqs(settings) && items.hasMissiles() && (!settings.noVanillaBeams || items.has(PrimeItem.ICE_BEAM));
    };
    this.locations.get(PrimeLocation.ANTECHAMBER).canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.ICE_BEAM);
    };
  }
}

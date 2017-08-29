import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItemName} from '../ItemType';

export class ChozoRuins extends Region {
  constructor() {
    super();
    this.name = 'Chozo Ruins';
    this.locations = new Map<string, Location>([
      ['Main Plaza (Half-Pipe)', new Location('Main Plaza (Half-Pipe)', 'd5cdb809.mrea', 0x0002012C)],
      ['Main Plaza (Grapple Ledge)', new Location('Main Plaza (Grapple Ledge)', 'd5cdb809.mrea', 0x00020131)],
      ['Main Plaza (Tree)', new Location('Main Plaza (Tree)', 'd5cdb809.mrea', 0x0002006A)],
      ['Main Plaza (Locked Door)', new Location('Main Plaza (Locked Door)', 'd5cdb809.mrea', 0x00020156, true)],
      ['Ruined Fountain', new Location('Ruined Fountain', '165a4de9.mrea', 0x00080076)],
      ['Ruined Shrine (Beetle Battle)', new Location('Ruined Shrine (Beetle Battle)', '3c785450.mrea', 0x00090024, true)],
      ['Ruined Shrine (Half-Pipe)', new Location('Ruined Shrine (Half-Pipe)', '3c785450.mrea', 0x00090068)],
      ['Ruined Shrine (Lower Tunnel)', new Location('Ruined Shrine (Lower Tunnel)', '3c785450.mrea', 0x0009006D)],
      ['Vault', new Location('Vault', 'ef069019.mrea', 0x000B003D)],
      ['Training Chamber', new Location('Training Chamber', '3f04f304.mrea', 0x000C0026, true)],
      ['Ruined Nursery', new Location('Ruined Nursery', 'c2576e4d.mrea', 0x00100062)],
      ['Training Chamber Access', new Location('Training Chamber Access', '18d186bb.mrea', 0x001400ED)],
      ['Magma Pool', new Location('Magma Pool', '491bfaba.mrea', 0x001400ED)],
      ['Tower of Light', new Location('Tower of Light', '0d72f1f7.mrea', 0x00150335, true)],
      ['Tower Chamber', new Location('Tower Chamber', '11bd63b7.mrea', 0x001B0019, true)],
      ['Ruined Gallery (Missile Wall)', new Location('Ruined Gallery (Missile Wall)', 'e34fd92b.mrea', 0x001C0024)],
      ['Ruined Gallery (Tunnel)', new Location('Ruined Gallery (Tunnel)', 'e34fd92b.mrea', 0x001C0054)],
      ['Transport Access North', new Location('Transport Access North', '3ad2120f.mrea', 0x001E0172, true)],
      ['Gathering Hall', new Location('Gathering Hall', '47e73bc5.mrea', 0x00200057)],
      ['Hive Totem', new Location('Hive Totem', 'c8309df6.mrea', 0x002401DC, true)],
      ['Sunchamber (Flaahgra)', new Location('Sunchamber (Flaahgra)', '9a0a03eb.mrea', 0x002528EE, true)],
      ['Sunchamber (Ghosts)', new Location('Sunchamber (Ghosts)', '9a0a03eb.mrea', 0x18252F7D, true)],
      ['Watery Hall Access', new Location('Watery Hall Access', 'eeec837d.mrea', 0x00260008)],
      ['Watery Hall (Scan Puzzle)', new Location('Watery Hall (Scan Puzzle)', '492cbf4a.mrea', 0x00290085, true)],
      ['Watery Hall (Underwater)', new Location('Watery Hall (Underwater)', '492cbf4a.mrea', 0x002927E6)],
      ['Dynamo (Lower)', new Location('Dynamo (Lower)', '04d6c285.mrea', 0x002D0022)],
      ['Dynamo (Spider Track)', new Location('Dynamo (Spider Track)', '04d6c285.mrea', 0x002D00AD)],
      ['Burn Dome (Tunnel)', new Location('Burn Dome (Tunnel)', '4148f7b0.mrea', 0x00300036)],
      ['Burn Dome (I. Drone)', new Location('Burn Dome (I. Drone)', '4148f7b0.mrea', 0x0030278A, true)],
      ['Furnace (Spider Tracks)', new Location('Furnace (Spider Tracks)', '2e318473.mrea', 0x0031005E)],
      ['Furnace (Tunnel)', new Location('Furnace (Tunnel)', '2e318473.mrea', 0x0031000A, true)],
      ['Hall of the Elders', new Location('Hall of the Elders', 'fb54a0cb.mrea', 0x003402DE, true)],
      ['Crossway', new Location('Crossway', '13fff119.mrea', 0x003502C8)],
      ['Elder Chamber', new Location('Elder Chamber', 'e1981efc.mrea', 0x00390003, true)],
      ['Antechamber', new Location('Antechamber', 'afefe677.mrea', 0x003D0003, true)]
    ]);
  }

  public initNoGlitches(): void {
    this.locations.get('Main Plaza (Half-Pipe)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.BOOST_BALL);
    };

    this.locations.get('Main Plaza (Grapple Ledge)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.hasAnySuit() && items.has(PrimeItemName.GRAPPLE_BEAM)
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.WAVE_BEAM);
    };

    this.locations.get('Main Plaza (Tree)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles() && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Main Plaza (Locked Door)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Ruined Fountain').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Ruined Shrine (Beetle Battle)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };
    this.locations.get('Ruined Shrine (Beetle Battle)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItemName.MORPH_BALL) || items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Ruined Shrine (Half-Pipe)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.BOOST_BALL);
    };

    this.locations.get('Ruined Shrine (Lower Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get('Vault').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Training Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.hasAnySuit() && items.has(PrimeItemName.GRAPPLE_BEAM)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Training Chamber Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.GRAPPLE_BEAM)
        && items.has(PrimeItemName.WAVE_BEAM);
    };

    this.locations.get('Magma Pool').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.hasAnySuit() && items.has(PrimeItemName.GRAPPLE_BEAM) && items.canLayPowerBombs();
    };

    this.locations.get('Tower of Light').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissileCount(40 / 5) && items.canLayBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Tower Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)
        && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.GRAVITY_SUIT) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Ruined Nursery').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get('Ruined Gallery (Missile Wall)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Ruined Gallery (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get('Transport Access North').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Gathering Hall').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs() && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Hive Totem').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return true; // Has no requirements when playing Prime normally
    };

    this.locations.get('Sunchamber (Flaahgra)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Sunchamber (Ghosts)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs() && items.canFireSuperMissiles() && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Watery Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Watery Hall (Scan Puzzle)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Watery Hall (Underwater)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.GRAVITY_SUIT) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Dynamo (Lower)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get('Dynamo (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs() && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Burn Dome (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };
    this.locations.get('Burn Dome (Tunnel)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    this.locations.get('Burn Dome (I. Drone)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };
    this.locations.get('Burn Dome (I. Drone)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.canLayBombs();
    };

    this.locations.get('Furnace (Spider Tracks)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL)
        && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Furnace (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Hall of the Elders').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.WAVE_BEAM)
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Crossway').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)
        && items.has(PrimeItemName.WAVE_BEAM);
    };

    this.locations.get('Elder Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.WAVE_BEAM)
        && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.PLASMA_BEAM) && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Antechamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.SPIDER_BALL) && items.has(PrimeItemName.WAVE_BEAM)
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };
    this.locations.get('Antechamber').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItemName.ICE_BEAM);
    };
  }

  public initMinorGlitches(): void {
    this.locations.get('Main Plaza (Half-Pipe)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.BOOST_BALL));
    };

    this.locations.get('Main Plaza (Grapple Ledge)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItemName.GRAPPLE_BEAM) || items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Main Plaza (Tree)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles();
    };

    this.locations.get('Main Plaza (Locked Door)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL));
    };

    this.locations.get('Ruined Fountain').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.SPIDER_BALL)
        && (items.canLayBombs() || items.has(PrimeItemName.SPACE_JUMP_BOOTS));
    };

    this.locations.get('Ruined Shrine (Beetle Battle)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };
    this.locations.get('Ruined Shrine (Beetle Battle)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItemName.MORPH_BALL) || items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Ruined Shrine (Half-Pipe)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles()
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.BOOST_BALL)));
    };

    this.locations.get('Ruined Shrine (Lower Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get('Vault').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Training Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.WAVE_BEAM)
        && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.hasAnySuit() && items.has(PrimeItemName.GRAPPLE_BEAM)));
    };

    this.locations.get('Training Chamber Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.WAVE_BEAM)
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.hasAnySuit() && items.has(PrimeItemName.GRAPPLE_BEAM)));
    };

    this.locations.get('Magma Pool').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL)
      && (
        items.hasAnySuit() && (items.has(PrimeItemName.GRAPPLE_BEAM) || items.canDoInfiniteSpeed())
        || (items.canLayPowerBombs() && items.has(PrimeItemName.ENERGY_TANK) && items.has(PrimeItemName.SPACE_JUMP_BOOTS))
      );
    };

    this.locations.get('Tower of Light').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Tower Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.WAVE_BEAM) && items.has(PrimeItemName.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Ruined Nursery').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get('Ruined Gallery (Missile Wall)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Ruined Gallery (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayBombs();
    };

    this.locations.get('Transport Access North').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles();
    };

    this.locations.get('Gathering Hall').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs()
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || items.canLayBombs());
    };

    this.locations.get('Hive Totem').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return true;
    };

    this.locations.get('Sunchamber (Flaahgra)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Sunchamber (Ghosts)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      // Can do early wild, but can't place any of the following items here to prevent softlocking
      return items.canLayBombs() && items.canFireSuperMissiles() && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Watery Hall Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Watery Hall (Scan Puzzle)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };

    this.locations.get('Watery Hall (Underwater)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL) && items.has(PrimeItemName.ENERGY_TANK);
    };

    this.locations.get('Dynamo (Lower)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };

    this.locations.get('Dynamo (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs() && items.has(PrimeItemName.SPIDER_BALL);
    };

    this.locations.get('Burn Dome (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombsOrPowerBombs();
    };
    this.locations.get('Burn Dome (Tunnel)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.canLayBombs();
    };

    this.locations.get('Burn Dome (I. Drone)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.has(PrimeItemName.MORPH_BALL);
    };
    this.locations.get('Burn Dome (I. Drone)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.canLayBombs();
    };

    this.locations.get('Furnace (Spider Tracks)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs()
        && (
          items.has(PrimeItemName.SPACE_JUMP_BOOTS)
          || (items.canLayPowerBombs() && items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL))
        );
    };

    this.locations.get('Furnace (Tunnel)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs();
    };

    this.locations.get('Hall of the Elders').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.ICE_BEAM)
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)));
    };

    this.locations.get('Crossway').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs()
        && (items.has(PrimeItemName.WAVE_BEAM) || items.has(PrimeItemName.ICE_BEAM))
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS)
          || (items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)));
    };

    this.locations.get('Elder Chamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.ICE_BEAM) && items.has(PrimeItemName.PLASMA_BEAM)
      && (items.has(PrimeItemName.SPACE_JUMP_BOOTS) || (items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)));
    };

    this.locations.get('Antechamber').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasMissiles() && items.canLayBombs() && items.has(PrimeItemName.WAVE_BEAM)
        && (items.has(PrimeItemName.SPACE_JUMP_BOOTS)
          || (items.has(PrimeItemName.BOOST_BALL) && items.has(PrimeItemName.SPIDER_BALL)));
    };
    this.locations.get('Antechamber').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItemName.ICE_BEAM);
    };
  }
}

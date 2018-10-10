import {Collection} from './Collection';
import {Item} from '../Item';
import {PrimeItem} from '../enums/PrimeItem';

export class ItemCollection extends Collection {
  protected items: Array<Item>;
  protected itemCount: Map<string, number>;

  constructor(items: Array<Item> = []) {
    super(items);
    this.itemCount = new Map<string, number>();
    if (this.items.length > 0) {
      for (const item of this.items) {
        this.incrementItemCount(item);
      }
    }
  }

  public get(index: number): Item {
    return super.get(index);
  }

  public add(item: Item): void {
    super.add(item);
    this.incrementItemCount(item);
  }

  public remove(index: number): void {
    if (index > -1) {
      const itemName = this.items[index].getName();
      this.items.splice(index, 1);
      this.itemCount.set(itemName, this.itemCount.get(itemName) - 1);
    }
  }

  public removeItem(itemKey: string): Item {
    const givenItemCount = this.itemCount.get(itemKey);

    if (givenItemCount !== undefined && givenItemCount > 0) {
      const givenItem = Item.get(itemKey);
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].getName() === itemKey) {
          this.remove(i);
          return givenItem;
        }
      }
    }

    return undefined;
  }

  protected incrementItemCount(item: Item) {
    const itemName = item.getName();
    const itemVal = this.itemCount.get(itemName);
    if (itemVal === undefined) {
      this.itemCount.set(itemName, 1);
    } else {
      this.itemCount.set(itemName, itemVal + 1);
    }
  }

  public has(key: string): boolean {
    return this.itemCount.get(key) !== undefined && this.itemCount.get(key) > 0;
  }

  public diff(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.filter(item => !otherItems.has(item.getName())));
  }

  public merge(otherItems: ItemCollection): ItemCollection {
    return new ItemCollection(this.items.concat(otherItems.toArray()));
  }

  public toArray(): Array<Item> {
    return this.items;
  }

  public hasMissiles(): boolean {
    return this.has(PrimeItem.MISSILE_EXPANSION) || this.has(PrimeItem.MISSILE_LAUNCHER);
  }

  public hasMissileCount(count: number): boolean {
    if (this.hasMissiles()) {
      const expansionCount = this.has(PrimeItem.MISSILE_EXPANSION) ? this.itemCount.get(PrimeItem.MISSILE_EXPANSION) : 0;
      // Launcher's count value will almost always be 1 or 0
      const launcherCount = this.has(PrimeItem.MISSILE_LAUNCHER) ? this.itemCount.get(PrimeItem.MISSILE_LAUNCHER) : 0;
      return expansionCount + launcherCount >= count;
    }
    return false;
  }

  public hasEnergyTankCount(count: number): boolean {
    if (this.has(PrimeItem.ENERGY_TANK)) {
      const energyCount = this.has(PrimeItem.ENERGY_TANK) ? this.itemCount.get(PrimeItem.ENERGY_TANK) : 0;
      return energyCount >= count;
    }
    return false;
  }

  public hasAnySuit(): boolean {
    return this.has(PrimeItem.VARIA_SUIT) || this.has(PrimeItem.GRAVITY_SUIT) || this.has(PrimeItem.PHAZON_SUIT);
  }

  public canLayBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.MORPH_BALL_BOMB);
  }

  public canLayPowerBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.POWER_BOMB) || this.has(PrimeItem.POWER_BOMB_EXPANSION));
  }

  public canLayBombsOrPowerBombs(): boolean {
    return this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.MORPH_BALL_BOMB) || this.has(PrimeItem.POWER_BOMB)
      || this.has(PrimeItem.POWER_BOMB_EXPANSION));
  }

  public canFireSuperMissiles(): boolean {
    return this.hasMissiles() && this.has(PrimeItem.CHARGE_BEAM) && this.has(PrimeItem.SUPER_MISSILE);
  }

  // Bare minimum requirements to enter mines from Tallon
  public hasMinesFromTallonReqs(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM);
  }

  public hasMinesFromTallonReqsNoGlitches(): boolean {
    return this.hasMinesFromTallonReqs() && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.GRAVITY_SUIT)
      && this.has(PrimeItem.THERMAL_VISOR);
  }

  // Bare minimum requirements to enter mines from Magmoor
  public hasMinesFromMagmoorReqs(): boolean {
    return this.hasMissiles() && this.canLayBombs() && this.canLayPowerBombs() && this.has(PrimeItem.WAVE_BEAM)
      && this.has(PrimeItem.ICE_BEAM);
  }

  public hasMinesFromMagmoorReqsNoGlitches(): boolean {
    return this.hasMinesFromMagmoorReqs() && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.SPIDER_BALL) && this.hasAnySuit();
  }

  public canDoInfiniteSpeed(): boolean {
    return this.canLayBombs() && this.has(PrimeItem.BOOST_BALL);
  }

  public hasCrashedFrigateReqs(settings: any): boolean {
    // Automatically return false if "No Crashed Frigate" option is selected.
    if (settings.noCrashedFrigate) {
      return false;
    }

    return this.hasMissiles() && this.canLayBombs() && this.has(PrimeItem.SPACE_JUMP_BOOTS)
    && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.GRAVITY_SUIT)
    && (this.has(PrimeItem.THERMAL_VISOR) || !settings.requireVisors) // Thermal Visor for power conduits
  }

  public hasLateChozoReqs(settings: any): boolean {
    // IBBF
    if (settings.ibbf) {
      return this.hasMissiles() && this.canWallcrawl(settings);
    }

    // Inbounds
    return (this.canClimbFrigateCrashSite(settings) && this.canLayBombs()) || ( // FCS climb to reflecting pool
      this.hasMissiles() && this.canLayBombs()
      && (this.has(PrimeItem.SPIDER_BALL) || settings.standableTerrain) // standable collision on furnace spider track
      && (
        (this.has(PrimeItem.WAVE_BEAM) && (this.has(PrimeItem.BOOST_BALL)
          || (settings.lJumping || settings.rJumping || settings.ghettoJumping || settings.halfPipeBombJumps))) // Furnace to Crossway
        || (this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)) // Furnace to Hall of the Elders
      )
      && ((this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.BOOST_BALL)) || this.has(PrimeItem.ICE_BEAM))
    );
  }

  public hasReflectingPoolReqs(settings: any) {
    // Reflecting Pool from Overgrown Cavern Tallon elevator
    if (this.canClimbFrigateCrashSite(settings) && this.has(PrimeItem.MORPH_BALL_BOMB)) {
      return true;
    }

    // Late Chozo reqs
    return this.hasLateChozoReqs(settings)
    && (this.has(PrimeItem.BOOST_BALL) || settings.ghettoJumping)
    && (this.has(PrimeItem.WAVE_BEAM) || settings.hbj)
  }

  public canClimbFrigateCrashSite(settings: any) {
    return settings.standableTerrain && settings.ghettoJumping
    && this.hasMissiles() && this.has(PrimeItem.MORPH_BALL)
    && this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS);
  }

  public canWallcrawl(settings: any): boolean {
    return this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.MORPH_BALL_BOMB) || settings.oobNoBombs);
  }

  public canCrossMagmaPool(settings: any): boolean {
    return (settings.dashing && this.has(PrimeItem.SPACE_JUMP_BOOTS) && (this.hasEnergyTankCount(1) || this.hasAnySuit())) // E tank or suit for safety
    || (this.hasAnySuit() && this.has(PrimeItem.GRAPPLE_BEAM)) // developer intended
  }

  public canAccessTowerOfLight(settings: any): boolean {
    return this.hasMissiles() && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.WAVE_BEAM) && (
      (settings.dashing && settings.standableTerrain) // dash to the door
      || (this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.BOOST_BALL) && this.has(PrimeItem.SPIDER_BALL)) // developer intended
    );
  }

  public hasEarlyMagmoorItemReqs(settings: any): boolean {
    return this.hasMissiles() && (this.hasAnySuit() || (settings.earlyMagmoorNoSuit && this.hasEnergyTankCount(settings.earlyMagmoorNoSuitTanks)));
  }

  public hasLateMagmoorItemReqs(settings: any): boolean {
    return this.hasMissiles() && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
    && (
      (this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPIDER_BALL)) // developer intended to cross Twin Fires Tunnel
      || (settings.dashing || settings.lJumping || settings.rJumping || settings.dbj) // cross Twin Fires Tunnel without morph or spider
    )
    && (this.hasAnySuit() || (settings.vmr && this.hasEnergyTankCount(settings.vmrTanks))); // VMR or suit depending on settings
  }

  // "Front" Phendrana Requirements from Magmoor, near Shorelines
  public hasPhendranaMagmoorWestReqs(settings: any): boolean {
    return this.hasMissiles() && this.canLayBombs()
    && (this.hasAnySuit() || (settings.vmr && settings.dashing && settings.standableTerrain && this.hasEnergyTankCount(settings.vmrTanks) && this.has(PrimeItem.SPACE_JUMP_BOOTS)));
  }

  // "Back" Phendrana Requirements from Magmoor, near Phednrana's Edge/Thardus
  public hasPhendranaMagmoorSouthReqs(settings: any): boolean {
    return this.hasLateMagmoorItemReqs(settings) && (!settings.noPhendranaBombs || this.canLayBombs());
  }

  // Checks whether Magmoor West elevator can be accessed from Magmoor or in Phendrana
  public canAccessPhendranaMagmoorWest(settings): boolean {
    return this.hasPhendranaMagmoorWestReqs(settings) || (
      this.hasPhendranaMagmoorSouthReqs(settings) && this.canLayBombs() && (
        (this.has(PrimeItem.SPIDER_BALL) || settings.ghettoJumping) // through quarantine cave
        || (this.has(PrimeItem.ICE_BEAM) && (this.has(PrimeItem.BOOST_BALL) || settings.dashing) && (this.has(PrimeItem.SPIDER_BALL) || settings.standableTerrain)) // reverse labs (boost to prevent softlocking in observatory)
      )
    );
  }

  // Checks whether Magmoor South elevator can be accessed from Magmoor or in Phendrana
  public canAccessPhendranaMagmoorSouth(settings: any): boolean {
    return this.hasPhendranaMagmoorSouthReqs(settings) || (
      this.hasPhendranaMagmoorWestReqs(settings) && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
      && ((settings.standableTerrain && settings.ghettoJumping) || this.has(PrimeItem.BOOST_BALL)) // climb Ruined Courtyard
      && (
        (this.canFireSuperMissiles() && (this.has(PrimeItem.SPIDER_BALL) || this.has(PrimeItem.GRAPPLE_BEAM))
          && (!settings.requireVisors || this.has(PrimeItem.THERMAL_VISOR))) // through Quarantine cave
        || (this.has(PrimeItem.ICE_BEAM) && (this.has(PrimeItem.BOOST_BALL) || settings.dashing)) // through labs
      )
    );
  }

  public canAccessPhendranaLabs(settings: any, requireBoost: boolean): boolean {
    return (
      this.hasPhendranaMagmoorWestReqs(settings) && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
      && ((settings.standableTerrain && settings.ghettoJumping) || this.has(PrimeItem.BOOST_BALL)) // climb Ruined Courtyard
    ) || (
      this.hasPhendranaMagmoorSouthReqs(settings) && this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.MORPH_BALL)
      && (requireBoost && (this.has(PrimeItem.BOOST_BALL) || settings.dashing)) // prevent softlocking in observatory
      && (this.has(PrimeItem.SPIDER_BALL) || settings.standableTerrain) // access frozen pike from south elevator
    );
  }

  public hasPhendranaReqs(settings: boolean) {
    return this.canAccessPhendranaMagmoorWest(settings) || this.canAccessPhendranaMagmoorSouth(settings);
  }
}

import {Collection} from './Collection';
import {Item} from '../Item';
import {PrimeItem} from '../enums/PrimeItem';
import { HeatDamagePrevention } from '../enums/heatDamagePrevention';

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

  public hasSuit(settings: any): boolean {
    if (settings.heatDamagePrevention === HeatDamagePrevention.VARIA_ONLY) {
      return this.has(PrimeItem.VARIA_SUIT);
    }

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

  public canDoInfiniteSpeed(): boolean {
    return this.canLayBombs() && this.has(PrimeItem.BOOST_BALL);
  }

  public hasCrashedFrigateReqs(settings: any): boolean {
    return this.hasMissiles() && this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
    && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.GRAVITY_SUIT)
    && (this.has(PrimeItem.THERMAL_VISOR) || !settings.requireThermal) // Thermal Visor for power conduits
  }

  public hasLateChozoReqs(settings: any): boolean {
    // IBBF
    if (settings.ibbf) {
      return this.hasMissiles() && this.canWallcrawl(settings);
    }

    // Climb Frigate Crash Site
    if (this.canClimbFrigateCrashSite(settings) && this.canLayBombs()) {
      return true;
    }

    // Otherwise do inbounds check
    return this.hasMissiles() && (this.canLayBombs() || (settings.bypassBombsWithBoost && this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.BOOST_BALL)))
    && (this.has(PrimeItem.SPIDER_BALL) || settings.standableTerrain) // standable collision on furnace spider track
    && (
      (
        this.has(PrimeItem.WAVE_BEAM) && (
          settings.halfPipeBombJumps
          || ((settings.lJumping || settings.rJumping || settings.ghettoJumping) && this.has(PrimeItem.SPACE_JUMP_BOOTS))
          || this.has(PrimeItem.BOOST_BALL)
        )
      ) // Furnace to Crossway
      || (this.has(PrimeItem.ICE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)) // Furnace to Hall of the Elders
    );
  }

  public hasReflectingPoolReqs(settings: any) {
    // Reflecting Pool from Overgrown Cavern Tallon elevator
    if (this.canClimbFrigateCrashSite(settings) && this.has(PrimeItem.MORPH_BALL_BOMB)) {
      return true;
    }

    // Late Chozo reqs
    return this.hasLateChozoReqs(settings) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
    && (this.has(PrimeItem.BOOST_BALL) || (settings.standableTerrain && settings.ghettoJumping)) // ghetto jump off stone toad
    && (this.has(PrimeItem.WAVE_BEAM) || settings.hbjPastHote) // Wave Beam or HBJ out of HotE back door
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
    const suitOrETankReqs = (settings.crossMagmaPoolNoHeatProtection && this.hasEnergyTankCount(2)) || this.hasSuit(settings);

    return (settings.dashing && (this.has(PrimeItem.SPACE_JUMP_BOOTS) || this.canFloatyJump(settings)) && suitOrETankReqs) // E tank or suit for safety
    || (this.hasSuit(settings) && settings.standableTerrain && this.has(PrimeItem.GRAVITY_SUIT) && this.has(PrimeItem.SPACE_JUMP_BOOTS)) // jump off debris in lava with gravity suit + space jump
    || (this.hasSuit(settings) && this.has(PrimeItem.GRAPPLE_BEAM)) // developer intended
  }

  public canAccessTowerOfLight(settings: any): boolean {
    return this.hasMissiles() && this.has(PrimeItem.SPACE_JUMP_BOOTS) && this.has(PrimeItem.WAVE_BEAM) && (
      ((settings.standableTerrain || settings.ghettoJumping) && (settings.dashing || settings.lJumping)) // jump or dash to the door from the branch or by ghetto jumping
      || (this.has(PrimeItem.MORPH_BALL) && (settings.ghettoJumping || this.has(PrimeItem.BOOST_BALL)) && this.has(PrimeItem.SPIDER_BALL)) // developer intended, can bypass boost ball with a ghetto jump to spider track
    );
  }

  public hasEarlyMagmoorItemReqs(settings: any): boolean {
    return this.hasMissiles() && (this.hasSuit(settings) || (settings.earlyMagmoorNoSuit && this.hasEnergyTankCount(settings.earlyMagmoorNoSuitTanks))) && (
      settings.damageBoostLiquids // damage boost through lava from Tallon elevator
      || (this.has(PrimeItem.MORPH_BALL) && (this.has(PrimeItem.MORPH_BALL_BOMB) || this.has(PrimeItem.GRAPPLE_BEAM))) // developer intended through Lava Lake/Fiery Shores
    );
  }

  public hasLateMagmoorItemReqs(settings: any): boolean {
    // Going from mines is valid, especially for varia only heat damage seeds
    if (this.hasMinesReqsTallonSouth(settings) && this.canLayPowerBombs()) {
      return true;
    }

    // Calculate logic from Tallon/Chozo elevators
    return this.hasMissiles() && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS)
    && (
      (this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.SPIDER_BALL)) // developer intended to cross Twin Fires Tunnel
      || (
        (settings.standableTerrain && (settings.dashing || settings.rJumping)) // dash or r jump across terrain
        || (settings.damageBoostLiquids && ((settings.dbj && this.canLayBombs()) || this.has(PrimeItem.GRAVITY_SUIT))) // damage boost through lava with a DBJ or jump out with gravity
      ) // cross Twin Fires Tunnel without morph or spider
    )
    && (this.hasSuit(settings) || (settings.vmr && this.hasEnergyTankCount(settings.vmrTanks))); // VMR or suit depending on settings
  }

  // "Front" Phendrana Requirements from Magmoor, near Shorelines
  public hasPhendranaReqsMagmoorWest(settings: any): boolean {
    return this.hasMissiles() && (this.canLayBombs() || (settings.bypassBombsWithBoost && this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.BOOST_BALL)))
    && (this.hasSuit(settings) || (settings.vmr && settings.dashing && settings.standableTerrain && this.hasEnergyTankCount(settings.vmrTanks) && this.has(PrimeItem.SPACE_JUMP_BOOTS)));
  }

  // "Back" Phendrana Requirements from Magmoor, near Phednrana's Edge/Quarantine Cave
  public hasPhendranaReqsMagmoorSouth(settings: any): boolean {
    return this.hasLateMagmoorItemReqs(settings) && this.has(PrimeItem.MORPH_BALL)
    && (!settings.noReversePhendranaBombs || this.has(PrimeItem.MORPH_BALL_BOMB));
  }

  // Phendrana sub-regions
  // Front (no wave)
  // Mid (ruined courtyard, labs, quarantine cave)
  // Back (Phendrana's Edge)

  // Possible routes
  // Magmor South --> Quarantine Cave --> Ruined Courtyard (requires mid access)
  // Magmoor South --> Phendrana's Edge --> Labs --> Ruined Courtyard (requires back access)
  // Magmoor West --> Ruined Courtyard (requires mid access)
  // Magmoor West --> Ruined Courtyard --> Quarantine Cave --> Magmoor South (mid access + quarantine cave reqs)
  // Magmoor West --> Ruined Courtyard --> Labs --> Far Phendrana (far access + labs reqs)

  // The base requirements for getting into courtyard and climbing it, ignoring requirements to enter Phendrana
  public canClimbRuinedCourtyard(settings: any): boolean {
    return this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.SPACE_JUMP_BOOTS) && (
      (settings.standableTerrain && settings.ghettoJumping) || (this.canLayBombs() && this.has(PrimeItem.BOOST_BALL)) || this.has(PrimeItem.SPIDER_BALL)
    ); // actually climbing the room
  }

  // base requirements for Observatory room, ignoring requirements to enter phendrana/labs
  public canClimbObservatory(settings: any): boolean {
    return settings.dashing || (this.canLayBombs() && this.has(PrimeItem.BOOST_BALL));
  }

  // base requirements to enter Quarantine Cave from Ruined Courtyard
  public canEnterQuarantineCaveFromRuinedCourtyard(settings: any) {
    return !settings.noSupers && this.canFireSuperMissiles() && (!settings.requireThermal || this.has(PrimeItem.THERMAL_VISOR));
  }

  // base requirements to exit Quarantine Cave to the Magmoor South elevator room
  public canExitQuarantineCaveToMagmoorSouth(settings: any): boolean {
    return (this.has(PrimeItem.SPIDER_BALL) || this.has(PrimeItem.GRAPPLE_BEAM))
    && (!settings.requireThermal || this.has(PrimeItem.THERMAL_VISOR));
  }

  // base requirements to exit Quarantine Cave to Ruined Courtyard
  // Require Super Missiles or bombs so you don't softlock in front Phendrana
  public canExitQuarantineCaveToRuinedCourtyard(settings: any): boolean {
    return ((!settings.noSupers && this.canFireSuperMissiles()) || this.canLayBombs()) && (settings.ghettoJumping || this.has(PrimeItem.SPIDER_BALL))
    && (!settings.requireThermal || this.has(PrimeItem.THERMAL_VISOR));
  }

  // base requirements to exit the ice door at the top of the Magmoor South elevator room
  public canExitMagmoorSouthToFarPhendrana(settings: any): boolean {
    return this.has(PrimeItem.MORPH_BALL) && this.has(PrimeItem.ICE_BEAM)
    && (settings.standableTerrain || this.has(PrimeItem.SPIDER_BALL));
  }

  public hasFrontPhendranaAccess(settings: any): boolean {
    return this.hasPhendranaReqsMagmoorWest(settings)
    || (this.hasPhendranaReqsMagmoorSouth(settings) && this.canExitQuarantineCaveToRuinedCourtyard(settings));
  }

  public hasMidPhendranaAccess(settings: any): boolean {
    return this.hasFrontPhendranaAccess(settings) && this.canClimbRuinedCourtyard(settings);
  }

  public hasFarPhendranaAccess(settings: any): boolean {
    return this.has(PrimeItem.ICE_BEAM) && this.hasMidPhendranaAccess(settings)
    && (
      this.canClimbObservatory(settings) // front to back pirate labs
      || (this.canEnterQuarantineCaveFromRuinedCourtyard(settings) && this.canExitQuarantineCaveToMagmoorSouth(settings)
        && this.canExitMagmoorSouthToFarPhendrana(settings)) // through quarantine cave
    );
  }

  public hasQuarantineCaveAccess(settings: any): boolean {
    return this.hasPhendranaReqsMagmoorSouth(settings)
    || (this.hasPhendranaReqsMagmoorWest(settings) && this.canClimbRuinedCourtyard(settings) && this.canEnterQuarantineCaveFromRuinedCourtyard(settings));
  }

  public hasPhendranaPirateLabsAccess(settings) {
    return (this.hasMidPhendranaAccess(settings) && this.canClimbObservatory(settings)) || this.hasFarPhendranaAccess(settings);
  }

  // Base requirements for climbing Ore Processing
  public canClimbOreProcessing(settings) {
    return (settings.standableTerrain && settings.ghettoJumping) // climb spiderless
    || (this.canLayBombs() && this.has(PrimeItem.GRAPPLE_BEAM) && this.has(PrimeItem.SPIDER_BALL)); // developer intended
  }

  // Base requirements for climbing from Elite Control to Ore Processing/Elite Research
  public canClimbMinesSpiderShafts(settings) {
    return (settings.standableTerrain && settings.spiderlessShafts && this.canLayBombs()) || this.has(PrimeItem.SPIDER_BALL);
  }

  // Base requirements to climb out top side of Ventilation Shaft
  public canClimbVentShaft(settings) {
    return (this.has(PrimeItem.BOOST_BALL) || settings.allowBoostBallLowerMines) || (
      (settings.halfPipeBombJumps && this.canLayBombs()) || (settings.dashing && this.has(PrimeItem.SPACE_JUMP_BOOTS))
    );
  }

  public hasMinesReqsTallonSouth(settings): boolean {
    return (settings.barsSkip && this.hasReflectingPoolReqs(settings) && this.has(PrimeItem.WAVE_BEAM) && this.has(PrimeItem.ICE_BEAM)) // bars skip
    || (this.hasCrashedFrigateReqs(settings) && this.canLayBombs()); // developer intended
  }

  public hasMinesReqsMagmoorSouth(settings): boolean {
    return this.hasLateMagmoorItemReqs(settings) && this.canLayPowerBombs() && this.has(PrimeItem.ICE_BEAM)
    && this.canClimbOreProcessing(settings)
    && this.canClimbMinesSpiderShafts(settings);
  }

  public hasUpperMinesAccess(settings): boolean {
    return this.hasMinesReqsTallonSouth(settings) || this.hasMinesReqsMagmoorSouth(settings);
  }

  public hasLowerMinesAccess(settings): boolean {
    return this.hasUpperMinesAccess(settings) && this.canLayBombs()
      && this.canLayPowerBombs() && this.has(PrimeItem.PLASMA_BEAM)
      && this.canClimbVentShaft(settings) && this.canClimbMinesSpiderShafts(settings) && this.canClimbOreProcessing(settings) // climb out to/of upper mines
      && (!settings.requireXRay || this.has(PrimeItem.XRAY_VISOR)) // Metroid Quarantine A platforms
      && ((settings.standableTerrain && settings.ghettoJumping && settings.dashing) || this.has(PrimeItem.SPIDER_BALL)) // Exiting MQA
      && ((settings.standableTerrain && settings.ghettoJumping && (settings.dashing || settings.rJumping)) || this.has(PrimeItem.GRAPPLE_BEAM)); // Fungal Halls, MQB grapple
  }

  public canFloatyJump(settings): boolean {
    return settings.floatyJump && this.canWallcrawl(settings) && !this.has(PrimeItem.GRAVITY_SUIT);
  }
}

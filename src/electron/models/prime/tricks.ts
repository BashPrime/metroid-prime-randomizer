import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class Tricks extends SettingsFlags {
  alcoveNoItems = false;
  arborChamberWithoutPlasma = false;
  boostThroughBombTunnels = false;
  chozoIceTempleItemWithIS = false;
  climbFrigateCrashSite = false;
  climbFrozenPikeWithoutBombs = false;
  climbObservatoryWithoutBoost = false;
  climbOreProcessingWithoutGrappleSpider = false;
  climbPhazonProcessingCenterWithoutSpider = false;
  climbRuinedCourtyardWithoutBoostSpider = false;
  climbTowerOfLightWithoutMissiles = false;
  crossMagmaPoolSuitless = false;
  crossMagmaPoolWithoutGrapple = false;
  crossTwinFiresTunnelSuitless = false;
  crossTwinFiresTunnelWithoutSpider = false;
  crosswayItemFewerReqs = false;
  destroyBombCoversWithPowerBombs = false;
  eliteResearchInfiniteBoostClip = false;
  enableMainPlazaLedgeDoor = false;
  exitQuarantineCaveRuinedCourtyardSlopeJump = false;
  fieryShoresAccessWithoutMorphGrapple = false;
  frigateCrashSiteItemWithoutGravitySuit = false;
  furnaceAccessWithoutSpider = false;
  furnaceSpiderTrackItemHBJ = false;
  furnaceSpiderTrackItemSpaceJumpBombs = false;
  gravityChamberLedgeItemWithoutGrapplePlasma = false;
  hallOfTheEldersBombSlotsWithoutSpider = false;
  hallOfTheEldersItemsWithIS = false;
  iceBeamBeforeFlaahgraOobWallcrawl = false;
  magmaPoolItemWithIS = false;
  mainPlazaItemsOnlySpaceJump = false;
  mainQuarryItemWithoutSpider = false;
  outOfBoundsWithoutMorphBall = false;
  phazonMiningTunnelItemWithoutPhazonSuit = false;
  phendranaTransportSouthToTransportAccessWithoutSpider = false;
  plasmaProcessingFromMagmoorWorkstationOob = false;
  plasmaProcessingItemWithoutGrappleSpider = false;
  reflectingPoolAccessWithoutWaveBeam = false;
  removePhendranaDepthsGrappleReqs = false;
  removeThermalReqs = false;
  removeXrayReqs = false;
  rootCaveArborChamberWithoutGrapple = false;
  ruinedFountainItemFlaahgraSkip = false;
  ruinedNurseryWithoutBombs = false;
  shoreTunnelEscapeWithoutSpaceJump = false;
  spiderlessShafts = false;
  suitlessMagmoorRun = false;
  suitlessMagmoorRunMinimal = false;
  quarantineMonitorDash = false;
  towerChamberNoGravity = false;
  trainingChamberAndAccessOobWallcrawl = false;
  upperRuinedShrineTowerOfLightFewerAccessReqs = false;
  warriorShrineWithoutBoost = false;
  wateryHallUnderwaterFlaahgraSkip = false;
  wateryHallUnderwaterSlopeJump = false;
  waveSunOobWallcrawlWithIS = false;

  constructor(args?: SettingsFlagsArgs) {
    super();

    if (args) {
      this.setSettings(args);
    }
  }

  setSettings(args: SettingsFlagsArgs): void {
    Object.assign(this, args);
  }

  static fromSettingsString(settingsString: string): Tricks {
    const settings: SettingsFlagsArgs = {};
    const keys = new Tricks().getSettingsKeys();
    const bitString = getPaddedBitStringFromSettingsString(settingsString, keys.length);

    let index = 0;
    for (const key of keys) {
      const currentBit = bitString.substr(index, 1);
      settings[key] = currentBit === '1' ? true : false;
      index += 1;
    }

    return new Tricks(settings);
  }
}



import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class Tricks extends SettingsFlags {
  alcoveNoItems = false;
  antechamberWithPowerBombs = false;
  arborChamberWithoutPlasma = false;
  arboretumPuzzleSkip = false;
  boostThroughBombTunnels = false;
  chapelOfTheEldersWithPowerBombs = false;
  chozoIceTempleItemWithIS = false;
  chozoIceTempleWithoutSpaceJump = false;
  climbFrigateCrashSite = false;
  climbFrozenPikeWithoutBombs = false;
  climbObservatoryWithoutBoost = false;
  climbOreProcessingWithoutGrappleSpider = false;
  climbPhazonProcessingCenterWithoutSpider = false;
  climbReflectingPoolWithoutBoostBall = false;
  climbRuinedCourtyardWithoutBoostSpider = false;
  climbTowerOfLightWithoutMissiles = false;
  crashedFrigateGammaElevatorWithoutGravity = false;
  crossMagmaPoolSuitless = false;
  crossMagmaPoolWithoutGrapple = false;
  crossTwinFiresTunnelSuitless = false;
  crossTwinFiresTunnelWithoutSpider = false;
  crosswayHpbj = false;
  crosswayItemFewerReqs = false;
  destroyBombCoversWithPowerBombs = false;
  earlyPhendranaBehindIceItemsWithIS = false;
  eliteResearchInfiniteBoostClip = false;
  eliteResearchLaserWithoutBoost = false;
  exitPhendranaCanyonNoItems = false;
  exitQuarantineCaveRuinedCourtyardSlopeJump = false;
  fieryShoresAccessWithoutMorphGrapple = false;
  fieryShoresItemSj = false;
  frigateCrashSiteItemOnlyScanVisor = false;
  frigateCrashSiteItemWithoutGravitySuit = false;
  furnaceAccessWithoutSpider = false;
  furnaceSpiderTrackItemHBJ = false;
  furnaceSpiderTrackItemSpaceJumpBombs = false;
  gatheringHallWithoutSpaceJump = false;
  gravityChamberLedgeItemWithoutGrapplePlasma = false;
  greatTreeHallBarsSkip = false;
  hallOfTheEldersBombSlotsWithoutSpider = false;
  hallOfTheEldersItemsWithIS = false;
  hydroAccessTunnelWithoutGravity = false;
  iceBeamBeforeFlaahgraOobWallcrawl = false;
  iceRuinsEastSpiderItemWithoutSpider = false;
  lateMagmoorNoHeatProtection = false;
  lavaLakeItemOnlyMissiles = false;
  lavaLakeItemSuitless = false;
  lifeGroveSpinnerWithoutBoostBall = false;
  lifeGroveTunnelHpbj = false;
  lowerPhazonMineWithoutSpiderGrapple = false;
  magmaPoolItemWithIS = false;
  mainPlazaGrappleLedgeOnlyGrapple = false;
  mainPlazaHpbj = false;
  mainPlazaItemsOnlySpaceJump = false;
  mainPlazaTreeNoSpaceJump = false;
  mainQuarryItemWithoutSpider = false;
  mainQuarryToOreProcessingWithoutGrapple = false;
  observatoryPuzzleSkip = false;
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
  ruinedShrineScanDashEscape = false;
  shoreTunnelEscapeWithoutSpaceJump = false;
  spiderlessShafts = false;
  suitlessMagmoorRun = false;
  suitlessMagmoorRunMinimal = false;
  sunTowerIbj = false;
  quarantineMonitorDash = false;
  tallonTransportTunnelCMinimumReqs = false;
  towerChamberNoGravity = false;
  trainingChamberAndAccessOobWallcrawl = false;
  triclopsPitItemWithoutSpaceJump = false;
  triclopsPitItemWithCharge = false;
  upperRuinedShrineTowerOfLightFewerAccessReqs = false;
  vaultAccessFromMainPlaza = false;
  ventShaftHpbj = false;
  warriorShrineMinimumReqs = false;
  warriorShrineWithoutBoost = false;
  wateryHallScanPuzzleWithIS = false;
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
    const allowedKeys = this.getSettingsKeys();

    // To prevent outdated settings flags from being assigned, filter them
    const filteredArgs = Object.keys(args)
      .filter(key => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = args[key];
        return obj;
      }, {});

    Object.assign(this, filteredArgs);
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



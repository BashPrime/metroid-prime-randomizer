import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class Tricks extends SettingsFlags {
  alcoveNoItems = false;
  arborChamberWithoutPlasma = false;
  boostThroughBombTunnels = false;
  chozoIceTempleItemWithIS = false;
  climbTowerOfLightNoMissiles = false;
  crossMagmaPoolWithoutGrapple = false;
  crossTwinFiresTunnelWithoutSpider = false;
  eliteResearchInfiniteBoostClip = false;
  enableMainPlazaLedgeDoor = false;
  exitQuarantineCaveRuinedCourtyardSlopeJump = false;
  fewerCrosswayReqs = false;
  fieryShoresAccessWithoutMorphGrapple = false;
  furnaceAccessWithoutSpider = false;
  gravityChamberLedgeItemWithoutGrapplePlasma = false;
  hallOfTheEldersBombSlotsWithoutSpider = false;
  hallOfTheEldersItemsWithIS = false;
  iceBeamBeforeFlaahgraOobWallcrawl = false;
  magmaPoolItemWithIS = false;
  mainPlazaItemsOnlySpaceJump = false;
  mainQuarryItemWithoutSpider = false;
  phendranaTransportSouthToTransportAccessWithoutSpider = false;
  plasmaProcessingItemWithoutGrappleSpider = false;
  removePhendranaDepthsGrappleReqs = false;
  removeThermalReqs = false;
  removeXrayReqs = false;
  ruinedFountainItemFlaahgraSkip = false;
  spiderlessShafts = false;
  quarantineMonitorDash = false;
  towerChamberNoGravity = false;
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



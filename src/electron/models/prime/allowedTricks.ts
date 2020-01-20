import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class AllowedTricks extends SettingsFlags {
  alcoveNoItems = false;
  arborChamberWithoutPlasma = false;
  boostThroughBombTunnels = false;
  climbTowerOfLightNoMissiles = false;
  crossTwinFiresTunnelWithoutSpider = false;
  eliteResearchBoostClip = false;
  fieryShoresAccessWithoutMorphGrapple = false;
  furnaceAccessWithoutSpider = false;
  gravityChamberGrappleLedgeRJump = false;
  magmaPoolDash = false;
  mainPlazaItemsOnlySpaceJump = false;
  mainQuarryItemWithoutSpider = false;
  minesSpiderlessShafts = false;
  phendranaDepthsGrappleSkips = false;
  phendranaDepthsAccessWithoutSpider = false;
  plasmaProcessingWithoutGrappleSpider = false;
  removeThermalReqs = false;
  removeXrayReqs = false;
  ruinedFountainFlaahgraSkip = false;
  quarantineMonitorDash = false;
  towerChamberNoGravity = false;
  upperRuinedShrineTowerOfLightFewerAccessReqs = false;
  warriorShrineWithoutBoost = false;
  wateryHallUnderwaterFlaahgraSkip = false;

  constructor(args?: SettingsFlagsArgs) {
    super(args);
  }

  static fromSettingsString(settingsString: string): AllowedTricks {
    const settings: SettingsFlagsArgs = {};
    const keys = new AllowedTricks().getSettingsKeys();
    const bitString = getPaddedBitStringFromSettingsString(settingsString, keys.length);

    let index = 0;
    for (const key of keys) {
      const currentBit = bitString.substr(index, 1);
      settings[key] = currentBit === '1' ? true : false;
      index += 1;
    }

    return new AllowedTricks(settings);
  }
}



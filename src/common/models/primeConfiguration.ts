import BaseConfiguration, { BaseConfigurationParams } from './baseConfiguration';
import { Elevators } from '../enums/elevators';
import { ArtifactTempleAccessMode } from '../enums/artifactTempleAccessMode';
import HintConfiguration from './hintConfiguration';

/**
 * Constructor params for PrimeConfiguration class.
 */
export interface PrimeConfigurationParams extends BaseConfigurationParams {
  elevators: Elevators;
  chozoArtifacts: ArtifactTempleAccessMode;
  hints: HintConfiguration;
  skipFinalBosses: boolean;
  energyPerTank: number;
  nonVariaHeatDamage: boolean;
  heatDamagePerSecond: number;
  staggeredSuitDamage: boolean;
  enableVaultLedgeDoor: boolean;
}

/**
 * Container for configurations specific for Metroid Prime randomization.
 */
export default class PrimeConfiguration extends BaseConfiguration {
  readonly elevators: Elevators;
  readonly chozoArtifacts: ArtifactTempleAccessMode;
  readonly hints: HintConfiguration;
  readonly skipFinalBosses: boolean;
  readonly energyPerTank: number;
  readonly nonVariaHeatDamage: boolean;
  readonly heatDamagePerSecond: number;
  readonly staggeredSuitDamage: boolean;
  readonly enableVaultLedgeDoor: boolean;

  constructor(params: PrimeConfigurationParams) {
    super(params);
    // Object.assign(this, params);
  }
}

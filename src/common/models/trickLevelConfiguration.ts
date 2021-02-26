import { TrickLevel } from '../enums/trickLevel';

/**
 * Type for storing levels of specific trick types.
 */
interface SpecificLevels {
  [key: string]: TrickLevel;
}

/**
 * Constructor params for TrickLevelConfiguration class.
 */
export interface TrickLevelConfigurationParams {
  minimalLogic: boolean;
  specificLevels: SpecificLevels;
}

/**
 * Class for containing trick parameters including minimal logic mode and
 * specific trick levels.
 */
export default class TrickLevelConfiguration {
  readonly minimalLogic: boolean;
  readonly specificLevels: SpecificLevels;

  constructor(params: TrickLevelConfigurationParams) {
    Object.assign(this, params);
  }
}

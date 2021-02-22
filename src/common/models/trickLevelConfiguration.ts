import { TrickLevel } from '../enums/trickLevel';
import { GameName } from '../enums/gameName';

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
  game: GameName;
}

/**
 * Class for containing trick parameters including minimal logic mode and
 * specific trick levels.
 */
export default class TrickLevelConfiguration {
  readonly minimalLogic: boolean;
  readonly specificLevels: SpecificLevels;
  readonly game: GameName;

  constructor(params: TrickLevelConfigurationParams) {
    Object.assign(this, params);
  }
}

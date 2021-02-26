import { ChozoArtifactHintMode } from '../enums/chozoArtifactHintMode';

/**
 * Constructor params for HintsConfiguration class.
 */
export interface HintConfigurationParams {
  chozoArtifactHints: ChozoArtifactHintMode;
}

/**
 * Configuration wrapper for game-related hints.
 *
 * Currently, only Chozo Artifact hints are supported.
 */
export default class HintConfiguration {
  readonly chozoArtifactHints: ChozoArtifactHintMode;

  constructor(params: HintConfigurationParams) {
    Object.assign(this);
  }
}

import { RandomizationMode } from '../enums/randomizationMode';

/**
 * Constructor params for AvailableLocationsConfiguration class.
 */
export interface AvailableLocationsParams {
  randomizationMode: RandomizationMode;
  excludedIndices: readonly number[];
}

/**
 * Class for storing configurations for randomization mode, and available/excluded locations.
 */
export default class AvailableLocationsConfiguration {
  readonly randomizationMode: RandomizationMode;
  readonly excludedIndices: readonly number[];

  constructor(params: AvailableLocationsParams) {
    Object.assign(params);
  }
}

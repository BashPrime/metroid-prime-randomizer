import AreaLocation from './areaLocation';

/**
 * Constructor params for TrickLevelConfiguration class.
 */
export interface StartingLocationConfigurationParams {
  locations: readonly AreaLocation[];
}

/**
 * Class for containing starting location data.
 */
export default class StartingLocationConfiguration {
  readonly locations: readonly AreaLocation[];

  constructor(params: StartingLocationConfigurationParams) {
    Object.assign(this, params);
  }
}

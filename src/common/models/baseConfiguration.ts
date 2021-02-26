import AmmoConfiguration from './ammoConfiguration';
import AvailableLocationsConfiguration from './availableLocationsConfiguration';
import DamageStrictness from './damageStrictness';
import MajorItemsConfiguration from './majorItemsConfiguration';
import StartingLocationConfiguration from './startingLocationConfiguration';
import TrickLevelConfiguration from './trickLevelConfiguration';

/**
 * Constructor params for BaseConfiguration class.
 */
export interface BaseConfigurationParams {
  trickLevel: TrickLevelConfiguration;
  startingLocation: StartingLocationConfiguration;
  availableLocations: AvailableLocationsConfiguration;
  majorItemsConfiguration: MajorItemsConfiguration;
  ammoConfiguration: AmmoConfiguration;
  damageStrictness: DamageStrictness;
  // unlike randovania, pickup model styling/sources are not supported in the randomprime patcher at this time
}

/**
 * Base configuration class containing common/shared randomization settings.
 */
export default class BaseConfiguration {
  readonly trickLevel: TrickLevelConfiguration;
  readonly damageStrictness: DamageStrictness;

  constructor(params: BaseConfigurationParams) {
    Object.assign(params);
  }
}

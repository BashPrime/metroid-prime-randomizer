import { PickupModelStyle } from '../enums/pickupModelStyle';
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
  pickupModelStyle: PickupModelStyle;
}

/**
 * Base configuration class containing common/shared randomization settings.
 */
export default class BaseConfiguration implements BaseConfigurationParams {
  readonly trickLevel: TrickLevelConfiguration;
  readonly startingLocation: StartingLocationConfiguration;
  readonly availableLocations: AvailableLocationsConfiguration;
  readonly majorItemsConfiguration: MajorItemsConfiguration;
  readonly ammoConfiguration: AmmoConfiguration;
  readonly damageStrictness: DamageStrictness;
  readonly pickupModelStyle: PickupModelStyle;

  constructor(params: BaseConfigurationParams) {
    Object.assign(params);
  }
}

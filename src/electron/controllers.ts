import * as randomizerController from './controllers/randomizerController';
import * as generateSeedController from './controllers/generateSeedController';
import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedController from './controllers/seedController';
import * as presetsController from './controllers/presetsController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    generateSeed: generateSeedController.initialize(),
    save_settings: saveSettingsController.initialize(),
    seed: seedController.initialize(),
    presets: presetsController.initialize()
  };
}

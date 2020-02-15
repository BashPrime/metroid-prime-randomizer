import * as randomizerController from './controllers/randomizerController';
import * as generateSeedController from './controllers/generateSeedController';
import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedHistoryController from './controllers/seedHistoryController';
import * as presetsController from './controllers/presetsController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    generateSeed: generateSeedController.initialize(),
    save_settings: saveSettingsController.initialize(),
    seed: seedHistoryController.initialize(),
    presets: presetsController.initialize()
  };
}

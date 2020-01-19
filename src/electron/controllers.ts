import * as randomizerController from './controllers/randomizerController';
import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedController from './controllers/seedController';
import * as presetsController from './controllers/presetsController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    save_settings: saveSettingsController.initialize(),
    seed: seedController.initialize(),
    presets: presetsController.initialize()
  };
}

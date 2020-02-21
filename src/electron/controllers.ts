import * as randomizerController from './controllers/randomizerController';
import * as generateSeedController from './controllers/generateSeedController';
import * as settingsController from './controllers/settingsController';
import * as seedHistoryController from './controllers/seedHistoryController';
import * as presetsController from './controllers/presetsController';
import * as patcherController from './controllers/patcherController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    generateSeed: generateSeedController.initialize(),
    settings: settingsController.initialize(),
    seedHistory: seedHistoryController.initialize(),
    presets: presetsController.initialize(),
    patcher: patcherController.initialize(),
  };
}

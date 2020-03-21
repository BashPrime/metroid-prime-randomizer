import * as diagnosticsController from './controllers/diagnosticsController';
import * as generateSeedController from './controllers/generateSeedController';
import * as settingsController from './controllers/settingsController';
import * as seedHistoryController from './controllers/seedHistoryController';
import * as presetsController from './controllers/presetsController';
import * as patcherController from './controllers/patcherController';
import * as spoilerController from './controllers/spoilerController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    diagnosticsController: diagnosticsController.initialize(),
    generateSeed: generateSeedController.initialize(),
    settings: settingsController.initialize(),
    seedHistory: seedHistoryController.initialize(),
    presets: presetsController.initialize(),
    patcher: patcherController.initialize(),
    spoiler: spoilerController.initialize()
  };
}

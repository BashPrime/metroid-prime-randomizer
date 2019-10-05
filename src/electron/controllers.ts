import * as randomizerController from './controllers/randomizerController';
import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedController from './controllers/seedController';

export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    save_settings: saveSettingsController.initialize(),
    seed: seedController.initialize()
  };
}

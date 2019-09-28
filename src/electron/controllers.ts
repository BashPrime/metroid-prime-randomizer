import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedController from './controllers/seedController';

export function defineControllers() {
  return {
    save_settings: saveSettingsController.initialize(),
    seed: seedController.initialize()
  };
}

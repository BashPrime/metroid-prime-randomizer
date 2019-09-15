import * as saveSettingsController from './controllers/saveSettingsController';

export function defineControllers() {
  return {
    save_settings: saveSettingsController.initialize()
  };
}

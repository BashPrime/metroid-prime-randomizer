import { RandomizerService } from '../services/randomizer.service';
import { details } from '../../../../common/data/settingsDetails';

export abstract class SettingsSection {
  readonly OBJECT_KEYS = Object.keys;
  readonly SETTINGS = this.randomizerService.SETTINGS;
  readonly DETAILS = details;

  constructor(protected randomizerService: RandomizerService) { }

  getSetting(name: string) {
    return this.SETTINGS.find(setting => setting.name === name);
  }

  getDetails(name: string) {
    return this.DETAILS[name];
  }

  getDisplayName(name: string) {
    return this.getDetails(name).name;
  }

  getTooltip(name: string) {
    return this.getDetails(name).description;
  }

  getChoices(name: string) {
    return this.getSetting(name).choices;
  }

  getChoiceName(name: string, value: string) {
    // Using == because the value can be a number.
    return this.getChoices(name).find(choice => choice.value == value).name;
  }
}

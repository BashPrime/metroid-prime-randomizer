import { RandomizerService } from '../services/randomizer.service';

export abstract class SettingsSection {
  readonly OBJECT_KEYS = Object.keys;
  readonly SETTINGS = this.randomizerService.SETTINGS;
  readonly DETAILS = this.randomizerService.DETAILS;

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
}

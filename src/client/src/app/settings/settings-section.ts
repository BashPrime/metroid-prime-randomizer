export abstract class SettingsSection {
  abstract SETTINGS;
  abstract DETAILS;
  readonly OBJECT_KEYS = Object.keys;

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

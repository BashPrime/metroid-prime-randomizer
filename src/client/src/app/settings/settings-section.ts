export abstract class SettingsSection {
  abstract SETTINGS;
  readonly OBJECT_KEYS = Object.keys;

  getSetting(name: string) {
    return this.SETTINGS.find(setting => setting.name === name);
  }

  getDisplayName(name: string) {
    return this.getSetting(name).displayName;
  }

  getChoices(name: string) {
    return this.getSetting(name).choices;
  }
}
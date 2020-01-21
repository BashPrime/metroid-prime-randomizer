import * as bigInt from 'big-integer';

export interface SettingsFlagsArgs {
  [key: string]: boolean;
}

export abstract class SettingsFlags {
  constructor() { }

  getSettingsKeys() {
    return Object.keys(this).filter(key => typeof this[key] === 'boolean');
  }

  abstract setSettings(args: SettingsFlagsArgs): void;

  toSettingsString(): string {
    let bits = '';
    for (let key of this.getSettingsKeys()) {
      bits += this[key] ? '1' : '0';
    }

    return bigInt(bits, 2).toString(36).toUpperCase();
  }
}



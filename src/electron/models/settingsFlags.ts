import * as bigInt from 'big-integer';

export interface SettingsFlagsArgs {
  [key: string]: boolean;
}

export abstract class SettingsFlags {
  constructor(args?: SettingsFlagsArgs) {
    if (args) {
      this.setSettings(args);
    }
  }

  getSettingsKeys() {
    return Object.keys(this).filter(key => typeof this[key] === 'boolean');
  }

  setSettings(args: SettingsFlagsArgs): void {
    Object.assign(this, args);
  }

  toSettingsString(): string {
    let bits = '';
    for (let key of this.getSettingsKeys()) {
      bits += this[key] ? '1' : '0';
    }

    return bigInt(bits, 2).toString(36);
  }
}



import { OptionType } from '../enums/optionType';
import * as Utilities from '../utilities';

export interface SettingsChoice {
  name: string;
  value: string | number | boolean;
}

interface OptionArgs {
  name: string;
  displayName: string;
  type: OptionType;
  shared: boolean;
  choices?: SettingsChoice[];
  default?: number | string | boolean;
  tooltip?: string;
}

interface CheckboxArgs {
  name: string;
  displayName: string;
  shared: boolean;
  default?: boolean;
  tooltip?: string;
}

interface SelectOptionArgs {
  name: string;
  displayName: string;
  shared: boolean;
  choices: SettingsChoice[]
  default?: number | string;
  tooltip?: string;
}

export class Option {
    name: string;
    displayName: string;
    type: OptionType;
    bitWidth: number;
    shared: boolean;
    choices: SettingsChoice[];
    default: number | string | boolean;
    tooltip: string;

    constructor(args: OptionArgs) {
      Object.assign(this, args);
      // Get bitwidth by getting the number of choice keys present
      this.bitWidth = this.calculateBitWidth();
    }

    private calculateBitWidth() {
      const numChoices = this.choices.length;
      if (numChoices > 0) {
        return Math.ceil(Utilities.getBaseLog(numChoices, 2));
      }

      return 0;
    }
}

export class Checkbox extends Option {
  constructor(args: CheckboxArgs) {
    const choices: SettingsChoice[] = [
      {
        name: 'On',
        value: true
      },
      {
        name: 'Off',
        value: false
      }
    ];

    super({
      name: args.name,
      displayName: args.displayName,
      type: OptionType.BOOLEAN,
      shared: args.shared,
      choices: choices,
      default: args.default,
      tooltip: args.tooltip
    } as OptionArgs);
  }
}

export class SelectOption extends Option {
  constructor(args: SelectOptionArgs) {
    super({
      name: args.name,
      displayName: args.displayName,
      type: OptionType.SELECT,
      shared: args.shared,
      choices: args.choices,
      default: args.default,
      tooltip: args.tooltip
    } as OptionArgs);
  }
}

export function discreteNumberSelection(min: number, max: number): SettingsChoice[] {
  const numberRange = Array.from({ length: max - min + 1 }, (x, i) => i + 1);
  const selection: SettingsChoice[] = [];

  for(let value of numberRange) {
    selection.push({
      name: value.toString(),
      value: value
    });
  }

  return selection;
}

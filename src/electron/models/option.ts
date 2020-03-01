import { OptionType } from '../enums/optionType';
import * as Utilities from '../utilities';

export interface SettingsChoice {
  name: string;
  value: string | number | boolean;
}

interface OptionArgs {
  name: string;
  type: OptionType;
  shared: boolean;
  minimum?: number;
  maximum?: number;
  options?: { [key: string]: Option };
  choices?: SettingsChoice[];
  default?: number | string | boolean;
  tooltip?: string;
}

interface CheckboxArgs {
  name: string;
  shared: boolean;
  default?: boolean;
  tooltip?: string;
}

interface SelectOptionArgs {
  name: string;
  shared: boolean;
  choices: SettingsChoice[]
  default?: number | string;
  tooltip?: string;
}

interface NumberOptionArgs {
  name: string;
  shared: boolean;
  minimum: number;
  maximum: number;
  default?: number | string;
  tooltip?: string;
}

interface ObjectOptionArgs {
  name: string;
  options: { [key: string]: Option };
  shared: boolean;
  default?: { [key: string]: number | string };
  tooltip?: string;
}

export class Option {
    name: string;
    type: OptionType;
    bitWidth: number;
    shared: boolean;
    minimum: number;
    maximum: number;
    options: { [key: string]: Option };
    choices: SettingsChoice[];
    default: number | string | boolean;
    tooltip: string;

    constructor(args: OptionArgs) {
      Object.assign(this, args);
      // Get bitwidth by getting the number of choice keys present
      this.bitWidth = this.calculateBitWidth();
    }

    protected calculateBitWidth() {
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
      type: OptionType.SELECT,
      shared: args.shared,
      choices: args.choices,
      default: args.default,
      tooltip: args.tooltip
    } as OptionArgs);
  }
}

export class NumberOption extends Option {
  constructor(args: NumberOptionArgs) {
    super({
      name: args.name,
      type: OptionType.NUMBER,
      shared: args.shared,
      minimum: args.minimum,
      maximum: args.maximum,
      default: args.default,
      tooltip: args.tooltip
    } as OptionArgs);
  }

  protected calculateBitWidth(): number {
    if (this.maximum) {
      return Math.ceil(Utilities.getBaseLog(this.maximum, 2));
    }

    return 0;
  }
}

export class ObjectOption extends Option {
  constructor(args: ObjectOptionArgs) {
    super({
      name: args.name,
      type: OptionType.OBJECT,
      options: args.options,
      shared: args.shared,
      tooltip: args.tooltip
    } as OptionArgs);
  }

  protected calculateBitWidth(): number {
    let bitWidth = 0;

    for (let [key, option] of Object.entries(this.options)) {
      bitWidth += option.bitWidth;
    }

    return bitWidth;
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

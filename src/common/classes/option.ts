import { OptionType } from '../enums/optionType';
import { Utilities } from '../utilities';

interface OptionArgs {
  name: string;
  displayName: string;
  type: OptionType;
  shared: boolean;
  choices?: {[key: string]: string | number};
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
  choices: {[key: string]: string | number}
  default?: number | string;
  tooltip?: string;
}

interface ListOptionArgs {
  name: string;
  displayName: string;
  shared: boolean;
  choices: {[key: string]: string},
  default
}

export class Option {
    name: string;
    displayName: string;
    type: OptionType;
    bitWidth: number;
    shared: boolean;
    choices: {[key: string]: string};
    default: number | string | boolean;
    tooltip: string;

    constructor(args: OptionArgs) {
      Object.assign(this, args);
      // Get bitwidth by getting the number of choice keys present
      this.bitWidth = this.calculateBitWidth(this.choices);
    }

    calculateBitWidth(choices: object) {
      const numChoices = Object.keys(choices).length;
      if (numChoices > 0) {
        return Math.ceil(Utilities.getBaseLog(numChoices, 2));
      }

      return 0;
    }
}

export class Checkbox extends Option {
  constructor(args: CheckboxArgs) {
    const choices = {
      True: 'checked',
      False: 'unchecked'
    };

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

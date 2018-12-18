import { Option, OptionType } from './Option';
import { Utilities } from '../Utilities';

export class Config {
  options = [
    // Rom Settings
    new Option('spoiler', OptionType.BOOLEAN, 1, true),
    new Option('generateRom', null, null, false),
    new Option('skipFrigate', OptionType.BOOLEAN, 1, true),
    new Option('skipHudPopups', OptionType.BOOLEAN, 1, true),
    new Option('obfuscateItems', OptionType.BOOLEAN, 1, true),
    // Main Rules
    new Option('goal', OptionType.DROPDOWN, 1, true),
    new Option('goalArtifacts', OptionType.NUMBER, 4, true),
    new Option('shuffleArtifacts', OptionType.BOOLEAN, 1, true),
    new Option('shuffleArtifacts', OptionType.BOOLEAN, 1, true),
    new Option('shuffleMissileLauncher', OptionType.BOOLEAN, 1, true),
    new Option('shuffleMorph', OptionType.BOOLEAN, 1, true),
    new Option('shuffleBombs', OptionType.BOOLEAN, 1, true),
    new Option('shuffleCharge', OptionType.BOOLEAN, 1, true),
    new Option('shuffleSpaceJump', OptionType.BOOLEAN, 1, true),
    // Item Logic
    new Option('noSupers', OptionType.BOOLEAN, 1, true),
    new Option('noBombsPointOfNoReturnTunnels', OptionType.BOOLEAN, 1, true),
    new Option('noVanillaBeams', OptionType.BOOLEAN, 1, true),
    new Option('noEarlyPhazonSuit', OptionType.BOOLEAN, 1, true),
    new Option('noSpiderBallInQuarantineCave', OptionType.BOOLEAN, 1, true),
    new Option('noGravitySuitInGravityChamber', OptionType.BOOLEAN, 1, true),
    new Option('requireThermal', OptionType.BOOLEAN, 1, true),
    new Option('requireXRay', OptionType.BOOLEAN, 1, true),
    new Option('noReversePhendranaBombs', OptionType.BOOLEAN, 1, true),
    new Option('noCrashedFrigate', OptionType.BOOLEAN, 1, true),
    new Option('noBoostBallLowerMinesGlitched', OptionType.BOOLEAN, 1, true),
    new Option('rootCaveSW', OptionType.BOOLEAN, 1, true),
    new Option('ibbf', OptionType.BOOLEAN, 1, true),
    new Option('trainingChamberOOB', OptionType.BOOLEAN, 1, true),
    new Option('waveSun', OptionType.BOOLEAN, 1, true),
    new Option('workstationToPlasmaProcessing', OptionType.BOOLEAN, 1, true),
    new Option('earlyNewborn', OptionType.BOOLEAN, 1, true),
    new Option('oobNoBombs', OptionType.BOOLEAN, 1, true),
    new Option('floatyJump', OptionType.BOOLEAN, 1, true),
    new Option('dashing', OptionType.BOOLEAN, 1, true),
    new Option('standableTerrain', OptionType.BOOLEAN, 1, true),
    new Option('damageBoostLiquids', OptionType.BOOLEAN, 1, true),
    new Option('lJumping', OptionType.BOOLEAN, 1, true),
    new Option('rJumping', OptionType.BOOLEAN, 1, true),
    new Option('ghettoJumping', OptionType.BOOLEAN, 1, true),
    new Option('earlyWild', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedEarlySun', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedMagmaPool', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedHote', OptionType.BOOLEAN, 1, true),
    new Option('barsSkip', OptionType.BOOLEAN, 1, true),
    new Option('spinnersNoBoost', OptionType.BOOLEAN, 1, true),
    new Option('spiderlessShafts', OptionType.BOOLEAN, 1, true),
    new Option('infiniteBoostEliteResearch', OptionType.BOOLEAN, 1, true),
    new Option('phazonMiningTunnelNoPhazonSuit', OptionType.BOOLEAN, 1, true),
    new Option('halfPipeBombJumps', OptionType.BOOLEAN, 1, true),
    new Option('dbj', OptionType.BOOLEAN, 1, true),
    new Option('hbjPastHote', OptionType.BOOLEAN, 1, true),
    new Option('bypassBombsWithBoost', OptionType.BOOLEAN, 1, true),
    new Option('vmr', OptionType.BOOLEAN, 1, true),
    new Option('vmrTanks', OptionType.NUMBER, 4, true, 3, 14),
    new Option('earlyMagmoorNoSuit', OptionType.BOOLEAN, 1, true),
    new Option('earlyMagmoorNoSuitTanks', OptionType.NUMBER, 4, true, 7, 14)
  ];
  private optionDropdowns = {
    goal: [
      { name: 'Artifact Collection', value: 'artifacts' },
      { name: 'All Bosses', value: 'all-bosses' }
    ]
  };
  private letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  settingsToBase32Text(settings): string {
    const settingKeys = this.options.filter(option => option.shared).map(option => option.name);
    let bitString = '';

    for (const key of settingKeys) {
      const configOption = this.getOptionByName(key);

      switch (configOption.type) {
        case OptionType.BOOLEAN: {
          bitString += settings[key] ? 1 : 0;
          break;
        }
        case OptionType.NUMBER: {
          if (!settings[key] || settings[key] < configOption.minValue) {
            settings[key] = configOption.minValue;
          } else if (settings[key] > configOption.maxValue) {
            settings[key] = configOption.maxValue;
          }
          bitString += Utilities.toPaddedBitString(settings[key], configOption.bitWidth);
          break;
        }
        case OptionType.DROPDOWN: {
          const optionIndex = this.getDropdownValueIndex(configOption.name, settings[key]);
          bitString += Utilities.toPaddedBitString(optionIndex, configOption.bitWidth);
          break;
        }
      }
    }

    return this.bitStringToBase32Text(bitString);
  }

  private bitStringToBase32Text(bitString): string {
    // Pad the bitString to a multiple of 5 if needed
    if (bitString.length % 5 > 0) {
      bitString += '0'.repeat(5 - bitString.length % 5);
    }

    // Convert to characters
    let result = '';
    for (let i = 0; i < bitString.length; i += 5) {
      const chunk = bitString.substr(i, 5);
      let value;
      const rangeArray = Array.from({length: 5}, (x,i) => i);
      for(let j = 0; j <rangeArray.length; j++) {
        value |= chunk[j] << j;
      }
      result += this.letters[value];
    }

    return result;
  }

  base32TextToSettings(text): object {
    const bitString = this.base32TextToBitString(text);
    const settings = {};

    let index = 0;
    for (const option of this.options.filter(option => option.shared)) {
      const bitWidth = option.bitWidth;
      const currentBits = bitString.substr(index, bitWidth);

      switch (option.type) {
        case OptionType.BOOLEAN: {
          settings[option.name] = parseInt(currentBits, 2) === 1 ? true : false;
          break;
        }
        case OptionType.NUMBER: {
          settings[option.name] = parseInt(currentBits, 2);
          break;
        }
        case OptionType.DROPDOWN: {
          settings[option.name] = this.optionDropdowns[option.name][parseInt(currentBits, 2)].value;
        }
      }
      index += bitWidth;
    }

    return settings;
  }

  private base32TextToBitString(text): string {
    let bitString = '';
    for (let value of text) {
      const index = this.letters.indexOf(value);
      const rangeArray = Array.from({length: 5}, (x,i) => i);
      for (let i = 0; i < rangeArray.length; i++) {
        bitString += (index >> i) & 1;
      }
    }

    return bitString;
  }

  getOptionByName(name: string) {
    return this.options.find(item => item.name === name);
  }

  getDropdownsForField(key: string) {
    return this.optionDropdowns[key];
  }

  getDropdownValueIndex(key: string, value: string) {
    return this.optionDropdowns[key].map(dropdown => dropdown.value).indexOf(value);
  }
}

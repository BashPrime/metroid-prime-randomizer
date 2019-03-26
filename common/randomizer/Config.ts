import { Option, OptionType } from './Option';
import { Utilities } from '../Utilities';
import { Goal } from './enums/goal';
import { HeatDamagePrevention } from './enums/heatDamagePrevention';
import { SuitDamageReduction } from './enums/suitDamageReduction';

export class Config {
  options = [
    // Rom Settings
    new Option('spoiler', 'Create Spoiler', OptionType.BOOLEAN, 1, true),
    new Option('generateRom', null, null, null, false),
    new Option('skipFrigate', 'Skip the Space Pirate Frigate', OptionType.BOOLEAN, 1, true),
    new Option('skipHudPopups', 'Skip Item Acquisition Popups', OptionType.BOOLEAN, 1, true),
    new Option('hideItemModels', 'Hide Item Models', OptionType.BOOLEAN, 1, true),
    // Main Rules
    new Option('goal', 'Goal', OptionType.DROPDOWN, 2, true),
    new Option('goalArtifacts', 'Number of Artifacts', OptionType.NUMBER, 4, true, 1, 12),
    new Option('artifactLocationHints', 'Show Chozo Artifact location hints in Artifact Temple', OptionType.BOOLEAN, 1, true),
    new Option('heatDamagePrevention', 'Heat Damage Prevention', OptionType.DROPDOWN, 1, true),
    new Option('suitDamageReduction', 'Suit Damage Reduction', OptionType.DROPDOWN, 1, true),
    new Option('shuffleArtifacts', 'Shuffle Chozo Artifacts', OptionType.BOOLEAN, 1, true),
    new Option('shuffleMissileLauncher', 'Shuffle Missile Launcher', OptionType.BOOLEAN, 1, true),
    new Option('shuffleMorph', 'Shuffle Morph Ball', OptionType.BOOLEAN, 1, true),
    new Option('shuffleBombs', 'Shuffle Bombs', OptionType.BOOLEAN, 1, true),
    new Option('shuffleCharge', 'Shuffle Charge Beam', OptionType.BOOLEAN, 1, true),
    new Option('shuffleSpaceJump', 'Shuffle Space Jump Boots', OptionType.BOOLEAN, 1, true),
    // Item Logic
    new Option('noSupers', 'Don\'t require Super Missiles', OptionType.BOOLEAN, 1, true),
    new Option('noBombsPointOfNoReturnTunnels', 'No Bombs in \'Point of No Return\' Morph Ball tunnels', OptionType.BOOLEAN, 1, true),
    new Option('noVanillaBeams', 'No beams in vanilla beam rooms', OptionType.BOOLEAN, 1, true),
    new Option('noEarlyPhazonSuit', 'No Phazon Suit in early item locations', OptionType.BOOLEAN, 1, true),
    new Option('noGravitySuitInGravityChamber', 'No Gravity Suit in Gravity Chamber', OptionType.BOOLEAN, 1, true),
    new Option('requireThermal', 'Require Thermal Visor for power conduits, Thardus', OptionType.BOOLEAN, 1, true),
    new Option('requireXRay', 'Require X-Ray Visor for invisible platforms', OptionType.BOOLEAN, 1, true),
    new Option('noReversePhendranaBombs', 'Require Bombs for reverse Phendrana Drifts', OptionType.BOOLEAN, 1, true),
    new Option('noCrashedFrigate', 'No progression items in Crashed Frigate', OptionType.BOOLEAN, 1, true),
    new Option('allowBoostBallLowerMines', 'Allow Boost Ball in Lower Phazon Mines', OptionType.BOOLEAN, 1, true),
    new Option('dontRequireFlaahgra', 'Don\'t require Flaahgra', OptionType.BOOLEAN, 1, true),
    new Option('dontRequireThardus', 'Don\'t require Thardus', OptionType.BOOLEAN, 1, true),
    new Option('dontRequireOmegaPirate', 'Don\'t require Omega Pirate', OptionType.BOOLEAN, 1, true),
    new Option('rootCaveSW', 'Wallcrawl to Arbor Chamber', OptionType.BOOLEAN, 1, true),
    new Option('ibbf', 'IBBF Wallcrawl for late Chozo access', OptionType.BOOLEAN, 1, true),
    new Option('trainingChamberOOB', 'Training Chamber (Access) Wallcrawl', OptionType.BOOLEAN, 1, true),
    new Option('waveSun', 'Wave/Sun Infinite Speed', OptionType.BOOLEAN, 1, true),
    new Option('workstationToPlasmaProcessing', 'Wallcrawl to Plasma Processing', OptionType.BOOLEAN, 1, true),
    new Option('earlyNewborn', 'Early Newborn', OptionType.BOOLEAN, 1, true),
    new Option('oobNoBombs', 'Allow OOB without Morph Ball Bombs', OptionType.BOOLEAN, 1, true),
    new Option('floatyJump', 'Floaty Jump', OptionType.BOOLEAN, 1, true),
    new Option('dashing', 'Dashing/Scan Dashing', OptionType.BOOLEAN, 1, true),
    new Option('standableTerrain', 'Standable terrain exploits', OptionType.BOOLEAN, 1, true),
    new Option('damageBoostLiquids', 'Damage Boost through Hazardous Liquids', OptionType.BOOLEAN, 1, true),
    new Option('lJumping', 'L Jumping', OptionType.BOOLEAN, 1, true),
    new Option('rJumping', 'R Jumping', OptionType.BOOLEAN, 1, true),
    new Option('ghettoJumping', 'Ghetto Jumping', OptionType.BOOLEAN, 1, true),
    new Option('earlyWild', 'Sunchamber Ghost Fight item early', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedEarlySun', 'Infinite Speed (Early Sun)', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedMagmaPool', 'Infinite Speed (Magma Pool)', OptionType.BOOLEAN, 1, true),
    new Option('infiniteSpeedHote', 'Infinite Speed (Hall of the Elders)', OptionType.BOOLEAN, 1, true),
    new Option('barsSkip', 'Great Tree Hall Gate Skip', OptionType.BOOLEAN, 1, true),
    new Option('spiderlessShafts', 'Spiderless Shafts (Phazon Mines)', OptionType.BOOLEAN, 1, true),
    new Option('spiderlessPPC', 'Climb Phazon Processing Center without Spider Ball', OptionType.BOOLEAN, 1, true),
    new Option('infiniteBoostEliteResearch', 'Infinite Boost Wall Clip into Elite Research (Mines)', OptionType.BOOLEAN, 1, true),
    new Option('phazonMiningTunnelNoPhazonSuit', 'Phazon Mining Tunnel without Phazon Suit', OptionType.BOOLEAN, 1, true),
    new Option('halfPipeBombJumps', 'Half-Pipe Bomb Jumps', OptionType.BOOLEAN, 1, true),
    new Option('dbj', 'Double Bomb Jump sequence breaks', OptionType.BOOLEAN, 1, true),
    new Option('hbjPastHote', 'Hyper Bomb Jump (HBJ) past Hall of the Elders', OptionType.BOOLEAN, 1, true),
    new Option('bypassBombsWithBoost', 'Allow Boost Ball for morph tunnels that need bombs', OptionType.BOOLEAN, 1, true),
    new Option('crossMagmaPoolNoHeatProtection', 'Cross Magma Pool without Heat Protection', OptionType.BOOLEAN, 1, true),
    new Option('vmr', 'Suitless Magmoor Run to Phendrana/Mines', OptionType.BOOLEAN, 1, true),
    new Option('vmrTanks', 'Suitless Magmoor Run to Phendrana/Mines - Required Energy Tanks', OptionType.NUMBER, 4, true, 3, 14),
    new Option('earlyMagmoorNoSuit', 'Early Magmoor Items Without a Suit', OptionType.BOOLEAN, 1, true),
    new Option('earlyMagmoorNoSuitTanks', 'Early Magmoor Items Without a Suit - Required Energy Tanks', OptionType.NUMBER, 4, true, 7, 14)
  ];
  private optionDropdowns = {
    goal: [
      { name: 'Always Open', value: Goal.ALWAYS_OPEN },
      { name: 'Artifact Collection', value: Goal.ARTIFACT_COLLECTION },
      { name: 'All Bosses', value: Goal.ALL_BOSSES }
    ],
    heatDamagePrevention: [
      { name: 'Any Suit', value: HeatDamagePrevention.ANY_SUIT },
      { name: 'Varia Suit Only', value: HeatDamagePrevention.VARIA_ONLY }
    ],
    suitDamageReduction: [
      { name: 'Default', value: SuitDamageReduction.DEFAULT },
      { name: 'Cumulative', value: SuitDamageReduction.CUMULATIVE }
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

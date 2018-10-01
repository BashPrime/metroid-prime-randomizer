import { Option, OptionType } from './Option';

export class Config {
    options = [
        // Rom Settings
        new Option('spoiler', OptionType.BOOLEAN, 1, true),
        new Option('createIso', null, null, false),
        // Main Rules
        new Option('skipFrigate', OptionType.BOOLEAN, 1, true),
        new Option('skipHudPopups', OptionType.BOOLEAN, 1, true),
        new Option('shuffleArtifacts', OptionType.BOOLEAN, 1, true),
        new Option('shuffleMissileLauncher', OptionType.BOOLEAN, 1, true),
        new Option('shuffleMorph', OptionType.BOOLEAN, 1, true),
        new Option('shuffleBombs', OptionType.BOOLEAN, 1, true),
        new Option('shuffleCharge', OptionType.BOOLEAN, 1, true),
        new Option('shuffleSupers', OptionType.BOOLEAN, 1, true),
        new Option('shuffleBeams', OptionType.BOOLEAN, 1, true),
        new Option('shufflePBs', OptionType.BOOLEAN, 1, true),
        // Item Logic
        new Option('noSupers', OptionType.BOOLEAN, 1, true),
        new Option('noBurnDomeBombs', OptionType.BOOLEAN, 1, true),
        new Option('noVanillaBeams', OptionType.BOOLEAN, 1, true),
        new Option('noEarlyPhazonSuit', OptionType.BOOLEAN, 1, true),
        new Option('noPhendranaBombsSupers', OptionType.BOOLEAN, 1, true),
        new Option('requireVisors', OptionType.BOOLEAN, 1, true),
        new Option('noCrashedFrigate', OptionType.BOOLEAN, 1, true),
        new Option('rootCaveSW', OptionType.BOOLEAN, 1, true),
        new Option('ibbf', OptionType.BOOLEAN, 1, true),
        new Option('trainingChamberOOB', OptionType.BOOLEAN, 1, true),
        new Option('waveSun', OptionType.BOOLEAN, 1, true),
        new Option('workstationToPlasmaProcessing', OptionType.BOOLEAN, 1, true),
        new Option('gthWallcrawl', OptionType.BOOLEAN, 1, true),
        new Option('earlyNewborn', OptionType.BOOLEAN, 1, true),
        new Option('oobNoMorphOrBombs', OptionType.BOOLEAN, 1, true),
        new Option('floatyJump', OptionType.BOOLEAN, 1, true),
        new Option('dashing', OptionType.BOOLEAN, 1, true),
        new Option('standableTerrain', OptionType.BOOLEAN, 1, true),
        new Option('lJumping', OptionType.BOOLEAN, 1, true),
        new Option('rJumping', OptionType.BOOLEAN, 1, true),
        new Option('earlyWild', OptionType.BOOLEAN, 1, true),
        new Option('infiniteSpeedEarlySun', OptionType.BOOLEAN, 1, true),
        new Option('infiniteSpeedHote', OptionType.BOOLEAN, 1, true),
        // new Option('tftSpiderless', OptionType.BOOLEAN, 1, true),
        new Option('barsSkip', OptionType.BOOLEAN, 1, true),
        new Option('spinnersNoBoost', OptionType.BOOLEAN, 1, true),
        new Option('spiderlessShafts', OptionType.BOOLEAN, 1, true),
        new Option('phazonMiningTunnelNoPhazonSuit', OptionType.BOOLEAN, 1, true),
        new Option('halfPipeBombJumps', OptionType.BOOLEAN, 1, true),
        new Option('dbj', OptionType.BOOLEAN, 1, true),
        new Option('hbj', OptionType.BOOLEAN, 1, true),
        new Option('ubj', OptionType.BOOLEAN, 1, true),
        new Option('vmr', OptionType.BOOLEAN, 1, true),
        new Option('vmrTanks', OptionType.NUMBER, 1, true),
        new Option('earlyMagmoorNoSuit', OptionType.BOOLEAN, 1, true),
        new Option('earlyMagmoorNoSuitTanks', OptionType.NUMBER, 1, true),
    ];

    settingsToHexString() {

    }

    hexStringFromSettings() {

    }

    getOptionByName(name: string) {
        return this.options.find(item => item.name === name);
    }


}
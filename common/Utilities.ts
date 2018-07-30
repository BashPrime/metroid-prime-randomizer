import { MersenneTwister } from './randomizer/MersenneTwister';

export class Utilities {
    static toPaddedHexString(num: number, len: number): string {
        const str = num.toString(16);
        return '0'.repeat(len - str.length) + str;
    }

    static isServe(): boolean {
        const args = process.argv.slice(1);
        return args.some(val => val === '--serve');
    }

    static getWorkingFolder(): string {
      // If Windows portable file, use enviornment variable to properly set working directory
      // due to the relative path being within the unpacked application in AppData
      let workingFolder = process.env.PORTABLE_EXECUTABLE_DIR;
      if (!workingFolder) {
          workingFolder = '.';
      }

      return workingFolder;
    }

    static getRandomInt(min: number, max: number, rng: MersenneTwister = new MersenneTwister()) {
      return Math.floor(rng.random() * (max - min + 1)) + min;
    }
}

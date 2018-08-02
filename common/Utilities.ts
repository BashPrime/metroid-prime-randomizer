import { MersenneTwister } from './randomizer/MersenneTwister';
import { app } from 'electron';

import * as path from 'path';

export class Utilities {
    static toPaddedHexString(num: number, len: number): string {
        const str = num.toString(16);
        return '0'.repeat(len - str.length) + str;
    }

    static getRandomInt(min: number, max: number, rng: MersenneTwister = new MersenneTwister()) {
      return Math.floor(rng.random() * (max - min + 1)) + min;
    }

    static isServe(): boolean {
      const args = process.argv.slice(1);
      return args.some(val => val === '--serve');
    }

    static getAppRoot() {
      const serve = this.isServe();

      if (serve) {
        return app.getAppPath();
      }

      if (process.platform === 'win32') {
        return path.join(app.getAppPath(), '../../');
      } else {
        return path.join(app.getAppPath(), '../../../../');
      }
    }
}

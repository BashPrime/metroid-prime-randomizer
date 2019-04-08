export class Utilities {
  static isServe(): boolean {
    const args = process.argv.slice(1);
    return args.some(val => val === '--serve');
  }

  static getBaseLog(x: number, base: number) {
    return Math.log(x) / Math.log(base);
  }
}

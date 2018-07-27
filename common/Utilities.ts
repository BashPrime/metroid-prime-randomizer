export class Utilities {
    static toPaddedHexString(num: number, len: number): string {
        const str = num.toString(16);
        return '0'.repeat(len - str.length) + str;
    }

    static isServe(): boolean {
        const args = process.argv.slice(1);
        return args.some(val => val === '--serve');
    }
}
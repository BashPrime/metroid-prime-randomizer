export class Utilities {
    static toPaddedHexString(num: number, len: number) {
        const str = num.toString(16);
        return "0".repeat(len - str.length) + str;
    }
}
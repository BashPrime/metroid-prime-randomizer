import { app } from 'electron';
import * as path from 'path';

import { MersenneTwister } from './mersenneTwister';

/**
 * Returns true if the Electron process is running with the --serve flag enabled.
 */
export function isServe(): boolean {
  const args = process.argv.slice(1);
  return args.some(val => val === '--serve');
}

/**
 * Returns the full data path for the randomizer application.
 */
export function getAppDataPath(): string {
  return path.join(app.getPath('userData'), 'data');
}

export function getBaseLog(x: number, base: number) {
  return Math.log(x) / Math.log(base);
}

/**
 * Returns a pseudorandom integer between a minimum and maximum number, both inclusive.
 * 
 * @param min The minimum number in the range, inclusive
 * @param max The maximum number in the range, inclusive
 * @param rng An optional random number generator to use for the psuedorandom function
 */
export function getRandomInt(min: number, max: number, rng?: MersenneTwister) {
  // If rng isn't passed in, use Math.random() instead.
  const random = rng ? rng.random() : Math.random();

  return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Converts a number to a zero-padded bitstring of specified length
 * 
 * @param value The number being converted
 * @param length The total length (in bits) of the bit string
 */
export function toPaddedBitString(value: number, length: number): string {
  const bits = value.toString(2);
  return '0'.repeat(length - bits.length) + bits;
}

/**
 * Returns a random subset of a given array.
 * 
 * @param arr The input array
 * @param size The size of the returned array
 * @param rng Random number generator to use for randomization
 */
export function randomArray<T>(arr: T[], size: number, rng: MersenneTwister): T[] {
  // Return null if array is empty or specified size is zero
  if (arr.length < 1 || size < 1) {
    return null;
  }

  // Shallow copy array so arr isn't affected
  const oldItems = [...arr];
  let newItems = [];

  while (size-- > 0 && oldItems.length > 0) {
    newItems.push(...oldItems.splice(getRandomInt(0, oldItems.length - 1, rng), 1));
  }

  return newItems;
}

/**
 * Truncates and converts a hexidecimal sha256 hash into a safe integer.
 * 
 * @param sha256 A hexidecimal sha256 string to be converted.
 * @returns `null` if `sha256` isn't a valid sha256 hexadecimal string.
 */
export function parseSafeIntegerFromSha256(sha256: string): number {
  // Make sure hexadecimal string is 64 characters long
  if (sha256.length !== 64) {
    return null;
  }

  /*
  * Parse the first 14 characters of the sha256 hash. If the resulting integer is safe, return it.
  * Else, parse the first 13 characters of a hash and return the resulting number, which is
  * guaranteed to be a safe integer.
  *
  * For reference, Number.MAX_SAFE_INTEGER's hex equivalent is 1fffffffffffff. (length 14 characters)
  * If the hash is less than or equal to 1fffffffffffff, you can safely parse the first 14 characters.
  */

  try {
    // Get the length of Number.MAX_SAFE_INTEGER in hexadecimal form (1fffffffffffff, length should be 14)
    let safeHexChars = Number.MAX_SAFE_INTEGER.toString(16).length;

    // Parse the truncated hash using the first 14 characters
    let sha256Integer = parseInt(sha256.substr(0, safeHexChars), 16);

    // If sha256Integer is a safe integer, return it.
    if (Number.isSafeInteger(sha256Integer)) {
      return sha256Integer;
    }

    // Else, parse the first 13 characters of the hash and return it.
    return parseInt(sha256.substr(0, safeHexChars - 1), 16);
  }
  catch (err) {
    // The string is invalid and can't be parsed.
    return null;
  }
}

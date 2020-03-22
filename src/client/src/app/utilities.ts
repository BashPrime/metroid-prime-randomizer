import { PERMALINK_SEPARATOR } from '../../../common/constants';

export function filterProperties(obj: object, remove: string[]): object {
  const raw = JSON.parse(JSON.stringify(obj));

  return Object.keys(raw)
    .filter(key => !remove.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
}

/**
 * Generates a base64 string from the given seed and permalink
 * @param seed The seed string used for setting the RNG seed.
 * @param settingsString The settings string representing the settings used.
 */
export function generatePermalink(seed: string, settingsString: string): string {
  if (seed && settingsString) {
    return btoa(seed + PERMALINK_SEPARATOR + settingsString);
  }

  return null;
}

/**
 * Parses a provided base64 permalink string into the seed and settings strings.
 * @param permalink The permalink to be parsed
 */
export function parsePermalink(permalink: string): { seed: string, settingsString: string } {
  let decodedString: string;
  const expectedEntries = 2;

  try {
    decodedString = atob(permalink);
  } catch (err) {
    throw new Error('The permalink is incorrectly encoded, and could not be parsed.');
  }

  const decodedEntries = atob(permalink).split(PERMALINK_SEPARATOR);

  if (decodedEntries.length !== expectedEntries) {
    throw new Error(`Incorrect number of entries in the permalink. (expected: 2, actual: ${decodedEntries.length})`);
  }

  return {
    seed: decodedEntries[0],
    settingsString: decodedEntries[1]
  };
}

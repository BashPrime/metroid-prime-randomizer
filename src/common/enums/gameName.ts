/** Keys used to describe which Prime game is being referenced */
export enum GameName {
  PRIME1 = 'prime1',
  PRIME2 = 'prime2',
  PRIME3 = 'prime3'
}

/**
 * Stores short and long names of the Prime games.
 */
export const NAMES = {
  [GameName.PRIME1]: {
    short: 'Prime',
    long: 'Metroid Prime'
  },
  [GameName.PRIME2]: {
    short: 'Echoes',
    long: 'Metroid Prime 2: Echoes'
  },
  [GameName.PRIME3]: {
    short: 'Corruption',
    long: 'Metroid Prime 3: Corruption'
  }
}

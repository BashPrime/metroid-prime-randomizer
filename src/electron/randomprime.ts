// Defines randomprime interface
export interface RandomPrime {
  patchRandomizedGame: (json: string, callback: any) => void;
}

// Use __non_webpack_require__ to resolve randomprime addon at runtime
const randomprime: RandomPrime = __non_webpack_require__('./build/release/randomprime');
export default randomprime;

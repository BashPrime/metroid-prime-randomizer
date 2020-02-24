// Defines randomprime interface
export interface RandomPrime {
  patchRandomizedGame: (json: string, callback: any) => void;
}

// Use __non_webpack_require__ to resolve randomprime addon at runtime
// The path is intentionally because this will ultimately be called in the compiled main.js in the app root.
const randomprime: RandomPrime = __non_webpack_require__('./build/Release/randomprime');
export default randomprime;

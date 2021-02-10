/**
 * Provides enums and supporting functions for damage strictness multipliers.
 * 
 * These multipliers are used for calculating player damage during world traversal.
 */
export default class DamageStrictness {
  static readonly STRICT: number = 1;
  static readonly MEDIUM: number = 1.5;
  static readonly LENIENT: number = 2;

  static longName(strictness: number): string {
    switch (strictness) {
      case this.STRICT: return 'Strict';
      case this.MEDIUM: return 'Medium';
      case this.LENIENT: return 'Lenient';
      default: return 'Custom';
    }
  }
}

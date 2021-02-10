import { DamageStrictness as DamageStrictnessEnum } from '../enums/damageStrictness';

/**
 * Provides supporting functions for damage strictness multipliers.
 *
 * These multipliers are used for calculating player damage during world traversal.
 */
export default class DamageStrictness {
  /**
   * Returns a prettified "long name" based on the damage strictness level.
   *
   * @param strictness The damage strictness value being evaluated
   */
  static longName(strictness: DamageStrictness): string {
    switch (strictness) {
      case DamageStrictnessEnum.STRICT: return 'Strict';
      case DamageStrictnessEnum.MEDIUM: return 'Medium';
      case DamageStrictnessEnum.LENIENT: return 'Lenient';
      default: return 'Custom';
    }
  }
}

/**
 * Logical representation of the client-side randomizer form value
 */
export interface RandomizerForm {
  seed: string;
  romSettings: RomSettings;
  rules: Rules;
  logic: Logic;
}

/**
 * Represents the configuration for the randomized and patched rom output.
 */
interface RomSettings {
  baseIso: string;
  outputFolder: string;
  trilogyIso: string;
  generateRom: boolean;
  fileType: string;
  createSpoilerLog: boolean;
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
}

/**
 * Describes game-wide rules
 */
interface Rules {
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
  goal: string;
  requiredArtifacts: number;
  artifactLocationHints: string;
  excludedShuffleItems: string[];
}

/**
 * Describes the available item logic mutators
 */
interface Logic {
  alcoveNoItems: boolean;
  boostThroughBombTunnels: boolean;
  climbTowerOfLightNoMissiles: boolean;
  crossTwinFiresTunnelWithoutSpider: boolean;
  mainPlazaItemsOnlySpaceJump: boolean;
  towerChamberNoGravity: boolean;
  upperRuinedShrineTowerOfLightFewerAccessReqs: boolean;
  warriorShrineWithoutBoost: boolean;
}

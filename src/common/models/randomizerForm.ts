export interface RandomizerForm {
  seed: string;
  romSettings: RomSettings;
  rules: Rules;
  logic: Logic;
}

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

interface Rules {
  skipFrigate: boolean;
  skipHudPopups: boolean;
  hideItemModels: boolean;
  goal: string;
  requiredArtifacts: number;
  artifactLocationHints: string;
  excludedShuffleItems: string[];
}

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

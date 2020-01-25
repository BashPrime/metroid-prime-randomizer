export interface RandomizerForm {
  romSettings: {
    skipFrigate: boolean;
    skipHudPopups: boolean;
    hideItemModels: boolean;
  };
  rules: {
    goal: string;
    goalArtifacts: number;
    artifactLocationHints: boolean;
    elevatorShuffle: boolean;
    heatProtection: string;
    suitDamageReduction: string;
  };
  excludeLocations: string[];
  tricks: string[];
}

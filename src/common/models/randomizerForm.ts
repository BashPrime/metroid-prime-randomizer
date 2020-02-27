import { ItemOverride } from './itemOverride';

export interface RandomizerForm {
  generationCount?: number;
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
    startingArea: number;
    randomStartingItems: {
      min: number;
      max: number;
    };
  };
  itemOverrides: ItemOverride[];
  excludeLocations: string[];
  tricks: string[];
}

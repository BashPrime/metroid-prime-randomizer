import { ItemOverride } from './itemOverride';
import { RandomStartingItems } from './randomStartingItems';

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
    randomStartingItems: RandomStartingItems;
    pointOfNoReturnItems: string;
  };
  itemOverrides: ItemOverride[];
  excludeLocations: string[];
  tricks: string[];
}

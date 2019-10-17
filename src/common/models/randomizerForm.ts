export interface RandomizerForm {
  seed: number;
  romSettings: {
    baseIso: string;
    outputFolder: string;
    trilogyIso: string;
    generateRom: boolean;
    
  };
}
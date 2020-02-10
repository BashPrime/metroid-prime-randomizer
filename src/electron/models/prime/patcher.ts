import randomPrimePatcher from '../../randomprime';
import { PrimeWorld } from './world';

type RandomPrime = {
  patchRandomizedGame: (json: string, cb: any) => void;
}

export interface PatcherConfiguration {
  input_iso: string;
  output_iso: string;
  layout_string: string;
  iso_format: string;
  skip_frigate: boolean;
  skip_hudmenus: boolean;
  nonvaria_heat_damage: boolean;
  staggered_suit_damage: boolean;
  obfuscate_items: boolean;
  artifact_hint_behavior: string;
  trilogy_disc_path: string;
  starting_items: number;
  comment: string;
  main_menu_message: string;
}

export function runPatcher(world: PrimeWorld): void {
  const config = {};

  randomPrimePatcher.patchRandomizedGame(JSON.stringify(config), message => {
    console.log(message);
  });
}


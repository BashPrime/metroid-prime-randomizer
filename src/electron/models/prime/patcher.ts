import randomPrimePatcher from '../../randomprime';

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
  show_starting_items: boolean;
  comment: string;
  main_menu_message: string;
  auto_enabled_elevators: boolean;
  enable_vault_ledge_door: boolean;
  skip_impact_crater: boolean;
}

export function runRandomprimePatcher(config: PatcherConfiguration, callback: (message: string) => void): void {
  randomPrimePatcher.patchRandomizedGame(JSON.stringify(config), message => {
    callback(message);
  });
}


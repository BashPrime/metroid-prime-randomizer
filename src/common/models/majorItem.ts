export default interface MajorItem {
  item_category: 'beam' | 'movement' | 'visor' | 'suit' | 'morph_ball' | 'energy_tank' | 'missile' | 'charge_combo';
  broad_category: 'beam_related' | 'movement' | 'visor' | 'morph_ball_related' | 'life_support' | 'missile';
  model_index: number;
  progression: number[];
  required: boolean;
  probability_offset: number;
  probability_multiplier: number;
}

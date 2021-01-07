interface BaseResource {
  index: number;
  long_name: string;
  short_name: string;
}

interface Item extends BaseResource {
  max_capacity: number;
}

interface Trick extends BaseResource {
  description: string;
}

interface DamageReduction {
  index: number;
  multiplier: number;
}

interface Damage extends BaseResource {
  reductions: DamageReduction[];
}

interface RequirementResource {
  type: 'resource';
  data: {
    type: number;
    index: number;
    amount: number;
    negate: boolean;
  };
}

interface Requirement {
  type: 'and' | 'or';
  data: RequirementResource[];
}

interface RequirementTemplate {
  [key: string]: Requirement;
}

interface ResourceDatabase {
  items: Item[];
  energy_tank_item_index: number;
  item_percentage_index: number;
  multiworld_magic_item_index: number;
  events: BaseResource[];
  tricks: Trick[];
  damage: Damage[];
  versions: BaseResource[];
  misc: object[];
  requirement_template: RequirementTemplate;
}

interface StartingLocation {
  world_asset_id: number;
  area_asset_id: number;
}

interface InitialStates {
  [key: string]: object[];
}

interface Door {
  index: number;
  name: string;
  is_blast_door: boolean;
  requirement: Requirement;
}

interface DockWeaknessDatabase {
  door: Door[];
  portal: Door[];
  morph_ball: Door[];
}

interface CoordinateObject {
  x: number;
  y: number;
  z: number;
}

interface ConnectionObject {
  [key: string]: Requirement;
}

interface AreaNode {
  name: string;
  heal: boolean;
  coordinates: CoordinateObject;
  node_type: 'generic' | 'dock' | 'pickup' | 'teleporter' | 'event' | 'translator_gate' | 'logbook' | 'player_ship';
  dock_index: number;
  connected_area_asset_id: number;
  connected_dock_index: number;
  dock_type: number;
  dock_weakness_index: number;
  connections: ConnectionObject;
}

interface Area {
  name: string;
  in_dark_aether: boolean;
  asset_id: number;
  default_node_index: number;
  valid_starting_location: boolean;
  nodes: AreaNode[];
}

interface World {
  name: string;
  dark_name: string;
  asset_id: number;
  areas: Area[];
}

export default interface Database {
  game: string;
  resource_database: ResourceDatabase;
  game_specific: object;
  starting_location: StartingLocation;
  initial_states: InitialStates;
  victory_condition: Requirement;
  dock_weakness_database: DockWeaknessDatabase;
  worlds: World[];
}

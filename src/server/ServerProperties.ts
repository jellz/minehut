export interface ServerProperties {
	[key: string]: string | number | boolean;
	level_type: string;
	gamemode: 0 | 1 | 2 | 3;
	spawn_animals: boolean;
	allow_flight: boolean;
	spawn_protection: number;
	allow_nether: boolean;
	announce_player_achievements: boolean;
	difficulty: 0 | 1 | 2 | 3 | number | string;
	enable_command_block: boolean;
	force_gamemode: boolean;
	generate_structures: boolean;
	generator_settings: string;
	hardcore: boolean;
	level_name: string;
	level_seed: string;
	max_players: number;
	pvp: boolean;
	resource_pack: boolean;
	resource_pack_sha1: string;
	spawn_mobs: boolean;
	view_distance: number;
}

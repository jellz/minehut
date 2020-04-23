import { ServerProperties } from './ServerProperties';

export interface ServerResponse {
	_id: string;
	owner: string;
	name: string;
	name_lower: string;
	creation: number;
	platform: 'java';
	__v: number;
	port: number;
	dns_id: string;
	motd: string;
	visibility: boolean;
	credits_per_day: number;
	storage_node: string;
	last_online: number;
	offer: string;
	server_properties: ServerProperties;
	suspended: boolean;

	purchased_icons: string[];
	active_plugins: string[];
	purchased_plugins: string[];
	plugins_loaded: string[];
	
	online: boolean;
	maxPlayers: number;
	playerCount: number;
	players: string[];
}

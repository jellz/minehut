export interface ServerResponse {
	_id: string;
	owner: string;
	name: string;
	name_lower: string;
	creation: number;
	platform: 'java';
	__v: number;
	port: number;
	motd: string;
	visibility: boolean;
	credits_per_day: number;
	storage_node: string;
	last_online: number;
	offer: string;
	suspended: boolean;
	categories: string[];
	connectedServers: string[];
	proxy: boolean;
	server_plan: string;
	server_version_type: string;

	purchased_icons: string[];

	active_icon: string; // id
	icon: string; // name

	online: boolean;
	maxPlayers: number;
	playerCount: number;
}

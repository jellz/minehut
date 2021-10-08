import { ServerProperties } from './ServerProperties';

interface InstalledContent {
	pinned: boolean;
	_id: string;
	content_id: string;
	content_version_id: string;
	install_date: string;
	last_updated: string;
}
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
	server_properties: ServerProperties;
	suspended: boolean;
	categories: string[];

	purchased_icons: string[];

	active_icon: string; // id
	icon: string; // name

	installed_content: InstalledContent[];

	online: boolean;
	maxPlayers: number;
	playerCount: number;
}

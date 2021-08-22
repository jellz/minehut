import { ServerResponse } from './ServerResponse';
import { ServerProperties } from './ServerProperties';
import { Minehut } from '../Minehut';

export class Server {
	client: Minehut;

	id: string;
	owner: string;
	name: string;
	nameLower: string;
	createdAt: Date;
	platform: 'java';
	__v: number;
	port: number;
	motd: string;
	visibility: boolean;
	creditsPerDay: number;
	storageNode: string;
	lastOnline: Date;
	offer: string;
	serverProperties: ServerProperties;
	suspended: boolean;

	online: boolean;
	maxPlayers: number;
	playerCount: number;

	raw: ServerResponse;

	constructor(server: ServerResponse, client: Minehut) {
		this.client = client;

		this.id = server._id;
		this.owner = server.owner;
		this.name = server.name;
		this.nameLower = server.name_lower;
		this.createdAt = new Date(server.creation);
		this.platform = server.platform;
		this.__v = server.__v;
		this.port = server.port;
		this.motd = server.motd;
		this.visibility = server.visibility;
		this.creditsPerDay = server.credits_per_day;
		this.storageNode = server.storage_node;
		this.lastOnline = new Date(server.last_online);
		this.offer = server.offer;
		this.serverProperties = server.server_properties;
		this.suspended = server.suspended;

		this.online = server.online;
		this.maxPlayers = server.maxPlayers;
		this.playerCount = server.playerCount;

		this.raw = server;
	}

	async getPurchasedIcons() {
		return await this.client.icons.fetch(this.raw.purchased_icons);
	}

	async getActiveIcon() {
		return (await this.client.icons.fetch([this.raw.active_icon]))[0];
	}

	async getInstalledContent() {
		const allAddons = await this.client.addons.fetchAll();
		const installedIds = this.raw.installed_content.map(c => c.content_id);
		return installedIds.map(id => allAddons.find(a => a.id === id)!);
	}
}

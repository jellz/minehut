import { ServerResponse } from './ServerResponse';
import { ServerProperties } from './ServerProperties';
import { Icon } from '../icon/Icon';
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
	dnsId: string;
	motd: string;
	visibility: boolean;
	creditsPerDay: number;
	storageNode: string;
	lastOnline: Date;
	offer: string;
	serverProperties: ServerProperties;
	suspended: boolean;
	// need to make these types
	purchasedIcons: (Icon | undefined)[];
	// activePlugins: Plugin[];
	// purchasedPlugins: Plugin[];
	// pluginsLoaded: Plugin[];
	online: boolean;
	maxPlayers: number;
	playerCount: number;
	players: string[];

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
		this.dnsId = server.dns_id;
		this.motd = server.motd;
		this.visibility = server.visibility;
		this.creditsPerDay = server.credits_per_day;
		this.storageNode = server.storage_node;
		this.lastOnline = new Date(server.last_online);
		this.offer = server.offer;
		this.serverProperties = server.server_properties;
		this.suspended = server.suspended;

		// this.purchasedIcons = this.getPurchasedIcons(server.purchased_icons);
		this.purchasedIcons = this.getPurchasedIcons(server.purchased_icons);

		this.online = server.online;
		this.maxPlayers = server.maxPlayers;
		this.playerCount = server.playerCount;
		this.players = server.players;
	}

	private getPurchasedIcons(purchasedIcons: string[]) {
		const icons = this.client.icons.get(purchasedIcons);
		return Array.isArray(icons) ? icons : [icons];
	}
}

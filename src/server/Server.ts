import { ServerDeletion, ServerResponse } from './ServerResponse';
import { Minehut } from '../Minehut';
import { DAILY_ONLINE_TIME } from '../constants';
import { prettyPlan, ServerPlan } from '../utils/functions';

/**
 * Represents a Minehut Server
 */
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
	suspended: boolean;
	categories: string[];
	connectedServers: string[];
	proxy: boolean;
	serverPlan: string;
    activeServerPlan: string;
    rawPlan: string;
    prettyPlan: ServerPlan;
	serverType: string;

    defaultBannerImage: string;
    defaultBannerTint: string;

	online: boolean;
	maxPlayers: number;
	playerCount: number;
    hidden: boolean;
    expired: boolean;
    usingCosmetics: boolean;
    joins: number;

    dailyOnlineTime: Record<string, number>;
    deletion: ServerDeletion;

	raw: ServerResponse;
	constructor(client: Minehut, server: ServerResponse) {
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
		this.suspended = server.suspended;
		this.categories = server.categories;
		this.connectedServers = server.connectedServers;
		this.proxy = server.proxy;
		this.serverPlan = server.server_plan;
        this.activeServerPlan = server.activeServerPlan;
        this.rawPlan = server.rawPlan;
        this.prettyPlan = prettyPlan(this.serverPlan);
		this.serverType = server.server_version_type;

        this.defaultBannerImage = server.default_banner_image;
        this.defaultBannerTint = server.default_banner_tint;

		this.online = server.online;
		this.maxPlayers = server.maxPlayers;
		this.playerCount = server.playerCount;
        this.hidden = server.hidden;
        this.expired = server.expired;
        this.usingCosmetics = server.using_cosmetics;
        this.joins = server.joins;

        this.dailyOnlineTime = server.daily_online_time;
        this.deletion = server.deletion;

		this.raw = server;
	}

    /**
     * Gets a list of the server's purchased icons
     * @returns {Promise<Icon[]>}
     * @example const icons = await server.getPurchasedIcons();
     */
	async getPurchasedIcons() {
		return await this.client.icons.fetch(this.raw.purchased_icons);
	}

    /**
     * Gets the server's active icon
     * @returns {Promise<Icon>}
     * @example const activeIcon = await server.getActiveIcon();
     */
	async getActiveIcon() {
		return (await this.client.icons.fetch([this.raw.active_icon]))[0];
	}

    /**
     * Gets the time in milliseconds of how much of the daily online time has been used. 
     * 
     * Returns -1 if the server is not a Starter server.
     * @returns {number}
     * @example const timeUsed = await server.getDailyTimeUsed();
     */
    getDailyTimeUsed() {
        if (this.activeServerPlan !== 'Starter') return -1;
        return DAILY_ONLINE_TIME - this.getDailyTimeLeft();
    }

    /**
     * Gets the time in milliseconds of how much of the daily online time is left. 
     * 
     * Returns -1 if the server is not a Starter server.
     * @returns {number}
     * @example const timeLeft = await server.getDailyTimeLeft();
     */
    getDailyTimeLeft() {
        if (this.activeServerPlan !== 'Starter') return -1;
        const now = new Date();
        const timeSinceLastOnline = now.getTime() - this.lastOnline.getTime();
        let value = Object.values(this.raw.daily_online_time)[0];
        if (this.online) value += timeSinceLastOnline;
        return value ? DAILY_ONLINE_TIME - value : DAILY_ONLINE_TIME;
    }
}
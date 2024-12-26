import { MINEHUT_DEV_API_BASE, MINEHUT_API_BASE } from './constants';
import { ServerManager } from './server/ServerManager';
import { IconManager } from './icon/IconManager';
import { SimpleStatsResponse } from './stats/SimpleStatsResponse';
import { PlayerDistributionResponse } from './stats/PlayerDistributionResponse';
import { HomePageStatsResponse } from './stats/HomePageStatsResponse';
import { ResourcePackResponse } from './stats/ResourcePackResponse';
import { PlayerManager } from './player/PlayerManager';
import { MinehutStatus } from './utils/functions';
import { Rank } from './stats/RankResponse';

/**
 * The Minehut API client
 * @example
 * const minehut = new Minehut();
 * const devMinehut = new Minehut({ dev: true });
 */
export class Minehut {
    /**
     * The Minehut Icon Manager
     * @type {IconManager}
     */
	icons: IconManager;
    /**
     * The Minehut Server Manager
     * @type {ServerManager}
     */
	servers: ServerManager;
    /**
     * The Minehut Player Manager
     * @type {PlayerManager}
     */
    players: PlayerManager;

    /**
     * Whether the client is in development mode. 
     * When in development mode, the client will use the Minehut Development API.
     * @type {boolean}
     */
    dev: boolean;
    /**
     * The base URL of the Minehut API
     * @type {string}
     */
	API_BASE: string;

	constructor(settings: MinehutSettings = { dev: false }) {
        this.dev = settings.dev || false;
		this.API_BASE = settings.dev ? MINEHUT_DEV_API_BASE : MINEHUT_API_BASE;

		this.icons = new IconManager(this);
		this.servers = new ServerManager(this);
        this.players = new PlayerManager(this);
	}

    /**
     * Get the simple stats of the Minehut network
     * @returns {Promise<SimpleStatsResponse>}
     * @throws {Error} If the request fails
     * @example const stats = await minehut.getSimpleStats();
     */
	async getSimpleStats() {
		const res = await fetch(`${this.API_BASE}/network/simple_stats`);
		if (!res.ok) throw new Error(res.statusText);
		const json: SimpleStatsResponse = await res.json();
		const ramCount = parseFloat((json.ram_count / 1000).toFixed(1));
		return {
			serverCount: json.server_count,
			serverMax: json.server_max,
			playerCount: json.player_count,
			ramCount,
			ramMax: json.ram_max,
            freeServerLimit: json.server_free,
            paidServerLimit: json.server_paid,
		};
	}

    /**
     * Get the player distribution of the Minehut network
     * @returns {Promise<PlayerDistributionResponse>}
     * @throws {Error} If the request fails
     * @example const playerDistribution = await minehut.getPlayerDistribution();
     */
	async getPlayerDistribution() {
		const res = await fetch(`${this.API_BASE}/network/players/distribution`);
		if (!res.ok) throw new Error(res.statusText);
		const json: PlayerDistributionResponse = await res.json();
		return {
			bedrock: {
				total: json.bedrockTotal,
				lobby: json.bedrockLobby,
				playerServer: json.bedrockPlayerServer,
			},
			java: {
				total: json.javaTotal,
				lobby: json.javaLobby,
				playerServer: json.javaPlayerServer,
			},
		};
	}

    /**
     * Get the homepage stats of the Minehut network
     * @returns {Promise<HomePageStatsResponse>}
     * @throws {Error} If the request fails
     * @example const homePageStats = await minehut.getHomePageStats();
     */
	async getHomePageStats() {
		const res = await fetch(`${this.API_BASE}/network/homepage_stats`);
		if(!res.ok) throw new Error(res.statusText);
		const json: HomePageStatsResponse = await res.json();
		return {
			serverCount: json.server_count,
			userCount: json.user_count,
		};
	}

    /**
     * Get the resource pack of the Minehut network
     * @returns {Promise<ResourcePackResponse>}
     * @throws {Error} If the request fails
     * @example const resourcePack = await minehut.getResourcePack();
     */
    async getResourcePack() {
        const res = await fetch(`${this.API_BASE}/network/resourcepacks/info`);
        if (!res.ok) throw new Error(res.statusText);
        const json: ResourcePackResponse = await res.json();
        return json;
    }

    /**
     * Get the status of the Minehut network
     * @returns {Promise<MinehutStatus>}
     * @example const status = await minehut.getMinehutStatus();
     */
    async getMinehutStatus() {
		const data: MinehutStatus = {
			minecraft_java: 'Working',
			minecraft_bedrock: 'Working',
			minecraft_proxy: 'Working',
			api: 'Working',
			bedrock_version: '?',
			latest_bedrock_version: '?'
		};

		const network = await this.getSimpleStats();
		const distribution = await this.getPlayerDistribution();
		if (network == null) data.api = 'Offline';

		// Bedrock handling
		if (distribution.bedrock.total < 50) data.minecraft_bedrock = 'Degraded';
		if (distribution.bedrock.total== 0) data.minecraft_bedrock = 'Offline';

		// Java handling
		if (distribution.java.total < 1000) data.minecraft_java = 'Degraded';
		if (distribution.java.total == 0) data.minecraft_java = 'Offline';

		const proxy = await fetch('https://mcapi.us/server/status?ip=minehut.com');
		if (!proxy.ok) data.minecraft_proxy = 'Offline';
		const proxyJson = await proxy.json();
		if (!proxyJson.online) data.minecraft_proxy = 'Offline';

		const bedrock = await fetch('https://api.mcsrvstat.us/bedrock/2/bedrock.minehut.com');
		if (!bedrock.ok) data.minecraft_bedrock = 'Offline';
		const bedrockJson = await bedrock.json();
		if (!bedrockJson.online) data.minecraft_bedrock = 'Offline';

		return data;
	}

    /**
     * Get the ranks of the Minehut network
     * @returns {Promise<Rank[]>}
     * @throws {Error} If the request fails
     * @example const ranks = await minehut.getRanks();
     */
	async getRanks() {
		const res = await fetch(`${this.API_BASE}/network/ranks`);
		if (!res.ok) throw new Error(`Failed to fetch ranks: ${res.statusText}`);
		const json: Rank[] = await res.json();
		return json;
	}
}

export interface MinehutSettings {
	dev?: boolean;
}
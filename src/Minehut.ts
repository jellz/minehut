import { DEV_MINEHUT_API_BASE, MINEHUT_API_BASE } from './constants';
import { ServerManager } from './server/ServerManager';
import { IconManager } from './icon/IconManager';
import fetch from 'node-fetch';

import { SimpleStatsResponse } from './stats/SimpleStatsResponse';
import { PlayerDistributionResponse } from './stats/PlayerDistributionResponse';
import { AddonManager } from './addon/AddonManager';
import { MakerManager } from './maker/MakerManager';
import { HomePageStatsResponse } from './stats/HomePageStatsResponse';

export class Minehut {

	icons: IconManager;
	servers: ServerManager;
	addons: AddonManager;
	makers: MakerManager;

	API_BASE: string;

	constructor(settings: MinehutSettings = { dev: false }) {
		this.API_BASE = settings.dev ? DEV_MINEHUT_API_BASE : MINEHUT_API_BASE;

		this.icons = new IconManager(this);
		this.servers = new ServerManager(this);
		this.addons = new AddonManager(this);
		this.makers = new MakerManager();
	}

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
		};
	}

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

	async getHomePageStats() {
		const res = await fetch(`${this.API_BASE}/network/homepage_stats`);
		if(!res.ok) throw new Error(res.statusText);
		const json: HomePageStatsResponse = await res.json();
		return {
			serverCount: json.server_count,
			userCount: json.user_count,
		};
	}
}

export interface MinehutSettings {
	dev?: boolean;
}

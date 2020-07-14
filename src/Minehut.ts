import { MINEHUT_API_BASE } from './constants';
import { ServerManager } from './server/ServerManager';
import { IconManager } from './icon/IconManager';
import { PluginManager } from './plugin/PluginManager';
import fetch from 'node-fetch';

import { SimpleStatsResponse } from './stats/SimpleStatsResponse';
import { PlayerDistributionResponse } from './stats/PlayerDistributionResponse';

export class Minehut {
	session: null; // Session in the future
	user: null; // User/ClientUser in the future

	icons: IconManager;
	servers: ServerManager;
	plugins: PluginManager;

	API_BASE: string;

	constructor() {
		this.API_BASE = MINEHUT_API_BASE;

		this.icons = new IconManager(this);
		this.servers = new ServerManager(this);
		this.plugins = new PluginManager(this);
	}

	async getSimpleStats() {
		const res = await fetch(`${this.API_BASE}/network/simple_stats`);
		if (!res.ok) throw new Error(res.statusText);
		const json: SimpleStatsResponse = await res.json();
		const ramCount = (json.ram_count / 1000).toFixed(1);
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
}

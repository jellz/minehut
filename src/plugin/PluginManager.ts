import { Minehut } from '../Minehut';
import { Plugin } from './Plugin';
import fetch from 'node-fetch';
import { PluginResponse } from './PluginResponse';

export class PluginManager {
	private client: Minehut;
	private store!: Plugin[];

	constructor(client: Minehut) {
		this.client = client;
		this.store = [];
	}

	async fetch(plugins: string[]) {
		if (this.store.length < 1) await this.fetchAll();
		const found = this.store.filter(plugin => plugins.includes(plugin.id));
		if (found.length < 1) return [] as Plugin[];
		else return found;
	}

	private async fetchAll() {
		const res = await fetch(`${this.client.API_BASE}/plugins_public`);
		if (!res.ok) throw new Error(res.statusText);
		const pluginsRes: PluginResponse[] = (await res.json()).all;
		const plugins = pluginsRes.map(i => new Plugin(i));
		this.store.push(...plugins);
		return plugins;
	}
}

import { Minehut } from '../Minehut';
import { Plugin } from './Plugin';
import fetch from 'node-fetch';
import { PluginResponse } from './PluginResponse';

export class PluginManager {
	private store: Map<string, Plugin> = new Map();

	constructor(public readonly client: Minehut) {}

	async fetch(idOrName: string): Promise<Plugin | null> {
		if (this.store.size < 1) await this.fetchAll(true);
		const found = this.storeToArray().find(
			plugin =>
				idOrName === plugin.id ||
				idOrName.toLowerCase() === plugin.name.toLowerCase()
		);
		return found ?? null;
	}

	/*
		This method can find plugins by exact match or name fragments (e.g. "Tuske" will resolve to "Skript Addon: TuSKe", while "skript" will resolve to "Skript")
	*/
	async search(query: string) {
		const exact = await this.fetch(query);
		if (exact) return [exact];
		return (
			this.storeToArray().filter(plugin =>
				plugin.name.toLowerCase().includes(query.toLowerCase())
			) || null
		);
	}

	async fetchAll(force: boolean = false) {
		if (!force && this.store.size > 0) return this.storeToArray();
		const res = await fetch(`${this.client.API_BASE}/plugins_public`);
		if (!res.ok) throw new Error(res.statusText);
		const pluginsRes: PluginResponse[] = (await res.json()).all;
		const plugins = pluginsRes.map(i => new Plugin(i));
		plugins.forEach(plugin => this.store.set(plugin.id, plugin));
		return this.storeToArray();
	}

	storeToArray() {
		return [...this.store.values()];
	}
}

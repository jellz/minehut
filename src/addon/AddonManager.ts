import { Minehut } from '../Minehut';
import { Addon } from './Addon';
import fetch from 'node-fetch';
import { AddonResponse } from './AddonResponse';
import { SUPER_LEAGUE_MERCHANDISE } from '../constants';

const CACHE_EXPIRY = 1.8e6; // 30 minutes

export class AddonManager {
	private store: Map<string, Addon> = new Map();
	private lastStoreUpdate?: Date;

	constructor(public readonly client: Minehut) {}

	async fetch(idOrName: string): Promise<Addon | null> {
		const found = (await this.fetchAll()).find(
			addon =>
				idOrName === addon.id ||
				idOrName.toLowerCase() === addon.title.toLowerCase()
		);
		return found ?? null;
	}

	/*
		This method can find addons by exact match or name fragments (e.g. "Tuske" will resolve to "Skript Addon: TuSKe", while "skript" will resolve to "Skript")
	*/
	async search(query: string) {
		const exact = await this.fetch(query);
		if (exact) return [exact];
		return (
			this.storeToArray().filter(addon =>
				addon.title.toLowerCase().includes(query.toLowerCase())
			) || null
		);
	}

	async fetchAll(force: boolean = false) {
		const cacheExpired =
			this.lastStoreUpdate &&
			Date.now() - this.lastStoreUpdate.getTime() > CACHE_EXPIRY;

		if (!force && this.store.size > 0 && !cacheExpired)
			return this.storeToArray();

		const res = await fetch(
			`${SUPER_LEAGUE_MERCHANDISE}/merchandise/v1/merchandise/products/?populateVersions=true`
		);
		if (!res.ok) throw new Error(res.statusText);
		const addonsRes: AddonResponse[] = (await res.json()).products;
		const addons = addonsRes.map(i => new Addon(i));
		addons.forEach(addon => this.store.set(addon.id, addon));

		this.lastStoreUpdate = new Date();
		return this.storeToArray();
	}

	storeToArray() {
		return [...this.store.values()];
	}
}

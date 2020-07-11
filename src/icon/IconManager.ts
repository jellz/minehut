import { Minehut } from '../Minehut';
import { Icon } from './Icon';
import fetch from 'node-fetch';
import { IconResponse } from './IconResponse';

export class IconManager {
	private client: Minehut;
	private store!: Icon[];

	constructor(client: Minehut) {
		this.client = client;
		this.store = [];
	}

	// No byName option for IconManager#get, yet...
	async fetch(icons: string[]) {
		if (this.store.length < 1) await this.fetchAll();
		const found = this.store.filter(icon => icons.includes(icon.id));
		if (found.length < 1) return [] as Icon[];
		else return found;
	}

	private async fetchAll() {
		const res = await fetch(`${this.client.API_BASE}/servers/icons`);
		if (!res.ok) throw new Error(res.statusText);
		const iconsRes: IconResponse[] = await res.json();
		const icons = iconsRes.map(i => new Icon(i));
		this.store.push(...icons);
		return icons;
	}
}

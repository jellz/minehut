import { Minehut } from "../Minehut";
import { Icon } from "./Icon";
import fetch from "node-fetch";
import { IconResponse } from "./IconResponse";

export class IconManager {
	client: Minehut;
	store!: Icon[];

	constructor(client: Minehut) {
		this.client = client;
		this.getIcons().then(icons => this.store = icons).catch(() => this.store = [] as Icon[]);
	}

	private async getIcons() {
		const res = await fetch(`${this.client.API_BASE}/servers/icons`);
		if (!res.ok) throw new Error(res.status.toString());
		const json = await res.json() as IconResponse[];
		return json.map(i => new Icon(i));
	}

	// No byName option for IconManager#get, yet...
	get(icons: string | string[]) {
		if (Array.isArray(icons)) { // finding multiple icons
			const found = icons.map(i => this.store.find(storeIcon => i === storeIcon.id));
			if (found.length < 1) return [] as Icon[];
			else return found;
		}
		return this.store.find(i => icons === i.id);
	}
}
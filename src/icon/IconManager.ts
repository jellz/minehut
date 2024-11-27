import { Minehut } from '../Minehut';
import { Icon } from './Icon';
import fetch from 'node-fetch';
import { IconResponse, IconsAvailableResponse } from './IconResponse';

/**
 * The Minehut Icon Manager
 */
export class IconManager {
	private client: Minehut;
	private store!: Icon[];

	constructor(client: Minehut) {
		this.client = client;
		this.store = [];
	}

    /**
     * Get an icon by name or id
     * @param icon the name or id of the icon
     * @param byName whether to search by name or id
     * @returns {Promise<Icon | null>}
     * @example const icon = await minehut.icons.get('Cake');
     */
    async get(icon: string, byName: boolean = true) {
        if (this.store.length < 1) await this.fetchAll();
        const found = this.store.find(i => byName ? i.displayName === icon : i.id === icon);
        if (!found) return null;
        else return found;
    }

    /**
     * Fetch a list of icons by their ids
     * @param icons a list of icon ids to fetch
     * @returns {Promise<Icon[]>}
     * @example const icons = await minehut.icons.fetch(['5e74719738451e006888cb08']);
     */
	async fetch(icons: string[]) {
		if (this.store.length < 1) await this.fetchAll();
		const found = this.store.filter(icon => icons.includes(icon.id));
		if (found.length < 1) return [] as Icon[];
		else return found;
	}

    /**
     * Fetch a list of all currently available icons in the Minehut store
     * @returns {Promise<IconsAvailableResponse>}
     * @throws {Error} If the request fails
     * @example const availableIcons = await minehut.icons.fetchAvailable();
     */
    async fetchAvailable() {
		const res = await fetch(`${this.client.API_BASE}/servers/available_icons`);
		if (!res.ok) throw new Error(res.statusText);
		const data: IconsAvailableResponse = await res.json();
		return data;
	}

    /**
     * Fetch a list of all icons in the Minehut store
     * @returns {Promise<Icon[]>}
     * @throws {Error} If the request fails
     * @example const icons = await minehut.icons.fetchAll();
     */
	async fetchAll() {
		const res = await fetch(`${this.client.API_BASE}/servers/icons`);
		if (!res.ok) throw new Error(res.statusText);
		const iconsRes: IconResponse[] = await res.json();
		const icons = iconsRes.map(i => new Icon(this.client, i));
        if (this.store.length < 1) this.store.push(...icons);
		return icons;
	}
}
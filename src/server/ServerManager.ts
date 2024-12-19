import { Minehut } from '../Minehut';
import { Server } from './Server';
import { CategoryListResponse, CategoryListResponseItem, ServerCategory, ServerListServer, ServerResponse } from './ServerResponse';
import { urlParams } from '../utils/functions';
import { handleCloudflare } from '../utils/puppeteer';

/**
 * The Minehut Server Manager
 */
export class ServerManager {
	client: Minehut;

    private _categories: CategoryListResponseItem[] = [];

	constructor(client: Minehut) {
		this.client = client;
        this._categories = [];
	}

    /**
     * Get a server by name or id
     * @param server the name or id of the server
     * @param byName whether to search by name or id
     * @returns {Promise<Server>}
     * @example const server = await minehut.servers.get('Minehut');
     */
	async get(server: string, byName: boolean = true) {
		const res = await fetch(`${this.client.API_BASE}/server/${server}${byName ? '?byName=true' : ''}`);
		// The Minehut API returns 502 for unknown servers (???)
		if (!res.ok) throw new Error(res.statusText);
		const json = await res.json();
		const srv: ServerResponse = json.server;
		return new Server(this.client, srv);
	}

    /**
     * Get a list of servers.
     * 
     * Note: Due to the server list endpoint being protected by Cloudflare, this method will only work with the puppeteer option set to true when using Node.js. It will work fine if you are using Bun.
     * @param query the query to search for
     * @param category the category to search for
     * @param limit the maximum number of servers to return
     * @param puppeteer whether to use puppeteer to bypass Cloudflare
     * @returns {Promise<ServerListServer[]>}
     * @throws {Error} If the request fails
     * @example const servers = await minehut.servers.getOnlineServers({ query: 'skyblock', limit: 5 });
     */
    async getOnlineServers({ query, category, limit, puppeteer }: { query?: string, category?: ServerCategory, limit?: number, puppeteer?: boolean } = {}) {
        if (puppeteer) {
            return (await handleCloudflare({ baseUrl: this.client.API_BASE, path: `/servers?${urlParams({ q: query, category, limit })}` })).servers as ServerListServer[];
        }
        const res = await fetch(`${this.client.API_BASE}/servers?${urlParams({ q: query, category, limit })}`);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        const servers: ServerListServer[] = json.servers;
        return servers;
    }

    /**
     * Get the top 5 Minehut servers
     * @returns {Promise<ServerListServer[]>}
     * @throws {Error} If the request fails
     * @example const topServers = await minehut.servers.getTop5Servers();
     */
    async getTop5Servers() {
        const res = await fetch(`${this.client.API_BASE}/network/top_servers`);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        const servers: ServerListServer[] = json.servers;
        return servers;
    }

    /**
     * Get a list of server categories
     * @param fromCache whether to get the categories from the cache
     * @returns {Promise<CategoryListResponseItem[]>}
     * @throws {Error} If the request fails
     * @example const categories = await minehut.servers.getServerCategories();
     */
    async getServerCategories({ fromCache = true }: { fromCache?: boolean } = {}) {
        if (fromCache && this._categories.length > 0) return this._categories;
        const res = await fetch(`${this.client.API_BASE}/v1/server/categories`);
        if (!res.ok) throw new Error(res.statusText);
        const json: CategoryListResponse = await res.json();
        if (!fromCache) this._categories = json.items;
        return json.items;
    }
}
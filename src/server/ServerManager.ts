import { Minehut } from '../Minehut';
import fetch from 'node-fetch';
import { Server } from './Server';
import { ServerResponse } from './ServerResponse';

export class ServerManager {
	client: Minehut;

	constructor(client: Minehut) {
		this.client = client;
	}

	async get(server: string, query: ServerSearchSettings) {
		const res = await fetch(
			`${query.dev ? this.client.DEV_API_BASE : this.client.API_BASE}/server/${server}${query.byName ? '?byName=true' : ''}`
		);
		// The Minehut API returns 502 for unknown servers (???)
		if (!res.ok) throw new Error(res.statusText);
		const json = await res.json();
		const srv: ServerResponse = json.server;
		return new Server(srv, this.client);
	}
}

export interface ServerSearchSettings {
	byName?: boolean;
	dev?: boolean;
}

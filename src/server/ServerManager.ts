import { Minehut } from '../Minehut';
import fetch from 'node-fetch';
import { Server } from './Server';
import { ServerResponse } from './ServerResponse';

export class ServerManager {
	client: Minehut;

	constructor(client: Minehut) {
		this.client = client;
	}

	async get(server: string, byName: boolean = false) {
		const res = await fetch(
			`${this.client.API_BASE}/server/${server}${byName ? '?byName=true' : ''}`
		);
		// The Minehut API returns 502 for unknown servers (???)
		if (!res.ok) return null;
		const json = await res.json();
		const srv: ServerResponse = json.server;
		return new Server(srv, this.client);
	}
}

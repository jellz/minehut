import { API_BASE } from './constants';
import { ServerManager } from './server/ServerManager';
import { IconManager } from './icon/IconManager';

export class Minehut {
	session: null; // Session in the future
	user: null; // User/ClientUser in the future

	icons: IconManager;
	servers: ServerManager;

	API_BASE: string;

	constructor() {
		this.API_BASE = API_BASE;
	
		this.icons = new IconManager(this);
		this.servers = new ServerManager(this);
	}
}

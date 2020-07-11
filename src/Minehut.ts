import { MINEHUT_API_BASE } from './constants';
import { ServerManager } from './server/ServerManager';
import { IconManager } from './icon/IconManager';
import { PluginManager } from './plugin/PluginManager';

export class Minehut {
	session: null; // Session in the future
	user: null; // User/ClientUser in the future

	icons: IconManager;
	servers: ServerManager;
	plugins: PluginManager;

	API_BASE: string;

	constructor() {
		this.API_BASE = MINEHUT_API_BASE;

		this.icons = new IconManager(this);
		this.servers = new ServerManager(this);
		this.plugins = new PluginManager(this);
	}
}

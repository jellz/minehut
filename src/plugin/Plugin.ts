import { PluginResponse } from "./PluginResponse";

export class Plugin {
	id: string;
	name: string;
	credits: number;
	platform: 'java';
	description: string;
	extendedDescription: string;
	version: string;
	disabled: boolean;
	fileName: string;
	configFileName: string;
	createdAt: Date;
	lastUpdatedAt: Date;
	raw: PluginResponse;
	
	constructor(plugin: PluginResponse) {
		this.id = plugin._id;
		this.name = plugin.name;
		this.credits = plugin.credits;
		this.platform = plugin.platform;
		this.description = plugin.desc;
		this.extendedDescription = plugin.desc_extended;
		this.version = plugin.version;
		this.disabled = plugin.disabled;
		this.fileName = plugin.file_name;
		this.configFileName = plugin.config_file_name;

		this.createdAt = new Date(plugin.created);
		this.lastUpdatedAt = new Date(plugin.last_updated);

		this.raw = plugin;
	}
}
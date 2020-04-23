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
	__v: number;
	createdAt: Date;
	lastUpdated: Date;
	
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
		this.__v = plugin.__v;
		this.createdAt = new Date(plugin.created);
		this.lastUpdated = new Date(plugin.last_updated);
	}
}
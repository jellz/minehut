import { IconResponse } from "./IconResponse";

export class Icon {
	id: string;
	displayName: string;
	iconName: string;
	price: number;
	rank: string;
	available: boolean;
	disabled: boolean;
	__v: number;
	created: Date;
	lastUpdated: Date;

	constructor(icon: IconResponse) {
		this.id = icon._id;
		this.displayName = icon.display_name;
		this.iconName = icon.icon_name;
		this.price = icon.price;
		this.rank = icon.rank;
		this.available = icon.available;
		this.disabled = icon.disabled;
		this.__v = icon.__v;
		this.created = new Date(icon.created);
		this.lastUpdated = new Date(icon.last_updated);
	}
}
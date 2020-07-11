import { IconResponse } from "./IconResponse";

export class Icon {
	id: string;
	displayName: string;
	iconName: string;
	price: number;
	rank: string;
	available: boolean;
	disabled: boolean;
	
	createdAt: Date;
	lastUpdatedAt: Date;

	raw: IconResponse;

	constructor(icon: IconResponse) {
		this.id = icon._id;
		this.displayName = icon.display_name;
		this.iconName = icon.icon_name;
		this.price = icon.price;
		this.rank = icon.rank;
		this.available = icon.available;
		this.disabled = icon.disabled;

		this.createdAt = new Date(icon.created);
		this.lastUpdatedAt = new Date(icon.last_updated);

		this.raw = icon;
	}
}
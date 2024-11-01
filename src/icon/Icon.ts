import { MINEHUT_ICON_IMAGES, MINEHUT_ICON_IMAGES_DEV } from '../constants';
import { Minehut } from '../Minehut';
import { IconResponse } from "./IconResponse";

/**
 * Represents a Minehut Icon
 */
export class Icon {
    client: Minehut;

	id: string;
	displayName: string;
	iconName: string;
	price: number;
    salePrice: number | null;
	rank: string;
	available: boolean;
	disabled: boolean;
    imageUrl: string;
	
	createdAt: Date;
	lastUpdatedAt: Date;

	raw: IconResponse;

	constructor(client: Minehut, icon: IconResponse) {
        this.client = client;

		this.id = icon._id;
		this.displayName = icon.display_name;
		this.iconName = icon.icon_name;
		this.price = icon.price;
        this.salePrice = icon.salePrice;
		this.rank = icon.rank;
		this.available = icon.available;
		this.disabled = icon.disabled;
        this.imageUrl = `${this.client.dev ? MINEHUT_ICON_IMAGES_DEV : MINEHUT_ICON_IMAGES}/${this.iconName}.png`;

		this.createdAt = new Date(icon.created);
		this.lastUpdatedAt = new Date(icon.last_updated);

		this.raw = icon;
	}
}
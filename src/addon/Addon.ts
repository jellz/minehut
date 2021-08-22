import { SUPER_LEAGUE_IMAGES } from '../constants';
import { AddonResponse } from './AddonResponse';

type AddonCategory =
	| 'Plugin'
	| 'Script'
	| 'Modpack'
	| 'World'
	| 'Schematic'
	| 'Configuration';

export class Addon {
	id: string;
	title: string;
	shortTitle: string;
	price: number;
	category: AddonCategory;
	createdAt: Date;
	updatedAt: Date;
	version: string;
	description: string;
	shortDescription?: string;
	publisherId: string;
	publisherName: string;
	supportedLanguages: string[];
	imageUrl: string | null;

	constructor(addon: AddonResponse) {
		this.id = addon.sku;
		this.title = addon.title;
		this.shortTitle = addon.shortTitle;
		this.price = addon.price;
		this.category = <AddonCategory>addon.category;
		this.createdAt = new Date(addon.createdAt);
		this.updatedAt = new Date(addon.updatedAt);
		this.version = addon.details.versions[0]!.productVersion;
		this.description = addon.description;
		this.shortDescription = addon.shortDescription;
		this.publisherId = addon.details.publisherId;
		this.publisherName = addon.details.publisherName;
		this.supportedLanguages = addon.details.supportedLanguages;
		this.imageUrl = addon.heroImage.includes('placeholder')
			? null
			: `${SUPER_LEAGUE_IMAGES}/${addon.heroImage}?size=600x338`;
	}
}

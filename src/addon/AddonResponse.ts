export interface Artifact {
	file: string;
	type: string;
	target: string;
}

export interface Manifest {
	artifacts: Artifact[];
	minehut_plugins: any[];
	product: string;
	version: number;
	productVersionId: string;
	publisherId: string;
}

export interface Version {
	supportedVersions: string[];
	dependencies: any[];
	_id: string;
	productVersionId: string;
	manifest: Manifest;
	productVersion: string;
	recommendedServerTier: string;
	publisherId: string;
	sku: string;
	status: string;
	publishedDate: Date;
	submittedDate: Date;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface Details {
	promotionalDiscountOptIn: boolean;
	supportedLanguages: string[];
	contributors: any[];
	compatibleVersions: string[];
	versions: Version[];
	managed: boolean;
	publisherId: string;
	publisherSlug: string;
	publisherName: string;
	publisherLogo: string;
	links: any[];
}

export interface AddonResponse {
	sku: string;
	price: number;
	salePrice?: number;
	title: string;
	shortTitle: string;
	currency: string;
	description: string;
	shortDescription?: string;
	category: string;
	type: string;
	tags: string[];
	heroImage: string;
	images: string[];
	videos: string[];
	visible: boolean;
	slug: string;
	details: Details;
	updatedAt: number;
	createdAt: number;
	status: string;
	releaseDate: number;
	unpublished: boolean;
}

export interface Rank {
	id: string;
	name: string;
	ordinal: number;
	color: string;
	chatColor: string;
	prefixColor: string;
	prefix: string;
	prefixLegacy: string;
	prefixMini: string;
	staff: boolean;
	chatDelaySeconds: number;
	extraPermissions: string[];
	extraAuras: string[];
	adRateLimit: number;
	adMonthlyLimit: number;
	subscription: boolean;
}
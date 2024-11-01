export interface CosmeticResponse {
	profile: {
		purchased: {
			PARTICLE: {
				[type: string]: CosmeticData;
			};
			COMPANION: {
				[type: string]: CosmeticData;
			};
			EMOJI: {
				[type: string]: CosmeticData;
			};
			CRATE: {
				[type: string]: CosmeticData;
			};
			HAT: {
				[type: string]: CosmeticData;
			};
			ITEM: {
				[type: string]: CosmeticData;
			};
			BALLOON: {
				[type: string]: CosmeticData;
			};
			TRINKET: {
				[type: string]: CosmeticData;
			};
			WING: {
				[type: string]: CosmeticData;
			};
		}
	}
	equipped: {
		PARTICLE: string;
		COMPANION: string;
		OFF_HAND: string;
		MAIN_HAND: string;
		BALLOON: string;
		BACK: string;
	}
	rank: MinehutRank;
}

export type MinehutRank = 'DEFAULT' | 'VIP' | 'VIP_PLUS' | 'PRO' | 'EVENTS' | 'TESTER' | 'LEGEND' | 'PATRON' | 'MAKER' | 'HEART' | 'BUILDER' | 'ARTIST' | 'YOUTUBE' | 'HELPER' | 'SUPER_HELPER' | 'MOD' | 'SR_MOD' | 'DEVELOPER' | 'ADMIN';

export interface CosmeticData {
	category: string;
	id: string;
	meta: {
		quantity: number;
	}
}
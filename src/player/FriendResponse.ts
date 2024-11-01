import { MinehutRank } from './CosmeticResponse';

export interface FriendsResponse {
	friends: Friend[];
}

export interface Friend {
	_id: string;
	uuid: string;
	name: string;
	name_lower: string;
	online: boolean;
	rank: MinehutRank;
}
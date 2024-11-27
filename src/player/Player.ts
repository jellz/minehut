import fetch from 'node-fetch';
import { Minehut } from '../Minehut';
import { CosmeticResponse, MinehutRank } from './CosmeticResponse';
import { Friend, FriendsResponse } from './FriendResponse';
import { prettyRank } from '../utils/functions';

/**
 * Represents a Minehut Player
 */
export class Player {
    client: Minehut;
    uuid: string;
    friends: Friend[];
    cosmetics: CosmeticResponse;
    rank: MinehutRank;
    prettyRank: string;
    isOnline: boolean;
    constructor(client: Minehut, uuid: string, friends: Friend[], cosmetics: CosmeticResponse, rank: MinehutRank = 'DEFAULT', isOnline: boolean = false) {
        this.client = client;
        this.uuid = uuid;
        this.friends = friends;
        this.cosmetics = cosmetics;
        this.rank = rank;
        this.prettyRank = prettyRank(rank);
        this.isOnline = isOnline;
    }

    /**
     * Get the Minehut friends of the player
     * @returns {Promise<Friend[]>}
     * @throws {Error} If the request fails
     * @example const friends = await player.getFriends();
     */
    async getFriends() {
        const res = await fetch(`${this.client.API_BASE}/network/player/${this.uuid}/friends`);
		if (!res.ok) throw new Error(res.statusText);
		const friends: FriendsResponse = await res.json();
        return friends.friends;
    }

    /**
     * Get the Minehut cosmetics of the player
     * @returns {Promise<CosmeticResponse>}
     * @throws {Error} If the request fails
     * @example const cosmetics = await player.getCosmetics();
     */
    async getCosmetics() {
        const res = await fetch(`${this.client.API_BASE}/cosmetics/profile/${this.uuid}`);
		if (!res.ok) throw new Error(res.statusText);
		const cosmetics: CosmeticResponse = await res.json();
        return cosmetics;
    }
}
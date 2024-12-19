import { Minehut } from '../Minehut';
import { CosmeticResponse, MinehutRank } from './CosmeticResponse';
import { prettyRank } from '../utils/functions';

/**
 * Represents a Minehut Player
 */
export class Player {
    client: Minehut;
    uuid: string;
    cosmetics: CosmeticResponse;
    rank: MinehutRank;
    prettyRank: string;
    constructor(client: Minehut, uuid: string, cosmetics: CosmeticResponse, rank: MinehutRank = 'DEFAULT') {
        this.client = client;
        this.uuid = uuid;
        this.cosmetics = cosmetics;
        this.rank = rank;
        this.prettyRank = prettyRank(rank);
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
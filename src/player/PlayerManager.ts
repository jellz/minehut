import { Minehut } from '../Minehut';
import { isUUID, uuidWithDashes } from '../utils/functions';
import { Player } from './Player';
import { MojangProfileResponse } from './MojangProfileResponse';
import { CosmeticResponse, MinehutRank } from './CosmeticResponse';

/**
 * The Minehut Player Manager
 */
export class PlayerManager {
    client: Minehut;
    constructor(client: Minehut) {
        this.client = client;
    }

    /**
     * Get a Minehut player by their username or UUID
     * @param player the username or UUID of the player
     * @returns {Promise<Player>}
     * @throws {Error} If the request fails
     * @example const player = await minehut.players.get('_Tarna_');
     */
    async get(player: string) {
        const uuid = isUUID(player) ? player : await this.getUUID(player, !player.includes('-'));
        if (!uuid) throw new Error('Invalid player');

        const cosmetics = await this.getCosmetics(uuid);

        let rank: MinehutRank = 'DEFAULT';
        if (cosmetics.rank) {
            rank = cosmetics.rank;
        }
        return new Player(this.client, uuid, cosmetics, rank);
    }

    /**
     * Get a list of cosmetics of a player
     * @param player the username or UUID of the player
     * @returns {Promise<CosmeticResponse>}
     * @throws {Error} If the request fails
     * @example const cosmetics = await minehut.players.getCosmetics('Puremin0rez');
     */
    async getCosmetics(player: string) {
        const uuid = isUUID(player) ? player : await this.getUUID(player, !player.includes('-'));
        const res = await fetch(`${this.client.API_BASE}/cosmetics/profile/${uuid}`);
        if (!res.ok) throw new Error(res.statusText);
        const cosmetics: CosmeticResponse = await res.json();
        return cosmetics;
    }

    /**
     * Fetch the UUID of a player by their username
     * @param player the username of the player
     * @param withDashes whether to include dashes in the UUID
     * @returns {Promise<string>}
     * @throws {Error} If the request fails
     * @example const uuid = await minehut.players.getUUID('lilrosalyn');
     */
    async getUUID(player: string, withDashes = true) {
		const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`);
		if (!res.ok) throw new Error(res.statusText);
		const json: MojangProfileResponse = await res.json();
		return withDashes ? uuidWithDashes(json.id) : json.id;
	}
}
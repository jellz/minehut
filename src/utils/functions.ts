import { Server } from '../server/Server';

/**
 * Check if a string is a valid UUID
 * @param uuid 
 * @returns {boolean}
 */
export function isUUID(uuid: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    return regex.test(uuid);
}

/**
 * Convert a UUID to a string without dashes
 * @param uuid 
 * @returns {string}
 */
export function uuidWithDashes(uuid: string) {
	return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
}

export type ServerPlan = 'Starter' | 'Standard' | 'Pro' | 'Ultimate' | 'EXTERNAL' | 'CUSTOM';

/**
 * Pretty version of a server plan
 * @param server 
 * @returns {ServerPlan}
 */
export function prettyPlan(server: Server | string): ServerPlan {
	const data = typeof server === 'string' ? server.split('_') : server.serverPlan.split('_');
	const plan = data[0] == 'CUSTOM' ? 'CUSTOM' : data[data.length - 1].toUpperCase();

	switch (plan) {
		case 'FREE':
			return 'Starter';
		case '2GB':
			return 'Standard';
		case '6GB':
			return 'Pro';
		case '10GB':
			return 'Ultimate';
		case 'CUSTOM':
			return 'CUSTOM';
		case 'EXTERNAL':
			return 'EXTERNAL';
		default:
			return 'Starter';
	}
}

/**
 * Pretty version of a player rank
 * @param server 
 * @returns {string}
 */
export function prettyRank(rank: string) {
	switch (rank) {
		case 'VIP':
			return 'VIP';
		case 'VIP_PLUS':
			return 'VIP+';
		case 'PRO':
			return 'PRO';
		case 'LEGEND':
			return 'Legend';
		case 'PATRON':
			return 'Patron';
		case 'HELPER':
		case 'SUPER_HELPER':
            return 'Helper';
		case 'MOD':
			return 'Mod';
		case 'ADMIN':
			return 'Admin';
		default:
			return 'Default';
	}
}

/**
 * Take an object of parameters and return a URL query string
 * @param params 
 * @returns {string}
 */
export function urlParams(params: Record<string, string | number | boolean | null | undefined>) {
    return Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => `${k}=${v}`).join('&');
}

const MINECRAFT_BEDROCK_VERSION_LIST = 'https://wiki.vg/Bedrock_Protocol_version_numbers';
const VERSION_REGEX =
	/https:\/\/minecraft\.fandom\.com\/wiki\/Bedrock_Edition_(?:beta_|Preview_)?([\d\.]+)">[\d\.]+<\/a>/gi;

/**
 * Get the latest version of Minecraft Bedrock Edition
 * @returns {Promise<string | null>}
 */
export async function getBedrockVersion(): Promise<string | null> {
	const req = await fetch(MINECRAFT_BEDROCK_VERSION_LIST);
	if (req == null) return null;

	const page = await req.text();
	if (page == null) return null;

	const search = page.match(VERSION_REGEX);
	if (search == null) return null;

	const versions = search
		.map((v) => (/\>([\d\.]+)\</i.exec(v) || [])[1])
		.sort(compareSemanticVersions);

	return versions[versions.length - 1];
}

/**
 * Compare two semantic versions
 * @param a 
 * @param b 
 * @returns {number}
 * @author https://medium.com/geekculture/sorting-an-array-of-semantic-versions-in-typescript-55d65d411df2
 */
export const compareSemanticVersions = (a: string, b: string) => {
	const a1 = a.split('.');
	const b1 = b.split('.');

	const len = Math.min(a1.length, b1.length);

	for (let i = 0; i < len; i++) {
		const a2 = +a1[i] || 0;
		const b2 = +b1[i] || 0;

		if (a2 !== b2) {
			return a2 > b2 ? 1 : -1;
		}
	}

	return b1.length - a1.length;
};

export type Status = 'Working' | 'Degraded' | 'Outdated' | 'Offline';

export interface MinehutStatus {
	minecraft_java: Status;
	minecraft_bedrock: Status;
	minecraft_proxy: Status;
	api: Status;
	bedrock_version: string;
	latest_bedrock_version: string;
}
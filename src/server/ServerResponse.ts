export interface ServerResponse {
	_id: string;
	owner: string;
	name: string;
	name_lower: string;
	creation: number;
	platform: 'java';
	__v: number;
	port: number;
	motd: string;
	visibility: boolean;
	credits_per_day: number;
	storage_node: string;
	last_online: number;
	offer: string;
	suspended: boolean;
	categories: ServerCategory[];
	connectedServers: string[];
	proxy: boolean;
	server_plan: string;
    activeServerPlan: string;
    rawPlan: string;
	server_version_type: string;

	purchased_icons: string[];
	active_icon: string; // id
	icon: string; // name

    default_banner_image: string;
    default_banner_tint: string;

	online: boolean;
	maxPlayers: number;
	playerCount: number;
    hidden: boolean;
    expired: boolean;
    using_cosmetics: boolean;
    joins: number;

    daily_online_time: ServerDailyOnlineTime;
    deletion: ServerDeletion;
}

export interface ServerDailyOnlineTime {
    [key: string]: number;
}

export interface ServerDeletion {
    started: boolean;
    started_at: number;
    reason: string;
    completed: boolean;
    completed_at: number;
    storage_completed: boolean;
    storage_completed_at: number;
}

export interface ServerListServer {
    staticInfo: {
        _id: string;
        serverPlan: string;
        serviceStartDate: number;
        platform: 'java';
        planMaxPlayers: number | null;
        planRam: number | null;
        alwaysOnline: boolean;
        rawPlan: string;
        connectedServers: string[];
    };
    maxPlayers: number;
    name: string;
    motd: string;
    icon: string;
    playerData: {
        timeNoPlayers: number;
        playerCount: number;
    };
    connectable: boolean;
    visibility: boolean;
    allCategories: string[];
    usingCosmetics: boolean;
    author: string;
    authorRank: string;
}

export type ServerCategory = 'farming' | 'smp' | 'factions' | 'meme' | 'puzzle' | 'box' | 'minigames' | 'rpg' | 'parkour' | 'lifesteal' | 'prison' | 'gens' | 'skyblock' | 'roleplay' | 'pvp' | 'modded' | 'creative' | 'old_pvp';

export type ServerCategoryFriendly = 'Farming' | 'SMP' | 'Factions' | 'Meme' | 'Puzzle' | 'Box' | 'Minigames' | 'RPG' | 'Parkour' | 'Lifesteal' | 'Prison' | 'Gens' | 'Skyblock' | 'Roleplay' | 'PvP' | 'Modded' | 'Creative' | '1.8 PvP';

export interface CategoryListResponse {
    items: CategoryListResponseItem[];
}

export interface CategoryListResponseItem {
    _id: string;
    backend_name: ServerCategory;
    friendly_name: ServerCategoryFriendly;
}
export interface IconResponse {
	_id: string;
	display_name: string;
	icon_name: string;
	price: number;
    salePrice: number | null;
	rank: string;
	available: boolean;
	disabled: boolean;
	__v: number;
	created: number;
	last_updated: number;
}

export interface IconsAvailableResponse {
	available: IconsAvailableResponseData;
	upcoming: IconsAvailableResponseData;
}

export interface IconsAvailableResponseData {
	_id: string;
	icons: IconResponse[];
	active_start_time: number;
	active_end_time: number;
	cycle_time: number;
	__v: number;
}
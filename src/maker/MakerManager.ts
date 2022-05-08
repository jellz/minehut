import fetch from 'node-fetch';
import { MARKET_MAKER_ENDPOINT, MARKET_PRODUCTS_ENDPOINT } from '../constants';
import { MakerResponse } from './MakerResponse';
import { Maker } from './Maker';
import { AddonResponse } from '../addon/AddonResponse';

export class MakerManager {

	async get(id: string) {
		const res = await fetch(
			`${MARKET_MAKER_ENDPOINT}/${id}`
		);
		if (!res.ok) throw new Error(res.statusText);
		const mkr: MakerResponse = await res.json();
		return new Maker(mkr);
	}

    async getProductList(id: string) {
        const res = await fetch(`${MARKET_PRODUCTS_ENDPOINT}`);
        if (!res.ok) throw new Error(res.statusText);
        const list: AddonResponse[] = await res.json();
        return list.filter(a => a.details.publisherSlug === id);
    }
}

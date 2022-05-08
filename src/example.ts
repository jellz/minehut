import { Minehut } from './Minehut';

(async function () {
	const minehut = new Minehut();
	const server = await minehut.servers.get('dangerZONE', true);
	console.log(server);

	const devMinehut = new Minehut({ dev: true });
	const devServer = await devMinehut.servers.get('test256', true);
	console.log(devServer);

	const icon = await server.getActiveIcon();
	console.log(`active icon ${JSON.stringify(icon)}`);

	const icons = await server.getPurchasedIcons();
	console.log(icons);

	const simpleStats = await minehut.getSimpleStats();
	console.log(simpleStats);

	const playerDistribution = await minehut.getPlayerDistribution();
	console.log(playerDistribution);

	const homepageStats = await minehut.getHomePageStats();
	console.log(homepageStats);

	const tuskeSearch = await minehut.addons.search('Tuske'); // actual name is Skript Addon: TuSKe
	console.log(`search for Tuske`, tuskeSearch);

	const skriptSearch = await minehut.addons.search('skript'); // exact match 'Skript'
	console.log(`search for Skript`, skriptSearch);

	const maker = await minehut.makers.get('senior-team');
	console.log(`search for senior-team`, maker);
	
	const makerProducts = await minehut.makers.getProductList('pelican');
	console.log(makerProducts);
})();

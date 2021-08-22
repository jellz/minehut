import { Minehut } from './Minehut';

(async function () {
	const minehut = new Minehut();
	const server = await minehut.servers.get('dangerZONE', true);
	console.log(server);

	const icon = await server.getActiveIcon();
	console.log(`active icon ${JSON.stringify(icon)}`);

	const icons = await server.getPurchasedIcons();
	console.log(icons);

	const plugins = await server.getInstalledContent();
	console.log(plugins.map(p => p.title));

	const simpleStats = await minehut.getSimpleStats();
	console.log(simpleStats);

	const tuskeSearch = await minehut.plugins.search('Tuske'); // actual name is Skript Addon: TuSKe
	console.log(`search for Tuske`, tuskeSearch);

	const skriptSearch = await minehut.plugins.search('skript'); // exact match 'Skript'
	console.log(`search for Skript`, skriptSearch);
})();

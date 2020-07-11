import { Minehut } from './Minehut';

(async function () {
	const minehut = new Minehut();
	const server = await minehut.servers.get('dangerZONE', true);
	console.log(server);

	const icon = await server.getActiveIcon();
	console.log(`active icon ${JSON.stringify(icon)}`);

	const icons = await server.getPurchasedIcons();
	console.log(icons);

	const plugins = await server.getPlugins();
	console.log(plugins.map(p => p.name));
})();

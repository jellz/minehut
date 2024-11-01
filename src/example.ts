import { Minehut } from './Minehut';

(async function () {
	const minehut = new Minehut();
	const server = await minehut.servers.get('Lifesteal');
	console.log(server);
    console.log(`Daily Time Left: ${server.getDailyTimeLeft()}`);

	const devMinehut = new Minehut({ dev: true });
	const devServer = await devMinehut.servers.get('test256', true);
	console.log(devServer);

	const icon = await server.getActiveIcon();
	console.log(`Active Icon ${icon.iconName}`);

	const icons = await server.getPurchasedIcons();
	console.log(icons);

    const availableIcons = await minehut.icons.fetchAvailable();
    console.log(availableIcons);

    const categories = await minehut.servers.getServerCategories({ fromCache: true });
    console.log(categories);

    const cakeIcon = await minehut.icons.get('Cake'); 
    console.log(cakeIcon);
    console.log(`Cake Icon Image: ${cakeIcon?.imageUrl}`);

	const simpleStats = await minehut.getSimpleStats();
	console.log(simpleStats);

	const playerDistribution = await minehut.getPlayerDistribution();
	console.log(playerDistribution);

	const homepageStats = await minehut.getHomePageStats();
	console.log(homepageStats);

    const resourcePack = await minehut.getResourcePack();
    console.log(resourcePack);

    const player = await minehut.players.get('_Tarna_');
    console.log(player);

    const filteredServers = await minehut.servers.getOnlineServers({ category: 'box', limit: 1 });
    console.log(filteredServers);
})();

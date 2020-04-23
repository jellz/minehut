import { Minehut } from './Minehut';

(async function () {
	const minehut = new Minehut();
	const server = await minehut.servers.get('Kaboom', true);
	console.log(server);
})();
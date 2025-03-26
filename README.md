# Minehut
A TypeScript wrapper for the [Minehut](https://minehut.com) HTTP API

## Installation
Install minehut with [NPM](https://npmjs.com)

```bash
  npm install minehut
```

## Features
- Get basic Minehut network information.
- Get information about a Minehut server.
- Get a list of online servers.
- Get information about server icons and categories.
- Get information about a Minehut player such as their rank.
- Generate a random story from Minehut's [Future News](https://minehut.wiki.gg/wiki/Future_News).

## Basic Usage
```ts
const minehut = new Minehut();

async function main() {
    const stats = await minehut.getSimpleStats();
    console.log(stats);

    const lifestealServers = await minehut.servers.getOnlineServers({ category: "lifesteal" });
    console.log(lifestealServers);

    const player = await minehut.players.get('_Tarna_');
    console.log(player);
}
```

For more examples, visit [example.ts](https://github.com/jellz/minehut/blob/master/src/example.ts).

## Notice
> [!WARNING]
> Please keep in mind that usage of the API is meant for private use only, and using the API for malicious purposes is not allowed.
> Please review the [rules](https://minehut.com/rules) and [terms of service](https://minehut.com/terms-of-service) before using the API.

## Contributing
Contributions are always welcome!

See `contributing.md` for ways to get started.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Contributors
- [@tarna](https://www.github.com/tarna)
- [@jellz](https://www.github.com/jellz)
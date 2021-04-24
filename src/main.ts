import * as PIXI from 'pixi.js';

import { getResources } from './assets';
import Map from './utils/map';
import Tile from './utils/tile';
import Player from './entities/player';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: 512,
    height: 512,
    backgroundColor: 0x000000,
    resizeTo: document.body
});

document.body.appendChild(app.view);

const stage = app.stage;
stage.scale.set(8);

function spawnPlayer(map: Map) {
    const playerTiles = Object.entries(map.tilesMetadata)
        .reduce<number[]>((ids, [tileId, metadata]) => {
            if (metadata?.type === 'Player') ids.push(Number.parseInt(tileId));
            return ids;
        }, []);

    const playerTile = map.layers.reduce<Tile | null>((mapPlayerTile, layer) =>
        mapPlayerTile ?? layer.tiles.reduce<Tile | null>((layerPlayerTile, column) =>
            layerPlayerTile ?? column.reduce<Tile | null>((columnPlayerTile, tile) =>
                columnPlayerTile ?? (playerTiles.includes(tile.tileId) ? tile : null)
            , null)
        , null)
    , null);

    if (playerTile === null) return console.warn("Can't find a player tile.");

    const player = new Player(playerTile);

    console.debug('PLAYER', player);
}

async function main() {
    const resources = await getResources();
    console.log('Loaded resources successfully ✔');

    const map = new Map(resources, 'maps/playground.json');
    stage.addChild(map);

    spawnPlayer(map);
}

main().catch(console.error);
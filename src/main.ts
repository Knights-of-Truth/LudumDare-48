import * as PIXI from 'pixi.js';

import { getResources } from './assets';

// import Tileset from './utils/tileset.old';
// import LinearTileLayer from './utils/linear-tilelayer';
// import LinearObjectGroup from './utils/linear-objectgroup';
// import * as Tiled from './tiled';

import Map from './utils/map';

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

async function main() {
    const resources = await getResources();
    console.log('Loaded resources successfully ✔');

    const map = new Map(resources, 'maps/playground.json');
    stage.addChild(map);
}

main().catch(console.error);
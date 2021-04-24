import * as PIXI from 'pixi.js';

import { getResources } from './assets';
import Game from './game';

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

function centerStage() {
    stage.position.set(
        Math.floor(app.screen.width / 2),
        Math.floor(app.screen.height / 2)
    );
}

window.addEventListener('resize', centerStage);
centerStage();

async function main() {
    const resources = await getResources();
    console.log('Loaded resources successfully ✔');

    const game = new Game(resources);
    stage.addChild(game.stage);
}

main().catch(console.error);
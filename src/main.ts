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

async function main() {
    const resources = await getResources();
    console.log('Loaded resources successfully ✔');

    const game = new Game(resources);
    stage.addChild(game.stage);

    game.stage.scale.set(4);

    function centerMapStage() {
        game.stage.position.set(
            Math.floor(app.screen.width / 2),
            Math.floor(app.screen.height / 2)
        );
    }
    
    window.addEventListener('resize', centerMapStage);
    centerMapStage();
}

main().catch(console.error);
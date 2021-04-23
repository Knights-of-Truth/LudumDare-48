import * as PIXI from 'pixi.js';
import * as Tiled from '../tiled';

import Map from './map';
import TileSprite from './tile-sprite';

export default class GridTileLayer {
    public readonly container = new PIXI.Container();

    constructor(public readonly map: Map, tilelayer: Tiled.TileLayer) {
        const {
            data, chunks,
            width, height,
            offsetx, offsety,
            opacity, tintcolor, visible,
            properties
        } = tilelayer;

        if (data === undefined || chunks !== undefined)
            throw new Error('infinite map layers are not supported yet!');
        
        if (typeof data === 'string')
            throw new Error('base64 encoded layers are not supported yet!');
        
        this.container.visible = visible;
        if (offsetx !== undefined && offsety !== undefined)
            this.container.pivot.set(-offsetx, -offsety);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const rawTileId = data[x + y * width];
                if (rawTileId === 0) continue;

                const tileSprite = new TileSprite(this.map, rawTileId);

                // Set the position of the tile.
                tileSprite.position.set((x + .5) * map.tileWidth, (y + .5) * map.tileHeight);

                // Set the color and alpha of the tile.
                if (tintcolor !== undefined) tileSprite.tint = PIXI.utils.string2hex(tintcolor);
                tileSprite.alpha = opacity;

                this.container.addChild(tileSprite);
            }
        }

        // TODO: Support properties
    }
}
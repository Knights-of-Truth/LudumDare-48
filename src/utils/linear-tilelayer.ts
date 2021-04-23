import { Container, utils } from 'pixi.js';
import * as Tiled from '../tiled';
import Tileset from './tileset.old';
import TileSprite from './tile-sprite';

export default class LinearTileLayer extends Container {
    constructor(tileset: Tileset, tilelayer: Tiled.TileLayer) {
        super();

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

        this.visible = visible;
        if (offsetx !== undefined && offsety !== undefined)
            this.pivot.set(-offsetx, -offsety);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const rawTileId = data[x + y * width];
                if (rawTileId === 0) continue;

                const tileSprite = new TileSprite(tileset, rawTileId);

                // Set the position of the tile.
                // TODO: Use map tile dimensions instead.
                tileSprite.position.set((x + .5) * tileset.tileWidth, (y + .5) * tileset.tileHeight);

                // Set the color and alpha of the tile.
                if (tintcolor !== undefined) tileSprite.tint = utils.string2hex(tintcolor);
                tileSprite.alpha = opacity;

                this.addChild(tileSprite);
            }
        }

        if (properties !== undefined)
            for (const property of properties)
                if (property.name.toLowerCase() === 'cache' && property.type === 'bool')
                    this.cacheAsBitmap = property.value;
    }
}
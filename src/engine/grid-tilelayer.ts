import * as PIXI from 'pixi.js';
import * as Tiled from '../tiled';

import Map from './map';
import Tile from './tile';
import Entity from './entity';
import TileSprite from './tile-sprite';

import * as Utils from '../lib/utils';

/**
 * Represents a tile in the GridTileLayer, supporting the tileId of 0.
 * 
 * Internally it automatically manages the tileSprite.
 */
class GridTile implements Tile {
    public entity: Entity | undefined;

    protected tileSprite: TileSprite | null;

    public constructor(
        public readonly layer: GridTileLayer,
        public readonly tileX: number,
        public readonly tileY: number,
        rawTileId: number
    ) {
        if (rawTileId === 0) this.tileSprite = null;
        else this.tileSprite = this.createTileSprite(rawTileId);
    }

    private createTileSprite(rawTileId: number) {
        const { tint, opacity } = this.layer;
        const { textures, tileWidth, tileHeight } = this.layer.map;

        const tileSprite = new TileSprite(textures, rawTileId);
        tileSprite.position.set((this.tileX + .5) * tileWidth, (this.tileY + .5) * tileHeight);

        tileSprite.tint = tint;
        tileSprite.alpha = opacity;

        this.layer.addChild(tileSprite);
        return tileSprite;
    }

    get tileId() {
        return this.tileSprite?.tileId ?? 0;
    }
    set tileId(id: number) {
        if (id === this.tileId) return;
        if (id === 0) {
            const tileSprite = this.tileSprite;
            if (tileSprite === null) return;

            this.layer.removeChild(tileSprite);
            this.tileSprite = null;
        } else {
            const existingTileSprite = this.tileSprite;

            if (existingTileSprite !== null) existingTileSprite.tileId = id;
            else this.tileSprite = this.createTileSprite(id);
        }

        this.layer.updateCachedBitmap();
    }

    get rawTileId() {
        return this.tileSprite?.rawTileId ?? 0;
    }
    set rawTileId(id: number) {
        if (id === this.rawTileId) return;

        if (id === 0) this.tileId = 0;
        else {
            const existingTileSprite = this.tileSprite;
            if (existingTileSprite !== null) existingTileSprite.rawTileId = id;
            else this.tileSprite = this.createTileSprite(id);
        }

        this.layer.updateCachedBitmap();
    }

    get flippedHorizontally() {
        return this.tileSprite?.flippedHorizontally ?? false;
    }
    set flippedHorizontally(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedHorizontally = flipped;
        this.layer.updateCachedBitmap();
    }

    get flippedVertically() {
        return this.tileSprite?.flippedVertically ?? false;
    }
    set flippedVertically(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedVertically = flipped;
        this.layer.updateCachedBitmap();
    }

    get flippedDiagonally() {
        return this.tileSprite?.flippedDiagonally ?? false;
    }
    set flippedDiagonally(flipped: boolean) {
        const tileSprite = this.tileSprite;
        if (tileSprite === null) return;

        tileSprite.flippedDiagonally = flipped;
        this.layer.updateCachedBitmap();
    }

    swapWith(tile: Tile): Tile {
        const { rawTileId, entity } = tile;

        tile.rawTileId = this.rawTileId;
        tile.entity = this.entity;

        this.rawTileId = rawTileId;
        this.entity = entity;

        return this;
    }
}

export default class GridTileLayer extends PIXI.Container {
    private _tint = 0xFFFFFF;
    private _opacity = 1;

    /**
     * A 2-dimentional array for accessing the tiles of the layer.
     * The tiles are instances of GridTile (an internal class), and so they support tileId of 0.
     */
    public readonly tiles: Tile[][] = [];

    /**
     * The properties of the layer, set in tiled.
     */
    public readonly properties: Tiled.Property[];

    constructor(public readonly map: Map, tilelayer: Tiled.TileLayer) {
        super();

        const {
            data, chunks,
            width, height,
            offsetx, offsety,
            opacity, tintcolor, visible,
            properties
        } = tilelayer;

        // TODO: Infinite map layers support.
        if (data === undefined || chunks !== undefined)
            throw new Error('infinite map layers are not supported yet!');

        // TODO: Base64 encoding support.
        if (typeof data === 'string')
            throw new Error('base64 encoded layers are not supported yet!');

        // Set rendering options.

        this.visible = visible;
        if (offsetx !== undefined && offsety !== undefined)
            this.pivot.set(-offsetx, -offsety);

        if (tintcolor !== undefined) this._tint = PIXI.utils.string2hex(tintcolor);
        this._opacity = opacity;

        // Copy the properties.
        this.properties = properties ?? [];

        // Construct the 2-dimensional tiles array.
        for (let x = 0; x < width; x++) this.tiles[x] = [];

        // Construct the tiles.
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++)
                this.tiles[x][y] = new GridTile(this, x, y, data[x + y * width]);
        }

        // Apply the cache property.
        const cacheProperty = Utils.getProperty(this.properties, 'Cache', 'bool');
        if (cacheProperty !== undefined) this.cacheAsBitmap = cacheProperty;
    }

    /**
     * The tint color applied to the tilelayer.
     */
    get tint(): number {
        return this._tint;
    }

    /**
     * The opacity of the tilelayer.
     */
    get opacity(): number {
        return this._opacity;
    }

    /**
     * Updates the cached bitmap of the tilelayer, in-case it's enabled.
     */
    public updateCachedBitmap() {
        // It's not cached, no need to update it.
        if (!this.cacheAsBitmap) return;

        this.cacheAsBitmap = false;
        this.cacheAsBitmap = true;
    }
}